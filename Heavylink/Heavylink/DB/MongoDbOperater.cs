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
        public IMongoCollection<User> UsersCollection { get; set; }

        public MongoDbOperater() { }

        public MongoDbOperater(string address, string dbName)
        {
            this.Client = new MongoClient(address);
            this.Database = Client.GetDatabase(dbName);
            this.GeneratedLinksCollection = Database.GetCollection<Record>("generatedLinks");
            this.UsersCollection = Database.GetCollection<User>("users");
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

        public async Task<User> CheckUserExists(string email, string username)
        {
            User exists = null;
            exists = await UsersCollection.Find(u => u.Email == email).SingleOrDefaultAsync();
            if (exists != null)
            {
                return exists;
            }
            exists = await UsersCollection.Find(u => u.Username == username).SingleOrDefaultAsync();
            return exists;
        }

        public async Task<User> CheckLogin(string email)
        {
            User exists = await UsersCollection.Find(u => u.Email == email).SingleOrDefaultAsync();
            return exists;
        }

        public async Task<List<Record>> GetUserLinks(string username)
        {
            var records = await GeneratedLinksCollection.Find(l => l.Author == username).ToListAsync();
            return records;
        }
    }

    
}