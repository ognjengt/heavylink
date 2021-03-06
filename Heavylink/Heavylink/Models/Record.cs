﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Heavylink.Models
{
    public class Record
    {
        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string GeneratedUrl { get; set; }
        public bool Private { get; set; }
        public List<string> Urls { get; set; }
        public string Author { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateExpires { get; set; }

    }
}