using Microsoft.VisualBasic;

namespace Get2Work.Models
{
    public class Job
    {
        public int Id { get; set; }
        public int UserProfileId { get; set; }
        public UserProfile Profile { get; set; }
        public string Description { get; set; }
        public DateAndTime CreateDateTime { get; set; }
        public DateAndTime ScheduledTime { get; set; }
        public int StoreId   { get; set; }
        public Store Store { get; set; }

        public string Notes { get; set; }
        public bool ActiveStatus { get; set; }
    }
}
