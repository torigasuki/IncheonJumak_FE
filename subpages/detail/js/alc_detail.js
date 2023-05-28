import { injectNavbar, injectFooter } from './../../../js/protocol_api.js'

const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
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
  console.log(response_json)
  
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
      console.log(id)
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
  console.log(alchol_id)
  const response = await fetch(`${backend_base_url}/api/user/${alchol_id}/bookmark/`, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${access_token}`,
    }
  })
  const response_json = await response.json()
  console.log(response_json)
  
  $(document).ready(function() {
    $('#bookmarkButton').on('click', function () {
      var $btn = $(this).button('complete');
    });
  });
}


// 뒤로 가기
// function backmoving(){
//     window.location.href = "eventdetail.html";
// }

// 리뷰 등록
async function reviewupload() {
  // 요청할 데이터 생성
  const review = document.getElementById('review').value
  var data = {
    "content": review
  };

  // POST 요청 설정
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

  // fetch를 사용하여 요청 보내기
  fetch(`http://127.0.0.1:8000/review/alcohol/${alchol_id}/`, requestOptions)
    .then(response => {
      console.log(response)
      if (response.ok) {
        console.log("리뷰가 성공적으로 전송되었습니다.");
      } else {
        console.error("리뷰 전송에 실패했습니다.");
      }
    })
    .catch(error => {
      console.error("오류 발생:", error);
    });
    location.reload()
}
  
  
// update 기능 삭제
// async function putReview(){
//   const content = document.getElementById('review').value;

//   const response = await fetch(`${backend_base_url}/review/alcohol/${review_id}/`, {
//     headers: {
//         'Authorization': `Bearer ${access_token}`,
//         'content-type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(
//       {
//         'content':content
//       }
//     )
//   })
// }


async function deleteReview(review_id){
  const response = await fetch(`${backend_base_url}/review/alcoholreview/${review_id}`, {
    method : 'DELETE',
    headers : {
      'Authorization': 'Bearer ' + localStorage.getItem("access"),
    }
  })
  console.log(response)
  location.reload()
}