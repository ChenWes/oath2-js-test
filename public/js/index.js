$(document).ready(function(){console.log('document ready for index');});


document.getElementById('login').addEventListener("click", signin, false);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

var settings = {
    authority: 'http://localhost:3000/oidc',
    client_id: 'js.tokenmanager',
    redirect_uri: 'http://localhost:3000/',
    post_logout_redirect_uri: 'http://localhost:3000/',
    response_type: 'id_token token',
    scope: 'openid email roles',

    filterProtocolClaims: true,
    loadUserInfo: true
};
var client = new Oidc.OidcClient(settings);


function signin() {
    client.createSigninRequest({ state: { bar: 15 } }).then(function(req) {
        log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
        if (followLinks()) {
            window.location = req.url;
        }
    }).catch(function(err) {
        log(err);
    });
}
