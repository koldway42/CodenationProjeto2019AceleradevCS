using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CentralErros.Models
{
    [Table("user")]
    public class User
    {
        [Column("id")]
        [Key]
        public int Id { get; set; }

        [Column("full_name")]
        [StringLength(100)]
        public string FullName { get; set; }

        [Column("email")]
        [StringLength(100)]
        [Required]
        public string Email { get; set; }

        [Column("password")]
        [StringLength(255)]
        [Required]
        public string Password { get; set; }

        public virtual ICollection<Log> Logs { get; set; }
    }
}
