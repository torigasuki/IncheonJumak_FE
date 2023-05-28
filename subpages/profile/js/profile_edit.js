import { injectNavbar, injectFooter } from '../../../js/protocol_api.js'

const backend_base_url = "https://api.sw-iing.com"
const frontend_base_url = "https://sw-iing.com"
const access_token = localStorage.getItem('access')

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    getProfile();
    document.getElementById('profileedit').addEventListener('click', handleEdit)
}

async function getProfile() {
    const response_json = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'GET',
        headers: {
            Authorization : `Bearer ${access_token}`
        } 
    }
    ).then(response => {return response.json()}).then(async data => {
        console.log(data)
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        email.innerText = data.user.email
        nickname.innerText = data.user.nickname

        const introduction = document.getElementById('introduction')      
        if (data.profile.introduction == undefined) {
            introduction.innerText = ""
        } else {
            introduction.innerText = data.profile.introduction
        }

        const profile_image = document.getElementById('profile_image')        
        profile_image.src = `${backend_base_url}` + data.profile.profileimage
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
    const introduction = document.getElementById('introduction').value;
    let image = document.querySelector('#profileimage');
    let profile_image = image.files[0]; 
    let formData = new FormData()
    if (profile_image) {
        formData.append('profileimage', profile_image)
    }
    formData.append('introduction', introduction)
    const response_edit = await fetch(`${backend_base_url}/api/user/profile/`, {
        headers: {
            'Authorization':  `Bearer ${access_token}`,
        },
        method: 'PUT',
        body: formData
    })
    
    location.href = 'profile.html'

}