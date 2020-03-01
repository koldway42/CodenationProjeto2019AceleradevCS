using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralErros.Models
{
    [Table("log")]
    public class Log
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("level")]
        [StringLength(10)]
        [Required]
        public string Level { get; set; }

        [Column("title")]
        [StringLength(255)]
        [Required]
        public string Title { get; set; }

        [Column("detail")]
        [Required]
        public string Detail { get; set; }

        [Column("origin")]
        [StringLength(100)]
        [Required]
        public string Origin { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("environment")]
        [Required]
        public string Environment { get; set; }

        [Column("archived")]
        public bool Archived { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User User { get; set; }
    }
}
