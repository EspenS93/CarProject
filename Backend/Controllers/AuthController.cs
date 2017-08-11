using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class AuthController : Controller
    {
        private readonly EgenutviklingContext _context;

        public AuthController(EgenutviklingContext context)
        {
            _context = context;
        }
        // GET api/Auth
        [HttpGet]
        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }
        [HttpPost("/api/authenticate", Name = "Authenticate")]
        public IActionResult Authenticate([FromBody]User user)
        {
            if (user == null)
            {
                return BadRequest();
            }
            var foundUser =_context.Users.First(u => u.username == user.username && u.password == user.password);

            if(foundUser != null)
            {
                return Ok( new { token="derp"});
            }
            return BadRequest();
        }
        // POST api/Auth
        [HttpPost]
        public IActionResult Create([FromBody]User user)
        {
            if(user == null)
            {
                return BadRequest();
            }
            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtRoute("GetUser", new { id = user.id }, user);
        }
        // GET api/Cars/5
        [HttpGet("/api/user/{id}", Name = "GetUser")]
        public IActionResult GetByid(Guid id)
        {
            var user = _context.Users.First(c => c.id == id);
            if (user == null)
            {
                return NotFound();
            }
            return new ObjectResult(user);
        }
    }
}
