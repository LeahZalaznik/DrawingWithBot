using AiImageApi.Data.Models;
using AiImageApi.NewFolder;
using AiImageApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AiImageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrawingController : ControllerBase
    {
        private readonly IDrawingService _drawingService;

        public DrawingController(IDrawingService drawingService)
        {
            _drawingService = drawingService;
        }
        [HttpPost("save")]
        public async Task<IActionResult> Save([FromBody] DrawingDto dto)
        {
            if (dto.Commands == null || dto.Commands.Count == 0)
                return BadRequest("CanvasJson is required.");

            var id = await _drawingService.SaveDrawingAsync(dto);
            return Ok(new { id });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get(Guid id)
        {
            var drawing = await _drawingService.GetDrawingAsync(id);
            return drawing == null ? NotFound() : Ok(drawing);
        }


        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUserId(string userId)
        {
            var drawings = await _drawingService.GetDrawingsByUserIdAsync(userId);
            return Ok(drawings);
        }

    }
}
