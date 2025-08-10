using AiImageApi.Data.Models;

namespace AiImageApi.NewFolder
{
    public class DrawingDto
    {
        public string Id { get; set; }
        public string UserEmail { get; set; }
        public string ?Title { get; set; }
        public string ?Prompt { get; set; }
        public List<DrawingCommand> Commands { get; set; }
        public List<MessageDto> Messages { get; set; }
    }
    public class MessageDto
    {
        public int Id { get; set; }
        public string Text { get; set; } = string.Empty;
        public string Sender { get; set; } = string.Empty;
        public string? ImageUrl { get; set; }
        public string DrawingId { get; set; }

    }

}
