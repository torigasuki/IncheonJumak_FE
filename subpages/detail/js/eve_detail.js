
import { injectNavbar, injectFooter } from './../../../js/protocol_api.js'

const backend_base_url = "https://api.sw-iing.com"
const frontend_base_url = "https://sw-iing.com"
const access_token = localStorage.getItem('access')

window.onload = async () => {
    await injectNavbar();
    await injectFooter();
    eventDetailInfoShow();
    document.getElementById('write_review').addEventListener('click',()=>{
        reviewupload()
    })
}

// 행사 상세내용 가져오기
async function eventDetailInfoShow(){
    const urlParams = new URL(location.href).searchParams;
    const event_id = urlParams.get('id');
    const response = await fetch(`${backend_base_url}/event/${event_id}/`, {
        method: 'GET',
    })
    const response_json = await response.json()
    if (response_json.event.image != null) {
        const imageCard = document.getElementById('image-box')
        const eventImage = document.createElement('img')
        eventImage.setAttribute('class', 'event-image')
        eventImage.setAttribute('alt', 'event-image')
        eventImage.setAttribute('src', `https://api.sw-iing.com/${response_json.event.image}`)
        imageCard.appendChild(eventImage)
    } else {
        const imageCard = document.getElementById('image-box')
        const eventImage = document.createElement('img')
        eventImage.setAttribute('alt', 'event-image')
        eventImage.setAttribute('src', "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2lYEMFENrL7sVziTSqx3Nc4XyfifJnX2s4MtOldxUGw&s")
        imageCard.appendChild(eventImage)
    }

    const newName = document.getElementById('name')
    const Name = document.createElement('p')
    Name.innerText = response_json.event.eventname
    newName.appendChild(Name)

    const newRegion = document.getElementById('region')
    const Region = document.createElement('p')
    Region.innerText = response_json.event.region
    newRegion.appendChild(Region)

    const newStart = document.getElementById('started_at')
    const start = document.createElement('p')
    start.innerText = response_json.event.started_at.split('T')[0] +' '+ response_json.event.started_at.split('T')[1].split('+')[0]
    newStart.appendChild(start)

    const newEnd = document.getElementById('ended_at')
    const end = document.createElement('p')
    end.innerText = response_json.event.ended_at.split('T')[0] +' '+ response_json.event.ended_at.split('T')[1].split('+')[0]
    newEnd.appendChild(end)

    const newAlchol = document.getElementById('region_drink')
    const alchol = document.createElement('p')
    alchol.innerText = response_json.event.alchol_name
    newAlchol.appendChild(alchol)

    const review_list = document.getElementById('review-list')
    response_json.reviews.forEach(review => {
        const content = review.content 
        const id = review.id 
        const column_JM = document.createElement('div')
        column_JM.setAttribute('class', 'column-JM')
        review_list.appendChild(column_JM)
        const typing_review = document.createElement('div')
        typing_review.setAttribute('class', 'typing-review')
        typing_review.innerText = content
        column_JM.appendChild(typing_review)
        const delete_review = document.createElement('button')
        delete_review.setAttribute('type', 'button')
        delete_review.setAttribute('class', 'btn btn-info')
        delete_review.setAttribute('id', `delete_review${id}`)
        delete_review.innerText = '리뷰 삭제'
        column_JM.appendChild(delete_review)
        document.getElementById(`delete_review${id}`).addEventListener('click',()=>{
            deleteReview(id)
        })
    })
}

// 리뷰 등록
async function reviewupload() {
    const review = document.getElementById('review').value
    var data = {
        "content": review
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const urlParams = new URL(location.href).searchParams;
    const event_id = urlParams.get('id');

    fetch(`http://127.0.0.1:8000/review/event/${event_id}/`, requestOptions)
        .then(response => {
            if (response.ok) {
                alert("리뷰가 성공적으로 전송되었습니다.");
            } else {
                alert("리뷰 전송에 실패했습니다.");
            }
        })
        .catch(error => {
            alert("오류 발생:", error);
        });
        location.reload()
    }


async function deleteReview(review_id){
    const response = await fetch(`${backend_base_url}/review/eventreview/${review_id}`, {
        method : 'DELETE',
        headers : {
        'Authorization': 'Bearer ' + localStorage.getItem("access"),
        }
    })
    location.reload()
    }