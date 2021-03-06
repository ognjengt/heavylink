﻿using Heavylink.DB;
using Heavylink.Filters;
using Heavylink.Helpers;
using Heavylink.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.Filters;

namespace Heavylink.Filters
{
    public class JwtAuthenticationAttribute : Attribute, IAuthenticationFilter
    {
        public string Realm { get; set; }
        public bool AllowMultiple => false;

        public async Task AuthenticateAsync(HttpAuthenticationContext context, CancellationToken cancellationToken)
        {
            var request = context.Request;
            var authorization = request.Headers.Authorization;

            if (authorization == null || authorization.Scheme != "Bearer")
                return;

            if (string.IsNullOrEmpty(authorization.Parameter))
            {
                context.ErrorResult = new AuthenticationFailureResult("Missing Jwt Token", request);
                return;
            }

            var token = authorization.Parameter;
            var principal = await AuthenticateJwtToken(token);

            if (principal == null)
                context.ErrorResult = new AuthenticationFailureResult("Invalid token", request);

            else
                context.Principal = principal;
        }



        private static bool ValidateToken(string token, out string email, out string username)
        {
            email = null;
            username = null;

            var simplePrinciple = JwtManager.GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var emailClaim = identity.FindFirst(ClaimTypes.Email);
            email = emailClaim?.Value;

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim?.Value;

            if (string.IsNullOrEmpty(email))
                return false;

            if (string.IsNullOrEmpty(username))
                return false;

            MongoDbOperater DbOperater = new MongoDbOperater("mongodb://localhost", "heavylink");
            User u = DbOperater.CheckUserExistsNotAsync(email, username);
            if (u == null)
            {
                return false;
            }
            
            return true;
        }

        /// <summary>
        /// Proverava da li korisnik koji zahteva resurs je taj za koga se predstavlja
        /// </summary>
        public static bool CheckResourceRequest(string token, string predstavljenKao)
        {
            string email = null;
            string username = null;

            var simplePrinciple = JwtManager.GetPrincipal(token);
            var identity = simplePrinciple.Identity as ClaimsIdentity;

            if (identity == null)
                return false;

            if (!identity.IsAuthenticated)
                return false;

            var emailClaim = identity.FindFirst(ClaimTypes.Email);
            email = emailClaim?.Value;

            var usernameClaim = identity.FindFirst(ClaimTypes.Name);
            username = usernameClaim?.Value;

            if (string.IsNullOrEmpty(email))
                return false;

            if (string.IsNullOrEmpty(username))
                return false;

            if (predstavljenKao != username)
            {
                return false;
            }

            MongoDbOperater DbOperater = new MongoDbOperater("mongodb://localhost", "heavylink");
            User u = DbOperater.CheckUserExistsNotAsync(email, username);
            if (u == null)
            {
                return false;
            }

            return true;
        }

        protected Task<IPrincipal> AuthenticateJwtToken(string token)
        {
            string email;
            string username;

            if (ValidateToken(token, out email, out username))
            {
                // based on username to get more information from database in order to build local identity
                var claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, email),
                    new Claim(ClaimTypes.Name, username)
                    // Add more claims if needed: Roles, ...
                };

                var identity = new ClaimsIdentity(claims, "Jwt");
                IPrincipal user = new ClaimsPrincipal(identity);

                return Task.FromResult(user);
            }

            return Task.FromResult<IPrincipal>(null);
        }

        public Task ChallengeAsync(HttpAuthenticationChallengeContext context, CancellationToken cancellationToken)
        {
            Challenge(context);
            return Task.FromResult(0);
        }

        private void Challenge(HttpAuthenticationChallengeContext context)
        {
            string parameter = null;

            if (!string.IsNullOrEmpty(Realm))
                parameter = "realm=\"" + Realm + "\"";

            context.ChallengeWith("Bearer", parameter);
        }
    }
}