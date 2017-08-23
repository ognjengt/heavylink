using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Heavylink.Models
{
    public class RecordRequest
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Email { get; set; }
        public string GeneratedUrl { get; set; }
        public string Author { get; set; }
        public bool Private { get; set; }
    }
}