using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Backend.Models;

namespace Backend.Controllers
{
    [Route("api/[controller]")]
    public class ImagesController : Controller
    {
        private readonly EgenutviklingContext _context;

        public ImagesController(EgenutviklingContext context)
        {
            _context = context;
        }
        // GET api/Images
        [HttpGet]
        public IEnumerable<Image> Get()
        {
            return _context.Images.ToList();
        }
        // GET api/Images/5
        [HttpGet("/api/carimage/{id:guid}", Name = "GetImageByCarId")]
        public IActionResult GetByCarid(Guid id)
        {
            var image = _context.Images.FirstOrDefault(c => c.carId == id);
            if (image == null)
            {
                return NotFound();
            }
            return new ObjectResult(image);
        }
        // GET api/Images/5
        [HttpGet("/api/image/{id:guid}", Name = "GetImage")]
        public IActionResult GetImage(Guid id)
        {
            var image = _context.Images.FirstOrDefault(c => c.id == id);
            if (image == null)
            {
                return NotFound();
            }
            return new ObjectResult(image);
        }

        // POST api/Images
        [HttpPost]
        public IActionResult Create([FromBody]Image image)
        {
            if (image == null)
            {
                return BadRequest();
            }
            _context.Images.Add(image);

            _context.SaveChanges();

            return CreatedAtRoute("GetImage", new { id = image.id }, image);
        }

        // PUT api/Images/5
        [HttpPut("{id:guid}")]
        public IActionResult Update(Guid id, [FromBody]Image newImage)
        {
            if (newImage == null || newImage.id != id)
            {
                return BadRequest();
            }

            Image oldImage = _context.Images.FirstOrDefault(c => c.id == id);
            if (oldImage == null)
            {
                return NotFound();
            }

            _context.Images.Update(oldImage);
            _context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE api/Images/5
        [HttpDelete("{carId:guid}")]
        public IActionResult Delete(Guid carId)
        {
            var image = _context.Images.First(i => i.carId == carId);
            if (image == null)
            {
                return NotFound();
            }

            _context.Images.Remove(image);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
