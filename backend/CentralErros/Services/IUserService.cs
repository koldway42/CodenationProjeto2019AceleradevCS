using CentralErros.Models;

namespace CentralErros.Services
{
    public interface IUserService
    {
        User Get(int id);
        User GetByEmail(string email);
        User Save(User user);
    }
}
