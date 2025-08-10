namespace AiImageApi.Data.Models
{
    public class Message
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public string Sender { get; set; }
        public string? ImageUrl { get; set; }
        public Guid DrawingId { get; set; }
        public virtual Drawing Drawing { get; set; }

    }
}
