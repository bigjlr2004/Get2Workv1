using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Get2Work.Models;
using Get2Work.Repositories;
using Microsoft.AspNetCore.Authorization;
using System.Collections.Generic;

namespace Get2Work.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        private IJobRepository _jobRepository;
       
        public UserProfileController(IUserProfileRepository userProfileRepository, IJobRepository jobRepository)
        {
            _userProfileRepository = userProfileRepository;
            _jobRepository  = jobRepository;
            
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            List<UserProfile> UpdateList = new List<UserProfile>();
            var userProfiles = _userProfileRepository.GetAll();
            foreach (var userProfile in userProfiles)
            {
                List<Job> usersJobs = _jobRepository.GetAllJobsScheduledByUser(userProfile.FirebaseUserId);
                if (usersJobs != null)
                {
                    userProfile.ScheduledJobs = usersJobs;
                }
                UpdateList.Add(userProfile);
                               
            }
            
            return Ok(UpdateList.OrderBy(up => up.FullName).ToList());
        }

        [HttpGet("userId/{id}")]
        public IActionResult GetById(int id)
        {
            return Ok(_userProfileRepository.GetById(id));
        }


        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            UserProfile user = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (user == null)
            {
                return Ok(user);
            } else
            {
                user.ScheduledJobs = _jobRepository.GetAllJobsScheduledByUser(firebaseUserId);
                return Ok(user);
            }

            
            
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
