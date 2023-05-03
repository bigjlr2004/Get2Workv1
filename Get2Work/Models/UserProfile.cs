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
        public DateTime HireDate { get; set; }
        public string Email { get; set; }
        public string Notes { get; set; }
        public int UserTypeId { get; set; }
        public string Address { get; set; }
        public  bool ActiveStatus { get; set; }
       
    }
}
