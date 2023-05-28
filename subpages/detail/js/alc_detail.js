import { injectNavbar, injectFooter } from './../../../js/protocol_api.js'

const backend_base_url = "https://api.sw-iing.com"
const frontend_base_url = "https://sw-iing.com"
const access_token = localStorage.getItem('access')

window.onload = async () => {
  await injectNavbar();
  await injectFooter();
  AlcholDetailInfoShow();
  document.getElementById('write_review').addEventListener('click',()=>{
    reviewupload()
  });
}

// 술 상세내용 가져오기
async function AlcholDetailInfoShow() {
  const urlParams = new URL(location.href).searchParams;
  const alchol_id = urlParams.get('id');
  const response = await fetch(`${backend_base_url}/alchol/${alchol_id}/`, {
    method: 'GET',
  })
  const response_json = await response.json()
  
  const imageCard = document.getElementById('image-box')
  const alcholImage = document.createElement('img')
  alcholImage.setAttribute('src', `https://api.sw-iing.com/${response_json.alchol.image}`)
  imageCard.appendChild(alcholImage)

  const newName = document.getElementById('name')
  const Name = document.createElement('p')
  Name.innerText = response_json.alchol.name
  newName.appendChild(Name)

  const newBeverage = document.getElementById('beverage')
  const Beverage = document.createElement('p')
  Beverage.innerText = response_json.alchol.beverage
  newBeverage.appendChild(Beverage)

  const newSort = document.getElementById('sort')
  const Sort = document.createElement('p')
  Sort.innerText = response_json.alchol.sort
  newSort.appendChild(Sort)
  
  const newTaste = document.getElementById('taste')
  const Taste = document.createElement('p')
  Taste.innerText = response_json.alchol.taste
  newTaste.appendChild(Taste)
  
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
  
  const bookmarkButton = document.getElementById('bookmarkButton')
  bookmarkButton.setAttribute('onclick', "AlcholBookmark()")
}

//북마크 기능
async function AlcholBookmark() {
  const urlParams = new URL(location.href).searchParams;
  const alchol_id = urlParams.get('id');
  const response = await fetch(`${backend_base_url}/api/user/${alchol_id}/bookmark/`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${access_token}`,
    }
  })
  const response_json = await response.json()
  
  $(document).ready(function() {
    $('#bookmarkButton').on('click', function () {
      var $btn = $(this).button('complete');
    });
  });
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
  const alchol_id = urlParams.get('id');

  fetch(`${backend_base_url}/review/alcohol/${alchol_id}/`, requestOptions)
    .then(response => {
      if (response.ok) {
        alert("리뷰가 성공적으로 전송되었습니다.");
      } else {
        alert("리뷰 전송에 실패했습니다.");
      }
    })
    .catch(error => {
      alert("오류 발생", error);
    });
    location.reload()
}
  
  
// update 기능 삭제
// async function putReview(){
//   const content = document.getElementById('review').value;

async function deleteReview(review_id){
  const response = await fetch(`${backend_base_url}/review/alcoholreview/${review_id}`, {
    method : 'DELETE',
    headers : {
      'Authorization': 'Bearer ' + localStorage.getItem("access"),
    }
  })
  location.reload()
}