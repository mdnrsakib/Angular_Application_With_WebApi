using Microsoft.EntityFrameworkCore;
using SPA_Project_M9_02.HostedService;
using SPA_Project_M9_02.Models;
using SPA_Project_M9_02.Repositories;
using SPA_Project_M9_02.Repositories.Interfaces;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<TravelTourDbContext>(o => o.UseSqlServer(builder.Configuration.GetConnectionString("db")));
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddHostedService<SeederHostedServiceDb>();
builder.Services.AddCors(p => p.AddPolicy("EnableCors", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader();
}));
builder.Services.AddControllers()
     .AddNewtonsoftJson(option => {
         option.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Serialize;
         option.SerializerSettings.PreserveReferencesHandling = Newtonsoft.Json.PreserveReferencesHandling.Objects;
     });
var app = builder.Build();
app.UseStaticFiles();
app.UseRouting();
app.UseAuthorization();

app.UseCors("EnableCors");

app.MapControllers();

app.Run();

