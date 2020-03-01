using CentralErros.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace CentralErros.Services
{
    public class UserService : IUserService
    {
        private CentralErrosContext context;

        public UserService(CentralErrosContext context)
        {
            this.context = context;
        }

        public User Get(int id)
        {
            return context.Users.Where(t => t.Id == id)
                .FirstOrDefault();
        }

        public User GetByEmail(string email)
        {
            return context.Users.Where(t => t.Email.Equals(email))
                .FirstOrDefault();
        }

        public User Save(User user)
        {
            var state = user.Id == 0 ? EntityState.Added : EntityState.Modified;
            context.Entry(user).State = state;
            context.SaveChanges();
            return user;
        }
    }
}
