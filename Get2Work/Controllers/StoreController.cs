using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;

namespace Get2Work.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreRepository _storeRepository;

        public StoreController(IStoreRepository storeRepository)
        {
            _storeRepository = storeRepository;

        }
        [HttpGet]
        public IActionResult GetAll()
        {
            var stores = _storeRepository.GetAll();
            return Ok(stores.OrderBy(up => up.Name).ToList());
        }
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_storeRepository.GetById(id));
        }

        [HttpPut("Edit")]
        public IActionResult Edit(int id, Store Store)
        {
            _storeRepository.Update(Store);
            return NoContent();
        }

        [HttpPost]
        public IActionResult Post(Store Store)
        {
           
            _storeRepository.Add(Store);

            return NoContent();

        }

    }
}
