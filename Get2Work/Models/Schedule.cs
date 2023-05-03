using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Get2Work.Models
{
    public class Schedule
    {

        public int Id { get; set; }
        public DateTime Date { get; set; } = DateTime.Now;
        public int JobId { get; set; }
        public int DayId { get; set; }


        public List<int> DaysScheduled { get; set; }
    }

}
