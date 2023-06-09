import { injectNavbar, injectFooter } from './../../../js/protocol_api.js'

const backend_base_url = "https://api.sw-iing.com"
const frontend_base_url = "https://sw-iing.com"
const access_token = localStorage.getItem('access')

window.onload = async () => {
  await injectNavbar();
  await injectFooter();
  breweryDetailInfoShow();
  document.getElementById('write_review').addEventListener('click',()=>{
    reviewupload()
  })
}

// 양조장 상세내용 가져오기
async function breweryDetailInfoShow(){
  const urlParams = new URL(location.href).searchParams;
  const brewery_id = urlParams.get('id');
  const response = await fetch(`${backend_base_url}/brewery/${brewery_id}/`, {
    method: 'GET',
  })
  const response_json = await response.json()

  if (response_json.brewery.image != null) {
    const imageCard = document.getElementById('image-box')
    const breweryImage = document.createElement('img')
    breweryImage.setAttribute('class', 'brewery-image')
    breweryImage.setAttribute('src', `https://api.sw-iing.com/${response_json.brewery.image}`)
    imageCard.appendChild(breweryImage)
  } else {
    const imageCard = document.getElementById('image-box')
    const breweryImage = document.createElement('img')
    breweryImage.setAttribute('alt', 'event-image')
    breweryImage.setAttribute('src', "./img/la_brewery.webp")
    imageCard.appendChild(breweryImage)
}

  const newName = document.getElementById('name')
  const Name = document.createElement('p')
  Name.innerText = response_json.brewery.name
  newName.appendChild(Name)

  const newRegion = document.getElementById('region')
  const Region = document.createElement('p')
  Region.innerText = response_json.brewery.region
  newRegion.appendChild(Region)

  const newRestaurant = document.getElementById('restaurant')
  const Restaurant = document.createElement('p')
  if (response_json.brewery.restaurant) {
    Restaurant.innerText = 'O'
  } else {
    Restaurant.innerText = 'X'
  }
  newRestaurant.appendChild(Restaurant)
  if (response_json.brewery.restaurant) {
  const Restaurant_hour = document.createElement('p')
  Restaurant_hour.innerText = response_json.brewery.business_hour.substr(0, 8)
  newRestaurant.appendChild(Restaurant_hour)
  } else {}

  const newExperience = document.getElementById('experience')
  const Experience = document.createElement('p')
  if (response_json.brewery.experience) {
    Experience.innerText = 'O'
  } else {
    Experience.innerText = 'X'
  }
  newExperience.appendChild(Experience)
  if (response_json.brewery.experience) {
    const Experience_hour = document.createElement('p')
    Experience_hour.innerText = response_json.brewery.experience_hour.substr(0, 8)
    newExperience.appendChild(Experience_hour)
  } else {}

  const newAlcholName = document.getElementById('alchol')
  const alcholName = document.createElement('p')
  alcholName.innerText = response_json.brewery.alchol_name
  newAlcholName.appendChild(alcholName)

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
  const brewery_id = urlParams.get('id');

  fetch(`${backend_base_url}/review/brewery/${brewery_id}/`, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("리뷰가 성공적으로 작성되었습니다.");
      } else {
        alert("리뷰 작성에 실패했습니다.");
      }
    })
    .catch(error => {
      alert("오류 발생:", error);
    });
    location.reload()
}

async function deleteReview(review_id){
  const response = await fetch(`${backend_base_url}/review/breweryreview/${review_id}`, {
      method : 'DELETE',
      headers : {
      'Authorization': 'Bearer ' + localStorage.getItem("access"),
      }
  })
  location.reload()
  }