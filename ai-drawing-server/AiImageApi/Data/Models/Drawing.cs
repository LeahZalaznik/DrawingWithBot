namespace AiImageApi.Data.Models
{
    public class Drawing
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Prompt { get; set; }
        public string CommandsJson { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public   ICollection<Message> Messages { get; set; } 


    }

    public class PromptRequest
    {
            public string Prompt { get; set; }
            public List<DrawingCommand> Canvas { get; set; }
            public int CanvasWidth { get; set; } 
            public int CanvasHeight { get; set; }
    }
}