using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface ICompletedJobRepository
    {
        List<CompletedJob> GetAll();
        List<CompletedJob> GetTodaysCompletedJobsByUserId(string firebaseUserId);
        public List<CompletedJob> GetTodaysCompletedJobsAllUsers();
        public void Add(CompletedJob job);
    }
}