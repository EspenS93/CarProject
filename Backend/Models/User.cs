using System;

namespace Backend.Models
{
    public class User {
        public Guid id { get; set; }
        public string username { get; set; }
        public string password { get; set; }
        public string firstname { get; set; }
        public string lastname { get; set; }
    }
}