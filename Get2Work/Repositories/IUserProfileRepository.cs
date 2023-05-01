using Get2Work.Models;
using System.Collections.Generic;

namespace Get2Work.Repositories
{
    public interface IUserProfileRepository
    {
        List<UserProfile> GetAll();
        public UserProfile GetById(int id);
        public void Add(UserProfile user);
        //public void Delete(int id);
        public void Update(UserProfile user);
        public void ChangeActivation(UserProfile userProfile, bool activated);
        public UserProfile GetByFirebaseUserId(string firebaseuserId);

    }
}