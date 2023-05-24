const BACKEND_URL = 'http://localhost:8000'
const contentjson = { 'Content-Type': 'application/json' }
export async function navBar() {
    const response = await fetch('/navbar.html')
    const html = await response.text()
    document.getElementsByTagName('header')[0].innerHTML = html
    checkLogin()

}
function checkLogin() {
    const header_btn = document.getElementById('header_btn')
    const userdata = document.createElement('div')
    if (localStorage.getItem('payload')) {
        const profile = document.createElement('button')
        const logout = document.createElement('button')
        profile.innerText = '내 프로필'
        logout.innerText = '로그아웃'
        userdata.appendChild(profile)
        userdata.appendChild(logout)
    }
    else {
        const login = document.createElement('button')
        const signup = document.createElement('button')
        login.innerText = '로그인'
        signup.innerText = '회원가입'
        userdata.appendChild(login)
        userdata.appendChild(signup)
    }
    header_btn.appendChild(userdata)
}


export async function socialLogin(social) {
    const url = `${BACKEND_URL}/api/user/social/`;
    const response = await fetch(url, {
        method: 'POST',
        headers: contentjson,
        body: JSON.stringify({
            social,
        }),
    });
    if (response.status === 200) {
        const responseJson = await response.json();
        if (social == 'kakao') {
            window.location.href = responseJson.url;
        }
        if (social == 'google') {
            oauthSignIn(responseJson.key, responseJson.redirecturi)
        }
        if (social == 'naver') {
            window.location.href = responseJson.url;
        }
    }
}
function oauthSignIn(key, redirecturi) {
    // Google's OAuth 2.0 endpoint for requesting an access token
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    // Create <form> element to submit parameters to OAuth 2.0 endpoint.
    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); // Send as a GET request.
    form.setAttribute('action', oauth2Endpoint);

    // Parameters to pass to OAuth 2.0 endpoint.
    var params = {
        'client_id': key,
        'redirect_uri': redirecturi,
        'response_type': 'token',
        'scope': 'https://www.googleapis.com/auth/drive.metadata.readonly',
        'include_granted_scopes': 'true',
        'state': 'pass-through value',
        'prompt': 'consent'
    };

    // Add form parameters as hidden input values.
    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

    // Add form to page and submit it to open the OAuth 2.0 endpoint.
    document.body.appendChild(form);
    form.submit();
}

export async function userLogin() {
    const url = `${BACKEND_URL}/api/user/login/`;
    const form = document.getElementById('login_form')
    const response = await fetch(url, {
        method: 'POST',
        headers: contentjson,
        body: JSON.stringify({
            'email': form.email.value,
            'password': form.password.value,
        })
    })
    if(response.status == 200){
        const response_json = await response.json()
        localStorage.setItem('refresh',response_json.refresh)
        localStorage.setItem('access',response_json.access)
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
        localStorage.setItem('payload', jsonPayload)
    }
}