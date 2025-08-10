using AiImageApi.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using AiImageApi.Data.Models;
namespace AiImageApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromptController : ControllerBase
    {
            private readonly IPromptService _promptService;

            public PromptController(IPromptService promptService)
            {
                _promptService = promptService;
            }

            [HttpPost]
            public async Task<IActionResult> createDrawingByPrompt([FromBody] PromptRequest request)
            {
                var jsonResult = await _promptService.GetDrawingJsonAsync(request);
                return Ok(jsonResult);
            }
        }


}

