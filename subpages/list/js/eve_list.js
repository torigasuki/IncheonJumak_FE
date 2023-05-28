import { injectNavbar, injectFooter } from '../../../js/protocol_api.js'

const BACKEND_API = "https://api.sw-iing.com";
const FRONTEND_API = "https://sw-iing.com";

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    EventCategoryShow();
}

async function EventCategoryShow(category) {
    const response = await fetch(`${BACKEND_API}/event/`, {
        method: "GET",
    });

    let response_json = await response.json()

    const event_list = document.getElementById('event-card-list')

    response_json.forEach(e => {
        const id = e.id
        const name = e.eventname
        const region = e.region
        const start = e.started_at.substr(0, 10)
        const start_time = e.started_at.substr(11, 19).split('+')[0]
        const end = e.ended_at.substr(0, 10)
        const end_time = e.ended_at.substr(11, 19).split('+')[0]
        
        event_list.innerHTML += `<div class="event-container" onclick="EventDetailShow(${id})">
                                    <div class="event">
                                        <a href="/subpages/detail/eve_detail.html?id=${id}">
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lYEMFENrL7sVziTSqx3Nc4XyfifJnX2s4MtOldxUGw&s">
                                            </img>
                                        </a>
                                    </div>
                                    <div class="event-desc">
                                        <span class="event-name">${name}</span>
                                        <span class="event-region">[${region}]</span>
                                        <span class="event-date">행사 시작일 : ${start}</span>
                                        <span class="event-date" style="margin-bottom: 50px;">행사 시작 시간 : ${start_time}</span>
                                        <span class="event-date">행사 종료일 : ${end}</span>
                                        <span class="event-date">행사 종료 시간 : ${end_time}</span>
                                    </div>
                                </div>`
    })
}