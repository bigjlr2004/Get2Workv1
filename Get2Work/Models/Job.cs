using Microsoft.VisualBasic;
using System;
using System.Collections.Generic;

namespace Get2Work.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Description { get; set; }
        public string CreateDateTime { get; set; }
        public string ScheduledTime { get; set; }
        public int StoreId   { get; set; }
        public Store Store { get; set; }

        public string Notes { get; set; }
        public bool ActiveStatus { get; set; }

        public List<int> DayIds { get; set; }

        public List<Day> Days { get; set; }
       
    }
}
