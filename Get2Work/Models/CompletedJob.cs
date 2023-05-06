using System;

namespace Get2Work.Models
{
    public class CompletedJob
    {
        public int Id { get; set; }
        public DateTime DateCompleted { get; set; }
        public int JobScheduleId { get; set; }
        public Job Job { get; set; }

        public string Notes { get; set; }
        public DateTime TimeIn { get; set; }
        public DateTime TimeOut { get; set; }
        public int? StartingOdometer { get; set; }
        public int? EndingOdometer { get; set; }
        public int? Halfs { get; set; }
        public int? Pints { get; set; }
        public int? Snacks { get; set; }
        public bool Complete { get; set; }
    
}
}
