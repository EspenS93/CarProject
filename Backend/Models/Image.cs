using System;
using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Image {
        [Key]
        public Guid id { get; set; }
        public Guid carId { get; set; }
        public string contentType { get; set; }
        public string image { get; set; }
    
    }
}