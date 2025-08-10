using Microsoft.EntityFrameworkCore;
using AiImageApi.Data.Models;

namespace AImageApi.Data;

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Drawing> Drawings { get; set; }
        public DbSet<DrawingCommand> DrawingsCommands { get; set; }
        public DbSet<Message> Messages { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Drawing>()
            .HasMany(d => d.Messages)
            .WithOne(m => m.Drawing)
            .HasForeignKey(m => m.DrawingId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}

