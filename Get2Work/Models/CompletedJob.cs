using System;

namespace Get2Work.Models
{
    public class CompletedJob
    {
        public int Id { get; set; }
        public DateTimeOffset DateCompleted { get; set; }
        public int JobScheduleId { get; set; }
        public Job Job { get; set; }

        public string Notes { get; set; }
        public DateTimeOffset TimeIn { get; set; }
        public DateTimeOffset TimeOut { get; set; }
        public int? StartingOdometer { get; set; }
        public int? EndingOdometer { get; set; }
        public int? Halfs { get; set; }
        public int? Pints { get; set; }
        public int? Snacks { get; set; }
        public bool Complete { get; set; }
    
}
}
