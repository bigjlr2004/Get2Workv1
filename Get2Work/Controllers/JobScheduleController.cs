using Get2Work.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
    }
}
