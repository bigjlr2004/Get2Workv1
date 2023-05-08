using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Get2Work.Models
{
    public class UserProfile
    {
        public int Id { get; set; }
        public string FirebaseUserId { get; set; }
        public string DisplayName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public int UserTypeId { get; set; }
        public  bool ActiveStatus { get; set; }
        public UserType UserType { get; set; }
        public List<Job> ScheduledJobs { get; set; }

        public string FullName
        {
            get
            {
                return $"{FirstName} {LastName}";
            }
        }

    }
}
