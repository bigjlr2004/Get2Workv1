using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Security.Claims;

namespace Get2Work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompletedJobController : ControllerBase
    {
        private readonly ICompletedJobRepository _completedJobRepository;

        public CompletedJobController(ICompletedJobRepository completedJobRepository)
        {
            _completedJobRepository = completedJobRepository;

        }
            [HttpGet]
        public IActionResult GetAll()
        {
            var completedJobs = _completedJobRepository.GetAll();
            return Ok(completedJobs);
        }
        [HttpGet("GetTodaysCompletedJobsAllUsers")]
        public IActionResult GetTodaysCompletedJobsAllUsers()
        {
            var completedJobs = _completedJobRepository.GetTodaysCompletedJobsAllUsers();
            return Ok(completedJobs);
        }

        [HttpPost("Add")]
        public IActionResult Add(CompletedJob job)
        {
            try
            {
                _completedJobRepository.Add(job);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }

        }
        [Authorize]
        [HttpGet("usercompletedjobs")]
        public IActionResult GetTodaysUserCompletedJobs()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;

            return Ok(_completedJobRepository.GetTodaysCompletedJobsByUserId(firebaseUserId));
        }
    }
}
