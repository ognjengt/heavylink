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
        public IMongoCollection<GeneratedLink> GeneratedLinksCollection { get; set; }

        public MongoDbOperater() { }

        public MongoDbOperater(string address, string dbName)
        {
            this.Client = new MongoClient(address);
            this.Database = Client.GetDatabase(dbName);
            this.GeneratedLinksCollection = Database.GetCollection<GeneratedLink>("generatedLinks");
        }

        public async Task<bool> AddNewLink(GeneratedLink generatedLink)
        {
            await GeneratedLinksCollection.Indexes.CreateOneAsync(Builders<GeneratedLink>.IndexKeys.Ascending(_ => _.GeneratedUrl));
            await GeneratedLinksCollection.InsertOneAsync(generatedLink);
            return true;
        }
    }

    
}