using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using System;

namespace Get2Work.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class JobController : ControllerBase
    {

        private readonly IUserProfileRepository _userProfileRepository;
        private readonly IJobRepository _jobRepository;
        public JobController(IUserProfileRepository userProfileRepository,
                             IJobRepository jobRepository)
        {
            _userProfileRepository = userProfileRepository;
            _jobRepository = jobRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_jobRepository.GetAll());
        }

        [HttpGet("getalljobsbyuserId/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_jobRepository.GetJobsByUserId(id));
        }

        [HttpPut("Edit")]
        public IActionResult Edit(int id, Job job)
        {
            _jobRepository.Update(job);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Job job)
        {
            job.CreateDateTime = DateTime.Now;
            job.ActiveStatus = true;
            _jobRepository.Add(job);

            return NoContent();

        }
    }
}
