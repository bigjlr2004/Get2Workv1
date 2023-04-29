using Microsoft.VisualBasic;
using System;
using System.Security.Cryptography.X509Certificates;

namespace Get2Work.Models
{
    public class JobSchedule
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public int JobId { get; set; }
        public Job Job { get; set; }
        public int DayId { get; set; }
       
        public string Notes { get; set; }
        public DateTime? TimeIn { get; set; }
        public DateTime? TimeOut { get; set; }
        public int? StartingOdometer { get; set; }
        public int? EndingOdometer { get; set; }
        public int Halfs { get; set; }
        public int Pints { get; set; }
        public int Snacks { get; set; }
        public bool Complete { get; set; }
    }
}
