import { sendMail,codeCheck,signUp } from '/js/protocol_api.js';


window.onload = async () => {
    const sendmail = document.getElementById('send_mail')
    const signup = document.getElementById('signup');
    const code_check = document.getElementById('code_check');
    sendmail.addEventListener('click', (e) => {
        e.preventDefault();
        sendMail();
    })
    code_check.addEventListener('click', (e) => {
        e.preventDefault();
        codeCheck();
    })
    signup.addEventListener('click', (e) => {
        e.preventDefault();
        signUp();
    })
}

