using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Heavylink.Models
{
    public class Link
    {
        public string Url { get; set; }

        public Link(string url)
        {
            this.Url = url;
        }
    }
}