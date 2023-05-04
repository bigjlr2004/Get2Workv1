using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Get2Work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class JobScheduleController : ControllerBase
    {
        private readonly IJobScheduleRepository _jobScheduleRepository;

        public JobScheduleController(IJobScheduleRepository jobScheduleRepository)
        {
            _jobScheduleRepository = jobScheduleRepository;

        }
        [HttpGet("JobScheduleForWeek")]
        public IActionResult WeekSchedule()        {
            //Get todays Date
            DateTime Today = DateTime.Now;
            string formattedDate = Today.ToString("yyyy-MM-dd");
            DateTime today = DateTime.ParseExact(formattedDate, "yyyy-MM-dd", CultureInfo.InvariantCulture);
            //Get the current day weekday string
            DayOfWeek dayOfWeek = today.DayOfWeek;
            //Send the weekday string off to calculate the number of days to subtract to go back to Sunday of the current week.
            int StablizeDate = GetStartDate(dayOfWeek.ToString());
            //Stabilize date by adding the Stablize Date to Todays Date
            DateTime ChangedToSundayDate = today.AddDays(StablizeDate);
            DateTime NextDay = ChangedToSundayDate.AddDays(8);
            return Ok(_jobScheduleRepository.ScheduleByDateRange(ChangedToSundayDate, NextDay));
        }

        [HttpGet("JobScheduleForScheduleByDateRange")]
        public IActionResult Today()
        {
            DateTime Today = DateTime.Now;
            DateTime NextDay = Today.AddHours(24);
            return Ok(_jobScheduleRepository.ScheduleByDateRange(Today, NextDay));
        }

        [HttpGet]
        public IActionResult GetAll()
        {

            var scheduledJobs = _jobScheduleRepository.GetAll();
            return Ok(scheduledJobs);
        }

        [HttpPost("Add")]
        public IActionResult Add(JobSchedule newJob)
        {
            try
            {
                newJob.StartingOdometer = 0;
                newJob.EndingOdometer = 0;
                newJob.Halfs = 0;
                newJob.Pints = 0;
                newJob.Snacks = 0;
                newJob.Complete = false;

                _jobScheduleRepository.Add(newJob);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
            
        }
        [HttpGet("{id}")]
        public IActionResult GetJobScheduleById(int id)
        {
            return Ok(_jobScheduleRepository.GetJobScheduleById(id));
        }
        [HttpGet("getAllJobScheduleByUserId/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_jobScheduleRepository.GetAllJobScheduleByUserId(id));
        }
        [HttpPut("Edit")]
        public IActionResult Edit(int id, JobSchedule job)
        {
            _jobScheduleRepository.Update(job);
            return NoContent();
        }

        [HttpDelete("DeleteJobSchedule/{id}")]
        public IActionResult DeleteJobSchedule(int id)
        {
            _jobScheduleRepository.DeleteFutureJobSchedule(id);
            return NoContent();
        }

        [HttpPut("ScheduleJob")]
        public IActionResult Test(Schedule schedule, int weeks)
        {
            //Get todays Date
            DateTime today = DateTime.Now;
            //Get the current day weekday string
            DayOfWeek dayOfWeek = today.DayOfWeek;
            //Send the weekday string off to calculate the number of days to subtract to go back to Sunday of the current week.
            int StablizeDate = GetStartDate(dayOfWeek.ToString());
            //Stabilize date by adding the Stablize Date to Todays Date
            DateTime ChangedToSundayDate = today.AddDays(StablizeDate);

            //Create a list to store the scheduled dates for the job.
            List<DateTime> days = new List<DateTime>();
            //Iterate through the number of weeks passed from the user
            for (int i = 0; i < weeks; i++)
            {
                //For each week multiply the number of week 7 to that number to the scheduled date to schedule of each week.
                int addweek = i * 7;
                //Iterate through each day in the DaysScheduled List - this is a list of integers corresponding to the days checked on the front end and 
                //passed to us with the job.
                foreach (var day in schedule.DaysScheduled)
                    {
                        //Calculate the Date To Be Scheduled by adding the integer that corresponds to the day checked in the
                        //DaysScheduled List plus the number of the week we are iterating through to the ChangedToSundayDate.
                     DateTime ScheduledDate = ChangedToSundayDate.AddDays((day ) + addweek);
                    //If Date to be Scheduled is equal to today or in the future then we add it to the schedule.
                    if (ScheduledDate >= DateTime.Today)
                    {
                        //The DayId is a list of integers from 1-7; we use the corresponding integer passed in the Days Scheduled +1
                        //Because the integers passed start with 0 and run through 7.
                        schedule.DayId = day+1;
                        //schedule.Date = ScheduledDate;
                        _jobScheduleRepository.AddNew(schedule);
                        days.Add(ScheduledDate);
                    }
                } 

            }
                                 
            return Ok(days);
        }

        private int  GetStartDate(string Today)
        {
          int i = 0;
            switch (Today)
            {
                case "Sunday":
                    return  i = 0;
                case "Monday":
                    return i = -1;
                case "Tuesday":
                    return i = -2;
                case "Wednesday":
                    return i = -3;
                case "Thursday":
                    return i = -4;
                case "Friday":
                    return i = -5;
                case "Saturday":
                    return i = -6;
            }
            return i;
        }
       
        }

    }



