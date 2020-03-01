using AutoMapper;
using CentralErros.DTOs;
using CentralErros.Models;

namespace CentralErros
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<User, UserDTO>().ReverseMap();
            CreateMap<Log, LogDTO>().ReverseMap();
        }
    }
}
