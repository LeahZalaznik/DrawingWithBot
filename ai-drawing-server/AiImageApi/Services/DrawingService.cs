using AiImageApi.Data.Models;
using AiImageApi.NewFolder;
using AImageApi.Data;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using AutoMapper;
using AiImageApi.NewFolder;
using System.Text.Json;
namespace AiImageApi.Services
{
    public interface IDrawingService
    {
        Task<Guid> SaveDrawingAsync(DrawingDto dto);
        Task<List<DrawingDto>> GetDrawingsByUserIdAsync(string userId);
        Task<DrawingDto?> GetDrawingAsync(Guid id);
    }

    public class DrawingService : IDrawingService
    {
            private readonly AppDbContext _context;
            private readonly IMapper _mapper;

            public DrawingService(AppDbContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
        public async Task<Guid> SaveDrawingAsync(DrawingDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.UserEmail);
            if (user == null)
                throw new Exception("User not found");

            var existingDrawing = await _context.Drawings
                .Include(d => d.Messages)
                .FirstOrDefaultAsync(d => d.Id.ToString() == dto.Id && d.UserId == user.Id);

            if (existingDrawing != null)
            {
                existingDrawing.CommandsJson = JsonSerializer.Serialize(dto.Commands);

                _context.Messages.RemoveRange(existingDrawing.Messages);
                existingDrawing.Messages = _mapper.Map<List<Message>>(dto.Messages);
                foreach (var msg in existingDrawing.Messages)
                {
                    msg.DrawingId = existingDrawing.Id;
                }

                await _context.SaveChangesAsync();
                return existingDrawing.Id;
            }
            else
            {
                var drawing = _mapper.Map<Drawing>(dto);
                drawing.Id = Guid.NewGuid();
                drawing.UserId = user.Id;
                drawing.CommandsJson = JsonSerializer.Serialize(dto.Commands);

                drawing.Messages = _mapper.Map<List<Message>>(dto.Messages);
                foreach (var msg in drawing.Messages)
                {
                    msg.DrawingId = drawing.Id;
                }

                _context.Drawings.Add(drawing);
                await _context.SaveChangesAsync();
                return drawing.Id;
            }
        }

        public async Task<DrawingDto?> GetDrawingAsync(Guid id)
            {
                var entity = await _context.Drawings
                    .Include(d => d.Messages) 
                    .FirstOrDefaultAsync(d => d.Id == id);

                return entity == null ? null : _mapper.Map<DrawingDto>(entity);
            }


        public async Task<List<DrawingDto>> GetDrawingsByUserIdAsync(string Email)
            {
            var drawings = await _context.Drawings
                    .Include(d => d.User)
                    .Include(d=>d.Messages)
                    .Where(d => d.User.Email == Email)
                    .OrderByDescending(d => d.CreatedAt)
                    .ToListAsync();

                return _mapper.Map<List<DrawingDto>>(drawings);
            }

    }


}

