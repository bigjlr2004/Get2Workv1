using Get2Work.Models;
using System;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IJobScheduleRepository
    {
        List<JobSchedule> GetAll();
        public void Add(JobSchedule newJob);
        public void AddNew(Schedule newJob);
        public void Update(JobSchedule job);
        public JobSchedule GetJobScheduleById(int id);
        public List<JobSchedule> GetAllJobScheduleByUserId(int userId);
        public void DeleteFutureJobSchedule(int JobId);
        public List<JobSchedule> ScheduleByDateRange(DateTime PreviousDay, DateTime NextDay);
    }
}