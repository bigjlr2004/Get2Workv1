using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
using System.Security.Claims;

namespace Get2Work.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IJobRepository _jobRepository;
        private readonly IDayRepository _dayRepository;
        public JobController(IUserProfileRepository userProfileRepository,
                             IJobRepository jobRepository,
                             IDayRepository dayRepository)
        {
            _userProfileRepository = userProfileRepository;
            _jobRepository = jobRepository;
            _dayRepository = dayRepository;
        }

        [Authorize]
        [HttpGet("userscheduledjobs")]
        public IActionResult GetTodaysUserScheduledJobs()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_jobRepository.GetAllJobsScheduledTodayByUser(firebaseUserId));
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_jobRepository.GetAll());
        }
        [HttpGet("GetAllJobsScheduledToday")]
        public IActionResult GetAllJobsWithListofDays()
        {
            return Ok(_jobRepository.GetAllJobsScheduledToday());
        }
        [HttpGet("getAllJobsByUserId/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_jobRepository.GetJobsByUserId(id));
        }
        [HttpGet("{id}")]
        public IActionResult GetJobById(int id)
        {
            return Ok(_jobRepository.GetJobById(id));
        }

        [HttpPut("Edit")]
        public IActionResult Edit(int id, Job job)
        {
            _jobRepository.Update(job);
            return NoContent();
        }

        [HttpPost("AddJob")]
        public IActionResult Post(Job job)
        {
          
            job.ActiveStatus = true;
            int JobId = _jobRepository.Add(job);
            foreach (var day in job.DayIds)
            {
                int DayId = day;
                _dayRepository.AddDaysScheduled(JobId, DayId);
            }

                return Ok();

        }
    }
}
