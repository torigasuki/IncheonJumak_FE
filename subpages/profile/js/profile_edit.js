const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDA0MTA2LCJpYXQiOjE2ODUwMDQxMDYsImp0aSI6IjhjZDQ1ZjJiZjk3MzQ4NDhhMDA5NGU1MTg3YjNhMGUxIiwidXNlcl9pZCI6MTMsImVtYWlsIjoidGVzdDVAdGVzdC5jb20iLCJuaWNrbmFtZSI6InRlc3QzNSJ9.42rLq6yFa8RjmvbPWtkb3W0U0axRDFzp4SFCUtmzhnw"


window.onload = async function getProfile() {
    const response_json = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'GET',
        headers: {
            // 토큰넣기! 토큰값을 저장해두고 보내주기
            Authorization : `Bearer ${access_token}`
        } 
    }
    ).then(response => {return response.json()}).then(async data => {

        console.log(data)


    })
}




async function handleEdit() {
    user = localStorage.getItem("payload")
    user_id = user.slice(-2)[0]

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


    const response_edit = await fetch('http://127.0.0.1:8000/users/profile/' + user_id + '/', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem("access"),
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