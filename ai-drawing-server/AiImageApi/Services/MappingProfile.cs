using AiImageApi.Data.Models;
using AiImageApi.NewFolder;
using AutoMapper;
using System.Text.Json;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<DrawingDto, Drawing>()
            .ForMember(dest => dest.CommandsJson, opt => opt.MapFrom(src => SerializeCommands(src.Commands)))
            .ForMember(dest => dest.CreatedAt, opt => opt.MapFrom(_ => DateTime.UtcNow))
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.UserId, opt => opt.Ignore()) 
            .ForMember(dest => dest.User, opt => opt.Ignore())   
            .ForMember(dest => dest.Messages, opt => opt.Ignore()); 

        CreateMap<Drawing, DrawingDto>()
            .ForMember(dest => dest.UserEmail, opt => opt.MapFrom(src => src.User.Email))
            .ForMember(dest => dest.Commands, opt => opt.MapFrom(src => DeserializeCommands(src.CommandsJson)))
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id.ToString()))
            .ForMember(dest => dest.Messages, opt => opt.MapFrom(src => src.Messages));

        CreateMap<Message, MessageDto>()
            .ForMember(dest => dest.DrawingId, opt => opt.MapFrom(src => src.Drawing.Id.ToString()));

        CreateMap<MessageDto, Message>()
            .ForMember(dest => dest.Id, opt => opt.Ignore())
            .ForMember(dest => dest.DrawingId, opt => opt.Ignore())
            .ForMember(dest => dest.Drawing, opt => opt.Ignore());
    }

    private static string SerializeCommands(List<DrawingCommand> commands)
    {
        return JsonSerializer.Serialize(commands);
    }

    private static List<DrawingCommand> DeserializeCommands(string commandsJson)
    {
        return JsonSerializer.Deserialize<List<DrawingCommand>>(commandsJson) ?? new();
    }
}
