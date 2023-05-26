const FRONTEND_API = "http://127.0.0.1:5500";

export async function injectNavbar() {
    fetch(`${FRONTEND_API}/navbar.html`).then(response => {
        return response.text()
    }).then(data => {
        document.querySelector("header").innerHTML = data;
    })

    let navbarhtml = await fetch(`${FRONTEND_API}/navbar.html`)
    let data = await navbarhtml.text()
    document.querySelector("header").innerhTML = data;

    /* const payload = localStorage.getItem('payload');
    if (payload) {
        const payload_json = JSON.parse(payload)

        let login = document.getElementById('login')
        login.style.display = "none";

        let signup = document.getElementById('signup')
        signup.style.display = "none";
    } else {
        let logout_btn = document.getElementById('logout_btn')
        logout_btn.style.display = "none";
    } */
}

export async function injectFooter() {
    fetch(`${FRONTEND_API}/footer.html`).then(response => {
        return response.text()
    }).then(data => {
        document.querySelector("footer").innerHTML = data;
    })

    let navbarhtml = await fetch(`${FRONTEND_API}/footer.html`)
    let data = await navbarhtml.text()
    document.querySelector("footer").innerhTML = data;
}