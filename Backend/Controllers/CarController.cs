using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;
using System.Diagnostics;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class CarsController : Controller
    {
        private readonly EgenutviklingContext _context;

        public CarsController(EgenutviklingContext context)
        {
            _context = context;
        }
        // GET api/Cars
        [HttpGet]
        public IEnumerable<Car> Get()
        {
            return _context.Cars.ToList();
        }
        // GET api/Cars/4
        [HttpGet("{cars}", Name = "GetTopCars")]
        public IEnumerable<Car> Get(int cars)
        {
            return _context.Cars.Take(cars).ToList();
        }
        // GET api/Cars/carName
        [HttpGet("/api/findCars/{searchTerm}", Name = "GetCarFittingSearch")]
        public IEnumerable<Car> Get(string searchTerm)
        {
            return _context.Cars.Where(c => c.name.Contains(searchTerm)).ToList();
        }
        // GET api/Cars/5
        [HttpGet("/api/car/{id}", Name = "GetCar")]
        public IActionResult GetByid(Guid id)
        {
            var car = _context.Cars.FirstOrDefault(c => c.id == id);
            if (car == null){
                return NotFound();
            }
            return new ObjectResult(car);
        }

        // POST api/Cars
        [HttpPost]
        public IActionResult Create([FromBody]Car car)
        {
            if(car == null)
            {
                return BadRequest();
            }
            _context.Cars.Add(car);
            _context.SaveChanges();

            return CreatedAtRoute("GetCar", new { id = car.id }, car);
        }

        // PUT api/Cars/5
        [HttpPut("{id}")]
        public IActionResult Update(Guid id, [FromBody]Car newCar)
        {
            if(newCar == null || newCar.id != id)
            {
                return BadRequest();
            }

            Car oldCar = _context.Cars.FirstOrDefault(c => c.id == id);
            if(oldCar == null){
                return NotFound();
            } 
            oldCar.name = newCar.name;
            oldCar.model = newCar.model;
            oldCar.color = newCar.color;
            oldCar.make = newCar.make;
            _context.Cars.Update(oldCar);
            _context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE api/Cars/5
        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var car = _context.Cars.First(c => c.id == id);
            if(car == null){
                return NotFound();
            }

            _context.Cars.Remove(car);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
