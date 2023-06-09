import {navBar,sendCode,injectNavbar, injectFooter} from './protocol_api.js'

const BACKEND_API = "https://api.sw-iing.com";
const FRONTEND_API = "https://sw-iing.com";

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    EventShow();
    AlcholShow();
    BreweryShow();
    sendCode()
}

// 행사 목록 조회
async function EventShow() {  
    const response = await fetch(`${BACKEND_API}/event/`, {
        method: "GET",
    });

    const response_json = await response.json()

    const event_list = document.getElementById('event-list-text')

    response_json.forEach(e => {
        const id = e.id
        const name = e.eventname
        const region = e.region

        event_list.innerHTML += `<a href="/subpages/detail/eve_detail.html?id=${id}">[${region}] ${name}</a>`

    })
}

// 전통주 목록 조회
export async function AlcholShow(page_num) {
    let url = ''
    if (page_num == undefined) {
        url = `${BACKEND_API}/alchol/`
    } else {
        url = `${BACKEND_API}/alchol/?page=${page_num}`
    }
    const response = await fetch(url, {
        method: "GET",
    });
    const response_json = await response.json()

    const alchol_list = document.getElementById('alchol-list')

    alchol_list.innerHTML = ''

    response_json.results.forEach(e => {
        const id = e.id
        const name = e.name
        const sort = e.sort
        const beverage = e.beverage
        const image = e.image

        alchol_list.innerHTML += `<div class="card">
                                    <a href="/subpages/detail/alc_detail.html?id=${id}">
                                        <img src="${BACKEND_API}${image}">
                                        <div class="alchol-card">
                                            <span class="alchol-name">${name}</span>
                                            <span class="alchol-desc">${sort} / ${beverage}도</span>
                                        </div>
                                    </a>
                                </div>`
    })

    if (response_json.count > 4 && response_json.next != null) {
        let next_pagination = document.getElementById('pagination-btn-r')
        let next_page = response_json.next.substr(-1)
        next_pagination.onclick= () =>{
            AlcholShow(next_page)
        }

    }
    if (response_json.count > 4 && response_json.previous != null) {

        if (response_json.previous.substr(-1) != '/') {
            const pre_pagination = document.getElementById('pagination-btn-l')
            const pre_page = response_json.previous.substr(-1)
            pre_pagination.onclick = () =>{
                AlcholShow(pre_page)
            }
        } else if (response_json.previous.substr(-1) == '/') {
            const pre_pagination2 = document.getElementById('pagination-btn-l')
            pre_pagination2.onclick = () =>{
                AlcholShow()
            }
        }
    }
}

// 양조장 목록 조회
async function BreweryShow(page_num) {  
    let response = ''
    if (page_num == undefined) {
        response = await fetch(`${BACKEND_API}/brewery/`, {
            method: "GET",
        });
    } else {        
        response = await fetch(`${BACKEND_API}/brewery/?page=${page_num}`, {
            method: "GET",
        });
    }

    const response_json = await response.json()

    const brewery_list = document.getElementById('brewery-list')

    brewery_list.innerHTML = ''

    response_json['results'].forEach(e => {
        const id = e.id
        const name = e.name
        const region = e.region
        let restaurant = 'X'
        let experience = 'X'
        if (e.restaurant) {
            restaurant = 'O'
        }
        if (e.experience) {
            experience = 'O'
        }
        
        brewery_list.innerHTML += `<div class="brewery">
                                        <a href="/subpages/detail/brew_detail.html?id=${id}">
                                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lYEMFENrL7sVziTSqx3Nc4XyfifJnX2s4MtOldxUGw&s">
                                            <div class="brewery-card">
                                                <span class="brewery-name">${name}</span>
                                                <span class="brewery-region">[${region}]</span>
                                                <span class="brewery-res">식당 여부 : ${restaurant}</span>
                                                <span class="brewery-exp">체험 여부 : ${experience}</span>
                                            </div>
                                        </a>
                                    </div>`
    })

    if (response_json.count > 4 && response_json.next != null) {
        const next_pagination = document.getElementById('pagination-btn-br')
        const next_page = response_json.next.substr(-1)
        next_pagination.onclick = () => {
            BreweryShow(next_page)
        }
    }
    if (response_json.count > 4 && response_json.previous != null) {

        if (response_json.previous.substr(-1) != '/') {
            const pre_pagination = document.getElementById('pagination-btn-bl')
            const pre_page = response_json.previous.substr(-1)
            pre_pagination.onclick = () => {
                BreweryShow(pre_page)
            }

        } else if (response_json.previous.substr(-1) == '/') {
            const pre_pagination2 = document.getElementById('pagination-btn-bl')
            pre_pagination2.onclick = () => {
                BreweryShow()
            }
        }
    }
}