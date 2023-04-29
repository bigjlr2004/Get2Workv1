using Microsoft.VisualBasic;
using System;

namespace Get2Work.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile UserProfile { get; set; }
        public string Description { get; set; }
        public DateTime CreateDateTime { get; set; }
        public DateTime ScheduledTime { get; set; }
        public int StoreId   { get; set; }
        public Store Store { get; set; }

        public string Notes { get; set; }
        public bool ActiveStatus { get; set; }
    }
}
