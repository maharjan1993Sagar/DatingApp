﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using vega.Controllers.Resources;
using vega.Models;
using vega.Persistence;

namespace vega.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModelController : ControllerBase
    {
        public readonly VegaDbContext context;
        public readonly IMapper mapper;
        public ModelController(VegaDbContext context, IMapper mapper)
        {
            this.context = context;
            this.mapper = mapper;
        }

        [HttpGet("/api/models")]
        public async Task<IEnumerable<ModelResource>> GetMakes()
        {
            var models = await context.Models.ToListAsync();

            return mapper.Map<List<Model>, List<ModelResource>>(models);
        }
    }
}