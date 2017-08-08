using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Bson;
using MongoDB.Driver;
using Heavylink.Models;
using System.Threading.Tasks;

namespace Heavylink.DB
{
    public class MongoDbOperater
    {
        public MongoClient Client { get; set; }
        public IMongoDatabase Database { get; set; }
        public IMongoCollection<Record> GeneratedLinksCollection { get; set; }

        public MongoDbOperater() { }

        public MongoDbOperater(string address, string dbName)
        {
            this.Client = new MongoClient(address);
            this.Database = Client.GetDatabase(dbName);
            this.GeneratedLinksCollection = Database.GetCollection<Record>("generatedLinks");
        }

        public async Task<bool> AddNewLink(Record generatedLink)
        {
            //await GeneratedLinksCollection.Indexes.CreateOneAsync(Builders<Record>.IndexKeys.Ascending("DateCreated"), new CreateIndexOptions { ExpireAfter = new TimeSpan(0,0,50)});
            await GeneratedLinksCollection.InsertOneAsync(generatedLink);
            return true;
        }

        public async Task<Record> GetLinksForThisUrl(string code)
        {
            var record = await GeneratedLinksCollection.Find(l => l.GeneratedUrl == code).SingleOrDefaultAsync();
            return record;
        }
    }

    
}