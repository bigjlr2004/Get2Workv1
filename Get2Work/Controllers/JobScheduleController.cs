using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;
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
    }
}

