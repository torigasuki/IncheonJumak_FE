const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDA0MTA2LCJpYXQiOjE2ODUwMDQxMDYsImp0aSI6IjhjZDQ1ZjJiZjk3MzQ4NDhhMDA5NGU1MTg3YjNhMGUxIiwidXNlcl9pZCI6MTMsImVtYWlsIjoidGVzdDVAdGVzdC5jb20iLCJuaWNrbmFtZSI6InRlc3QzNSJ9.42rLq6yFa8RjmvbPWtkb3W0U0axRDFzp4SFCUtmzhnw"
import { injectNavbar, injectFooter } from '../../../js/navbar.js'


window.onload = async () => {
    await injectNavbar();
    await injectFooter();

    await getProfile();
}




async function getProfile() {

    const response_json = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'GET',
        headers: {
            // 토큰넣기! 토큰값을 저장해두고 보내주기
            Authorization : `Bearer ${access_token}`
        } 
    }
    ).then(response => {return response.json()}).then(async data => {

        console.log(data)
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        const introduction = document.getElementById('introduction')
        const profile_image = document.getElementById('profile_image')
        
        email.innerText = data.user['email']
        nickname.innerText = data.user['nickname']
        introduction.innerText = data.user['introduction']
        profile_image.src = `${backend_base_url}` + response_json['profile_image']

    })
}


function preview(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById("profile_image").src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        document.getElementById("profile_image").src = "";
    }
}


async function handleEdit() {
    const response = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'POST',
        headers: {
            Authorization : `Bearer ${access_token}`
        } 
    })
    response_json = await response.json()

    const email = response_json['email']
    const password = response_json['password']
    const nickname = document.getElementById('nickname').value;
    const introduction = document.getElementById('introduction').value;
    const profile_image = document.getElementById('profile_image').src;


    const response_edit = await fetch(`${backend_base_url}/api/user/profile/`, {
        headers: {
            'Authorization':  `Bearer ${access_token}`,
            'content-type': 'application/json',
        },
        method: 'PUT',
        body: JSON.stringify({
            "email": email,
            "password": password,
            "nickname": nickname,
            "introduction": introduction,
            "profile_image": profile_image
        })
    })
    console.log(response_edit)
    location.href = 'profile.html'

}