const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDA0MTA2LCJpYXQiOjE2ODUwMDQxMDYsImp0aSI6IjhjZDQ1ZjJiZjk3MzQ4NDhhMDA5NGU1MTg3YjNhMGUxIiwidXNlcl9pZCI6MTMsImVtYWlsIjoidGVzdDVAdGVzdC5jb20iLCJuaWNrbmFtZSI6InRlc3QzNSJ9.42rLq6yFa8RjmvbPWtkb3W0U0axRDFzp4SFCUtmzhnw"

console.log('로딩 완료')

window.onload = async function getProfile() {
    const response_json = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'GET',
        headers: {
            // 토큰넣기! 토큰값을 저장해두고 보내주기
            Authorization : `Bearer ${access_token}`
        } 
    }
    ).then(response => {return response.json()}).then(async data => {
        //user, profile 정보 가져오기    
        console.log(data)
        console.log(data.user.email)
        
        const profile_image = document.getElementById('profile_image')
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        const introduction = document.getElementById('introduction')

        email.innerText = data.user['email']
        nickname.innerText = data.user['nickname']
        
        introduction.innerText = data.profile['introduction']
        // if (data.profile.introduction === null) {
        //     message = '아직 소개 글이 없습니다'
        //     sendText.innerText = message['introduction']
        // } else {
        //     introduction.innerText = data.profile['introduction']
        // }

        if (data.profile.profile_image === null) {
            profile_image.setAttribute("src", "/images/user_default_image.jpeg")
        } else {
            profile_image.setAttribute("src", `${backend_base_url}` + data.profile['profile_image'])
        }

        // data.user.id = 4
        // data.profile.profileimage = null
        // data.user.email = bear9473@gmail.com
        // data.user.nickname = 단아
        // data.profile.introduction = null
        
        const following_user_list = data.user.following
        console.log(data.user.bookmark)


    })
}




// async function getFollowings(user_id_list) {
//     user_id_list.forEach(user_id => {
//         const response_json = await fetch(`${backend_base_url}//${user_id}`, {
//             method: 'GET',
//             headers: {
//                 Authorization : `Bearer ${access_token}`
//             },
//         })
//     })

// }
