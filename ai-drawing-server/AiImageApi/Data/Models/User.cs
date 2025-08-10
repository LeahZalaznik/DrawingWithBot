using System.ComponentModel.DataAnnotations;

namespace AiImageApi.Data.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        public List<Drawing> Drawings { get; set; } = new();
    }
}
