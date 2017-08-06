using Heavylink.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Heavylink.DB;
using System.Threading.Tasks;

namespace Heavylink.Controllers
{
    public class LinksController : ApiController
    {
        MongoDbOperater DbOperater = new MongoDbOperater("mongodb://localhost", "heavylink");
        [HttpPost]
        [ActionName("GenerateGroupLink")]
        public async Task<string> GenerateGroupLink([FromBody]Links links)
        {
            Guid g = Guid.NewGuid();
            string uniqueUrl = Convert.ToBase64String(g.ToByteArray());
            uniqueUrl = uniqueUrl.Replace("=", "");
            uniqueUrl = uniqueUrl.Replace("+", "");
            uniqueUrl = uniqueUrl.Replace("/", "");

            Record gl = new Record();
            gl.GeneratedUrl = uniqueUrl;
            gl.Urls = links.Urls;
            gl.DateCreated = DateTime.Now;

            bool added = await DbOperater.AddNewLink(gl);
            if (!added)
            {
                return "failed";
            }

            return uniqueUrl;
        }

        public async Task<Record> GetLinksForThisUrl(string code)
        {
            Record record = await DbOperater.GetLinksForThisUrl(code);
            return record;
        }
    }
}
