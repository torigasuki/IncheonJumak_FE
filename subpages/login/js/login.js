import { socialLogin,userLogin } from '/js/protocol_api.js';


window.onload = async () => {
    const kakao = document.getElementById('kakao');
    const naver = document.getElementById('naver');
    const google = document.getElementById('google');
    const login = document.getElementById('login');
    

    kakao.addEventListener('click', () => {
        socialLogin('kakao')
    })

    naver.addEventListener('click', () => {
        socialLogin('naver')
    })

    google.addEventListener('click', () => {
        socialLogin('google')
    })

    login.addEventListener('click', (e) => {
        e.preventDefault();
        userLogin()
    })
}
