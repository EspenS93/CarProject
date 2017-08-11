using System;

namespace Backend.Models
{
    public class Car {
        public Guid id { get; set; }
        public string name { get; set; }
        public string color { get; set; }
        public string make { get; set; }
        public string model { get; set; }
    }
}