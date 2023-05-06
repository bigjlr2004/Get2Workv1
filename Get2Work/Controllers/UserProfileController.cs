using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;

namespace Get2Work.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
       
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
            
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var userProfiles = _userProfileRepository.GetAll();
            return Ok(userProfiles.OrderBy(up => up.DisplayName).ToList());
        }

        [HttpGet("userId/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_userProfileRepository.GetById(id));
        }


        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
           
            userProfile.UserTypeId = 2;
            userProfile.ActiveStatus = true;
            _userProfileRepository.Add(userProfile);

            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
    
        [HttpPut("deactivate")]
        public IActionResult Deactivate(UserProfile profile)
        {
            UserProfile userProfile = _userProfileRepository.GetById(profile.Id);

            _userProfileRepository.ChangeActivation(userProfile, false);

            return NoContent();
        }

        [HttpPut("activate")]
        public IActionResult Activate(UserProfile profile)
        {
            UserProfile userProfile = _userProfileRepository.GetById(profile.Id);

            _userProfileRepository.ChangeActivation(userProfile, true);

            return NoContent();
        }
    }
}
