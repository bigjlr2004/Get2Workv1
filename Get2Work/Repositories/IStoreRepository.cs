using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IStoreRepository
    {
        List<Store> GetAll();
        public Store GetById(int id);
        public void Add(Store Store);
        public void Update(Store Store);

    }
}