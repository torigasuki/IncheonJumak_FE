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
    var oauth2Endpoint = 'https://accounts.google.com/o/oauth2/v2/auth';

    var form = document.createElement('form');
    form.setAttribute('method', 'GET'); 
    form.setAttribute('action', oauth2Endpoint);
    var params = {
        'client_id': key,
        'redirect_uri': redirecturi,
        'response_type': 'token',
        'scope': 'openid email profile',
        'include_granted_scopes': 'true',
        'state': 'pass-through value',
        'prompt': 'consent'
    };

    for (var p in params) {
        var input = document.createElement('input');
        input.setAttribute('type', 'hidden');
        input.setAttribute('name', p);
        input.setAttribute('value', params[p]);
        form.appendChild(input);
    }

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
    if (response.status == 200) {
        const response_json = await response.json()
        localStorage.setItem('refresh', response_json.refresh)
        localStorage.setItem('access', response_json.access)
        const base64Url = response_json.access.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''))
        localStorage.setItem('payload', jsonPayload)
    }
}

export async function sendCode() {
    var currentUrl = window.location.href
    var urlWithoutQuery = currentUrl.split('?')[0]
    let social = null
    let code = new URLSearchParams(window.location.search).get('code')
    let state = null
    if (code) {
        state = new URLSearchParams(window.location.search).get('state')
        if (state) {
            social = 'naver'
        }
        else {
            social = 'kakao'
        }
    }
    else {
        social = 'google'
        urlWithoutQuery = currentUrl.split('#')[0]
        code = new URLSearchParams(location.href).get('access_token')
    }
    if (code) {
        const url = `${BACKEND_URL}/api/user/${social}/`
        let body ={code,}
        if(state){
            body.state = state
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: contentjson,
            body: JSON.stringify(body)
        })
        if (response.status == 200) {
            const response_json = await response.json()
            localStorage.setItem('refresh', response_json.refresh)
            localStorage.setItem('access', response_json.access)
            const base64Url = response_json.access.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''))
            localStorage.setItem('payload', jsonPayload)
            window.location.href = urlWithoutQuery
        }
    }
}
export async function sendMail(){
    const form = document.getElementById('signup_form')
    const url = `${BACKEND_URL}/api/user/email/`
    const response = await fetch(url, {
        method: 'POST',
        headers: contentjson,
        body: JSON.stringify({
            'email': form.email.value,
        })
    })
    if (response.status == 200) {
        countdown()
    }
}

function countdown() {
    const timer = document.getElementById('verify_count')
    timer.style.display = 'inline'
    var count = 10
  
    var interval = setInterval(function() {
        var minutes = Math.floor(count / 60); 
        var seconds = count % 60;
    
        timer.innerText = minutes + ': ' + seconds;
    
  
      count--; // 1초 감소
  
      if (count < 0) {
        clearInterval(interval); // 카운트다운 종료
        console.log("Countdown Complete!"); // 종료 메시지 출력
      }
    }, 1000); // 1초마다 실행
  }
  



export async function codeCheck(){
    const form = document.getElementById('signup_form')
    const url = `${BACKEND_URL}/api/user/verify/`
    const response = await fetch(url, {
        method: 'POST',
        headers: contentjson,
        body: JSON.stringify({
            'email': form.email.value,
            'code': form.code.value
        })
    })
    response.status == 200 ? alert('인증에 성공했습니다') : alert('인증에 실패했습니다')
}

export async function signUp() {
    const form = document.getElementById('signup_form')
    const url = `${BACKEND_URL}/api/user/`
    if (form.password.value != form.password2.value) {
        alert('비밀번호가 일치하지 않습니다')
        return
    }
    else{
        const response = await fetch(url, {
            method: 'POST',
            headers: contentjson,
            body: JSON.stringify({
                'email': form.email.value,
                'password': form.password.value,
                'nickname': form.nickname.value,
            })
        })
        response.status == 201 ? window.location.href = '/subpages/login/login.html' : alert('회원가입에 실패했습니다')
    }
}

export async function logOut() {
    localStorage.removeItem('refresh')
    localStorage.removeItem('access')
    localStorage.removeItem('payload')
}