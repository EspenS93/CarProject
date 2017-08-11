using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using AspNet.Security.OpenIdConnect.Server;
using AspNet.Security.OAuth.Validation;
using Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Backend
{
    public class Startup
    {
        public Startup(IHostingEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();
        }


        public IConfigurationRoot Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add framework services.
            services.AddDbContext<EgenutviklingContext>(opt => opt.UseSqlServer(Configuration.GetConnectionString("egenutviklingDB")));
            services.AddMvc();
            services.AddAuthentication();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory)
        {
            app.UseOAuthValidation();
            app.UseOpenIdConnectServer(options =>
            {
                options.Provider = new AuthorizationProvider();
                options.AuthorizationEndpointPath = "/connect/authorize";
                options.TokenEndpointPath = "/connect/token";
                options.AllowInsecureHttp = true;
            });
            loggerFactory.AddConsole(Configuration.GetSection("Logging"));
            loggerFactory.AddDebug();
            app.Use(async (context, next) =>
            {
                await next();

                if (context.Response.StatusCode == 404 &&
                !System.IO.Path.HasExtension(context.Request.Path.Value) &&
                !context.Request.Path.Value.StartsWith("/api/"))
                {
                    context.Request.Path = "/index.html";
                    await next();
                }
            });            
            app.UseStaticFiles();
            app.UseMvc();
        }
    }
}
