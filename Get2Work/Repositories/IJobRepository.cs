using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IJobRepository
    {
        List<Job> GetAll();
        public List<Job> GetAllJobsScheduledToday();
        List<Job> GetJobsByUserId(int id);
        void Update(Job job);
        int Add(Job job);
        Job GetJobById(int id);
    }
}