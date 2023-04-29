using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IJobScheduleRepository
    {
        List<JobSchedule> GetAll();
    }
}