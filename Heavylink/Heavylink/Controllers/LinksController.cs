using Heavylink.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Heavylink.DB;
using System.Threading.Tasks;
using System.Threading;
using Heavylink.Filters;
using MongoDB.Driver;
using MongoDB.Bson;
using System.Web.Http.Filters;
using Heavylink.Helpers;
using System.Security.Claims;

namespace Heavylink.Controllers
{
    public class LinksController : ApiController
    {
        MongoDbOperater DbOperater = new MongoDbOperater("mongodb://localhost", "heavylink");

        [HttpPost]
        [AllowAnonymous]
        [ActionName("GenerateGroupLink")]
        public async Task<string> GenerateGroupLink([FromBody]Links links)
        {
            var token = Request.Headers.Authorization.Parameter;
            string usernameInToken = "Anonymous";
            if (token == "" || token == "null")
            {
                if (links.Urls.Count > 10)
                {
                    return "Please login so you could save more than 10 links";
                }
            }
            else
            {
                var simplePrinciple = JwtManager.GetPrincipal(token);
                var identity = simplePrinciple.Identity as ClaimsIdentity;
                var usernameClaim = identity.FindFirst(ClaimTypes.Name);
                usernameInToken = usernameClaim?.Value;

                if (links.Urls.Count > 20)
                {
                    return "No more than 20 links per group";
                }
            }

            //Thread.Sleep(2000);
            Guid g = Guid.NewGuid();
            string uniqueUrl = Convert.ToBase64String(g.ToByteArray());
            uniqueUrl = uniqueUrl.Replace("=", "");
            uniqueUrl = uniqueUrl.Replace("+", "");
            uniqueUrl = uniqueUrl.Replace("/", "");

            Record gl = new Record();
            gl.GeneratedUrl = uniqueUrl;
            gl.Urls = links.Urls;
            gl.DateCreated = DateTime.Now;
            gl.Author = usernameInToken;
            gl.Title = links.Title;
            gl.Private = false;

            bool added = await DbOperater.AddNewLink(gl);
            if (!added)
            {
                return "failed";
            }

            return uniqueUrl;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<Record> GetLinksForThisUrl(string code)
        {
            Record record = await DbOperater.GetLinksForThisUrl(code);
            return record;
        }

        [JwtAuthentication]
        [HttpGet]
        public async Task<List<Record>> GetUserLinks(string username)
        {
            var token = Request.Headers.Authorization.Parameter;
            bool isWhoHeSaysHeIs = JwtAuthenticationAttribute.CheckResourceRequest(token, username);
            if (!isWhoHeSaysHeIs) throw new UnauthorizedAccessException();

            var records = await DbOperater.GetUserLinks(username);
            return records;
        }

        [JwtAuthentication]
        [HttpPost]
        [ActionName("ChangeLinkTitle")]
        public async Task<bool> ChangeLinkTitle(RecordRequest r)
        {
            var token = Request.Headers.Authorization.Parameter;
            Record recordToCheck = await DbOperater.GeneratedLinksCollection.Find(_ => _.Id == ObjectId.Parse(r.Id)).SingleAsync();
            JwtManager.CheckResource(token, recordToCheck);

            var filter = Builders<Record>.Filter.Eq("Id", ObjectId.Parse(r.Id));
            var update = Builders<Record>.Update.Set("Title",r.Title);
            var result = await DbOperater.GeneratedLinksCollection.UpdateOneAsync(filter, update);
            return true;
        }

        [JwtAuthentication]
        [HttpPost]
        [ActionName("UpdateSettings")]
        public async Task<bool> UpdateSettings(RecordRequest r)
        {
            var token = Request.Headers.Authorization.Parameter;
            Record recordToCheck = await DbOperater.GeneratedLinksCollection.Find(_ => _.Id == ObjectId.Parse(r.Id)).SingleAsync();
            JwtManager.CheckResource(token, recordToCheck);

            var filter = Builders<Record>.Filter.Eq("Id", ObjectId.Parse(r.Id));
            var update = Builders<Record>.Update.Set("Private", r.Private);
            var result = await DbOperater.GeneratedLinksCollection.UpdateOneAsync(filter, update);
            return true;
        }

        [JwtAuthentication]
        [HttpPost]
        [ActionName("DeleteLink")]
        public async Task<bool> DeleteLink(RecordRequest r)
        {
            var token = Request.Headers.Authorization.Parameter;
            Record recordToCheck = await DbOperater.GeneratedLinksCollection.Find(_ => _.Id == ObjectId.Parse(r.Id)).SingleAsync();
            JwtManager.CheckResource(token, recordToCheck);

            var filter = Builders<Record>.Filter.Eq("Id", ObjectId.Parse(r.Id));
            var result = await DbOperater.GeneratedLinksCollection.DeleteOneAsync(filter);
            return true;
        }

        [AllowAnonymous]
        [HttpGet]
        [ActionName("GetRecent")]
        public async Task<List<Record>> GetRecent()
        {
            List<Record> recent = await DbOperater.GeneratedLinksCollection.Find(_ => _.Private == false).SortByDescending(_ => _.DateCreated).Limit(6).ToListAsync();
            return recent;
        }

    }
}
