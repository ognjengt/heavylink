using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Heavylink.Helpers
{
    public class PasswordCrypter
    {
        public string GetRandomSalt()
        {
            return BCrypt.Net.BCrypt.GenerateSalt(12);
        }
        public string CryptPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, GetRandomSalt());
        }

        public bool ValidatePassword(string password, string correctHash)
        {
            return BCrypt.Net.BCrypt.Verify(password, correctHash);
        }

        public PasswordCrypter() { }
    }
}