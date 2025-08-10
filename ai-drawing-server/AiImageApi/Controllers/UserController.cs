using AiImageApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace AiImageApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("LoginOrRegister")]
        public async Task<IActionResult> LoginOrRegister([FromBody] string userIdentifier)
        {
            if (string.IsNullOrWhiteSpace(userIdentifier))
                return BadRequest("יש להזין מזהה תקין");
            var userId = await _userService.LoginOrRegisterAsync(userIdentifier);
            return Ok(userId);
        }
    }
}
