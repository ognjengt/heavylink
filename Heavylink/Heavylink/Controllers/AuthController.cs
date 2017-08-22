using Heavylink.DB;
using Heavylink.Helpers;
using Heavylink.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Heavylink.Controllers
{
    public class AuthController : ApiController
    {
        PasswordCrypter pcrypter = new PasswordCrypter();
        MongoDbOperater DbOperater = new MongoDbOperater("mongodb://localhost", "heavylink");

        [HttpPost]
        [AllowAnonymous]
        [ActionName("SignUp")]
        public async Task<bool> SignUp(User u)
        {
            User userExists = await DbOperater.CheckUserExists(u.Email, u.Username);
            if (userExists != null)
            {
                return false;
            }
            string hash = pcrypter.CryptPassword(u.Password);
            await DbOperater.UsersCollection.InsertOneAsync(new User
            {
                Username = u.Username,
                Email = u.Email,
                Password = hash
            });

            return true;
        }

        [HttpPost]
        [AllowAnonymous]
        [ActionName("Login")]
        public async Task<string> Login(User u)
        {
            User user = await DbOperater.CheckLogin(u.Email);
            if (user == null)
            {
                return "User does not exist";
            }
            else
            {
                if (pcrypter.ValidatePassword(u.Password,user.Password))
                {
                    return JwtManager.GenerateToken(user);
                }
                else
                {
                    return "Wrong credentials";
                }
            }

            throw new HttpResponseException(HttpStatusCode.Unauthorized);
        }
    }
}
