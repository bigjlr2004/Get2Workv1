using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IJobRepository
    {
        List<Job> GetAll();
        public List<Job> GetAllJobsScheduledToday();
        public List<Job> GetAllJobsScheduledTodayByUser(string firebaseUserId);
        public List<Job> GetAllJobsScheduledByUser(string firebaseUserId);
        public List<Job> GetAllJobsSpecificDay(string day);
        List<Job> GetJobsByUserId(int id);
        void Update(Job job);
        int Add(Job job);
        Job GetJobById(int id);
    }
}