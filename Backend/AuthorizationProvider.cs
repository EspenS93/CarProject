using System;
using System.Linq;
using System.Threading.Tasks;
using AspNet.Security.OpenIdConnect.Server;
using AspNet.Security.OpenIdConnect.Primitives;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Backend.Models;

namespace Backend
{
    public sealed class AuthorizationProvider : OpenIdConnectServerProvider
    {
            // Implement OnValidateAuthorizationRequest to support interactive flows (code/implicit/hybrid).
            public override async Task ValidateAuthorizationRequest(ValidateAuthorizationRequestContext context)
        {
            if (!context.Request.IsAuthorizationCodeFlow())
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.UnsupportedResponseType,
                    description: "Only the authorization code flow is supported by this authorization server.");
                return;
            }

            if(!string.IsNullOrEmpty(context.Request.ResponseMode) && !context.Request.IsFormPostResponseMode() && !context.Request.IsFragmentResponseMode() && !context.Request.IsQueryResponseMode())
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidRequest,
                    description: "The specified 'response_mode' is unsupported.");
                return;
            }
            var database = context.HttpContext.RequestServices.GetRequiredService<EgenutviklingContext>();

            var application = await (from entity in database.Applications
                                     where entity.ApplicationID == context.ClientId
                                     select entity).SingleOrDefaultAsync(context.HttpContext.RequestAborted);

            if (application == null)
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidClient,
                    description: "The specified client identifier is invalid.");

                return;
            }

            if(!string.IsNullOrEmpty(context.RedirectUri) &&
                !string.Equals(context.RedirectUri, application.RedirectUri, StringComparison.Ordinal))
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidClient,
                    description: "The specified 'redirect_uri' is invalid.");

                return;
            }

            context.Validate(application.RedirectUri);
        }
            // Implement OnValidateTokenRequest to support flows using the token endpoint
            // (code/refresh token/password/client credentials/custom grant).
            public override async Task ValidateTokenRequest(ValidateTokenRequestContext context)
        {
            if(!context.Request.IsAuthorizationCodeGrantType() && !context.Request.IsRefreshTokenGrantType())
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.UnsupportedGrantType,
                    description: "Only authorization code and refresh token grant type are accepted by this authorization server.");

                    return;
            }

            if(string.IsNullOrEmpty(context.ClientId) || string.IsNullOrEmpty(context.ClientSecret))
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidRequest,
                    description: "The mandatory 'client_id'/'client_secret' parameters are missing");

                return;
            }

            var database = context.HttpContext.RequestServices.GetRequiredService<EgenutviklingContext>();

            var application = await (from entity in database.Applications
                                     where entity.ApplicationID == context.ClientId
                                     select entity).SingleOrDefaultAsync(context.HttpContext.RequestAborted);

            if (application == null)
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidClient,
                    description: "The specified client identifier is invalid");

                return;
            }

            if(!string.Equals(context.ClientSecret, application.Secret, StringComparison.Ordinal))
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidClient,
                    description: "The specified client identifier is invalid");

                return;
            }
            context.Validate();

        } /*
        public override async Task ValidateLogoutRequest(ValidateAuthorizationRequestContext context)
        {

            var database = context.HttpContext.RequestServices.GetRequiredService<EgenutviklingContext>();

            if (!string.IsNullOrEmpty(context.PostLogoutRedirectUri) && !await database.Applications.AnyAsync(application => application.LogoutRedirectUri == context.PostLogoutRedirectUri))
            {
                context.Reject(
                    error: OpenIdConnectConstants.Errors.InvalidRequest,
                    description: "The specified 'post_logout_redirect_uri' is invalid.");

                return;
            }

            context.Validate();
        }*/
    }
}
