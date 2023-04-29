using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IDayRepository
    {
        List<Day> GetAll();
        public Day GetDayById(int id);
    }
}