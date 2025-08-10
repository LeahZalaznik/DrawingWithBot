using AiImageApi.Data.Models;
using AiImageApi.NewFolder;
using AImageApi.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
namespace AiImageApi.Services
{

    public interface IUserService
    {
        Task<string> LoginOrRegisterAsync(string userIdentifier);
    }
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;

        public UserService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<string> LoginOrRegisterAsync(string userIdentifier)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == userIdentifier);

            if (user == null)
            {
                user = new User { Email = userIdentifier };
                _context.Users.Add(user);
                await _context.SaveChangesAsync();
            }

            return user.Email;
        }
    }
}

