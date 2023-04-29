using Get2Work.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Get2Work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DayController : ControllerBase
    {
        private readonly IDayRepository _dayRepository;
        public DayController(IDayRepository dayRepository) {
        
            _dayRepository = dayRepository;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_dayRepository.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_dayRepository.GetDayById(id));
        }
    }
}
