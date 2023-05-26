import { injectNavbar, injectFooter } from '../../../js/navbar.js'
import { AlcholShow } from '../../../js/index.js' 

const BACKEND_API = "https://api.sw-iing.com";
const FRONTEND_API = "https://sw-iing.com";

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    await AlcholShow();
    AlcholCategoryShow();
}

const all = document.getElementById('all-alchol')
const soju = document.getElementById('soju-alchol')
const rice = document.getElementById('rice-alchol')
const cheong = document.getElementById('cheong-alchol')
const wine = document.getElementById('wine-alchol')
const spirit = document.getElementById('spirit-alchol')

all.onclick = () => {
    AlcholCategoryShow()
}
soju.onclick = () => {
    AlcholCategoryShow('소주')
}
rice.onclick = () => {
    AlcholCategoryShow('탁주')
}
cheong.onclick = () => {
    AlcholCategoryShow('청주')
}
wine.onclick = () => {
    AlcholCategoryShow('과실주')
}
spirit.onclick = () => {
    AlcholCategoryShow('증류주')
}

async function AlcholCategoryShow(category_name) {
    let url = ''
    if (category_name == undefined) {
        url = `${BACKEND_API}/alchol/`
    } else {
        url = `${BACKEND_API}/alchol/category/${category_name}/`
    }
    const response = await fetch(url, {
        method: "GET",
    });

    let response_json = await response.json()

    if (category_name == undefined) {
        response_json = response_json['results']
    }

    const alchol_category_list = document.getElementById('alchol-category-list')

    alchol_category_list.innerHTML = ''

    response_json.forEach(e => {
        const id = e.id
        const name = e.name
        const beverage = e.beverage
        const image = e.image
        const taste = e.taste

        alchol_category_list.innerHTML += `<div class="card" onclick="AlcholDetailShow(${id})">
                                    <img src="${BACKEND_API}${image}">
                                    <div class="alchol-card">
                                        <span class="alchol-name">${name}</span>
                                        <span class="alchol-desc">${beverage}도</span>
                                        <span class="alchol-desc">#${taste}</span>
                                    </div>
                                </div>`
    })
}