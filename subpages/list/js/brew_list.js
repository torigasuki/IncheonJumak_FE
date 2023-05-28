import { injectNavbar, injectFooter } from '../../../js/protocol_api.js'

const BACKEND_API = "https://api.sw-iing.com";
const FRONTEND_API = "https://sw-iing.com";

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    BreweryCategoryShow();
}

const all = document.getElementById('all-brewery')
const restaurant = document.getElementById('brewery-restaurant')
const experience = document.getElementById('brewery-experience')

all.onclick = () => {
    BreweryCategoryShow()
}
restaurant.onclick = () => {
    BreweryCategoryShow(restaurant)
}
experience.onclick = () => {
    BreweryCategoryShow(experience)
}

async function BreweryCategoryShow(category) {
    const response = await fetch(`${BACKEND_API}/brewery/`, {
        method: "GET",
    });

    let response_json = await response.json()
    response_json = response_json['results']

    if (category != undefined) {
        if (category.innerText == '식당 유무') {
            response_json = response_json.filter(value => value.restaurant === true)
        }
        if (category.innerText == '체험 유무') {
            response_json = response_json.filter(value => value.experience === true)
        }
    }

    const brewery_category_list = document.getElementById('brewery-category-list')

    brewery_category_list.innerHTML = ''

    response_json.forEach(e => {
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
        
        brewery_category_list.innerHTML += `<div class="brewery">
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
}