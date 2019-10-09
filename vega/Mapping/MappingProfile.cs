using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vega.Controllers.Resources;
using vega.Dtos;
using vega.Handler;
using vega.Models;

namespace vega.Mapping
{
    public class MappingProfile :Profile
    {
        public MappingProfile()
        {
            CreateMap<Make, MakeResource>();
            CreateMap<Model, ModelResource>();
            CreateMap<Feature, KeyValuePairResource>();
            CreateMap<User, UserForListDto>()
                .ForMember(dest =>dest.PhotoUrl, opt=> {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(m => m.IsMain).Url);
                });
            CreateMap<User, UserForListDto>()
                  .ForMember(dest => dest.PhotoUrl, opt => {
                      opt.MapFrom(src => src.Photos.FirstOrDefault(m => m.IsMain).Url);
                  })
                  .ForMember(dest => dest.Age,opt => {
                      opt.MapFrom(d => d.DateOfBirth.CalculateAge());

                  });
            CreateMap<User, UserForDetailedDto>()
                  .ForMember(dest => dest.PhotoUrl, opt => {
                      opt.MapFrom(src => src.Photos.FirstOrDefault(m => m.IsMain).Url);
                  })
                  .ForMember(dest => dest.Age, opt => {
                      opt.MapFrom(d => d.DateOfBirth.CalculateAge());

                  });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();

        }
    }
}
 