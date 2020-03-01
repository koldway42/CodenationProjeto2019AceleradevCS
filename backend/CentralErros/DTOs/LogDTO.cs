using System;
using System.ComponentModel.DataAnnotations;

namespace CentralErros.DTOs
{
    public class LogDTO
    {
        public int Id { get; set; }

        [Required]
        public string Level { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public string Detail { get; set; }

        [Required]
        public string Origin { get; set; }

        [Required]
        public string Environment { get; set; }

        public bool Archived { get; set; }

        public DateTime CreatedAt { get; set; }

        [Required]
        public int UserId { get; set; }
    }
}
