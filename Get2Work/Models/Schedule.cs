using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace Get2Work.Models
{
    public class Schedule
    {

        public int Id { get; set; }
        public string Date { get; set; } 
        public int JobId { get; set; }
       


        public List<int> DaysScheduled { get; set; }
    }

}
