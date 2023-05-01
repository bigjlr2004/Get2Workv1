using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IJobRepository
    {
        List<Job> GetAll();
        List<Job> GetJobsByUserId(int id);
        void Update(Job job);
        void Add(Job job);
        Job GetJobById(int id);
    }
}