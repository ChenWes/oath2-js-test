$(document).ready(function(){console.log('document ready for index');});


document.getElementById('login').addEventListener("click", signin, false);

Oidc.Log.logger = console;
Oidc.Log.level = Oidc.Log.INFO;

var settings = {
    authority: 'http://localhost:5000/oidc',
    client_id: 'js.tokenmanager',
    redirect_uri: 'http://baidu.com',
    post_logout_redirect_uri: 'http://localhost:5000/oidc-client-sample.html',
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

var signinResponse;
function processSigninResponse() {
    client.processSigninResponse().then(function(response) {
        signinResponse = response;
        log("signin response", signinResponse);
    }).catch(function(err) {
        log(err);
    });
}

function signinDifferentCallback(){
    client.createSigninRequest({ state: { bar: 15 }, redirect_uri: 'http://localhost:5000/oidc-client-sample-callback.html' }).then(function(req) {
        log("signin request", req, "<a href='" + req.url + "'>go signin</a>");
        if (followLinks()) {
            window.location = req.url;
        }
    }).catch(function(err) {
        log(err);
    });
}

function signout() {
    client.createSignoutRequest({ id_token_hint: signinResponse && signinResponse.id_token, state: { foo: 5 } }).then(function(req) {
        log("signout request", req, "<a href='" + req.url + "'>go signout</a>");
        if (followLinks()) {
            window.location = req.url;
        }
    });
}

function processSignoutResponse() {
    client.processSignoutResponse().then(function(response) {
        signinResponse = null;
        log("signout response", response);
    }).catch(function(err) {
        log(err);
    });
}

function toggleLinks() {
    var val = document.getElementById('links').checked;
    localStorage.setItem("follow", val);

    var display = val ? 'none' : '';

    document.getElementById('processSignin').style.display = display;
    document.getElementById('processSignout').style.display = display;
}

function followLinks() {
    return localStorage.getItem("follow") === "true";
}

var follow = followLinks();
// var display = follow ? 'none' : '';
// document.getElementById('links').checked = follow;
// document.getElementById('processSignin').style.display = display;
// document.getElementById('processSignout').style.display = display;

if (followLinks()) {
    if (window.location.href.indexOf("#") >= 0) {
        processSigninResponse();
    }
    else if (window.location.href.indexOf("?") >= 0) {
        processSignoutResponse();
    }
}
