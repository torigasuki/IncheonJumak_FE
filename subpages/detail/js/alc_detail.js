import { injectNavbar, injectFooter } from './../../../js/navbar.js'
import { AlcholShow } from '/js/index.js' 

window.onload = async () => {
  await injectNavbar();
  await injectFooter();
  await AlcholShow();
  document.getElementById('write_review').addEventListener('click',()=>{
    console.log('test')
    reviewupload()
  });
}

// 뒤로 가기
function backmoving(){
    window.location.href = "eventdetail.html";
}


// //
// /* 
// <div class="main-box">
// 댓글란 | <span id="comments_count"></span>개의 댓글
// <div>
//     <div id="feed_comments"></div>
//     <input type="text" id="comment-text" placeholder="댓글을 입력하세요.">
//     <button type="button" onclick="inputComment()">댓글 작성</button>
// </div>
// <ul id="comment-list"></ul>
// </div> 
// */

// //참고
// async function inputComment() {
//   const urlFeed = new URL(location.href).searchParams;
//   const feedId = urlFeed.get('id')

//   const comment_text = document.getElementById('comment-text').value
//   const response_input = await fetch(`${backend_base_url}/comments/${feedId}/`, {
//       headers: {
//           'Authorization': 'Bearer ' + localStorage.getItem("access"),
//           'content-type': 'application/json',
//       },
//       method: "POST",
//       body: JSON.stringify({
//           "text": comment_text,
//       })
//   })
//   location.reload()
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
        'Authorization': 'Bearer ' + localStorage.getItem("access"),
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    // fetch를 사용하여 요청 보내기
    fetch('http://127.0.0.1:8000/review/alcohol/', requestOptions)
      .then(response => {
        if (response.ok) {
          console.log("리뷰가 성공적으로 전송되었습니다.");
        } else {
          console.error("리뷰 전송에 실패했습니다.");
        }
      })
      .catch(error => {
        console.error("오류 발생:", error);
      });
  }
  
  
async function putreview(){

  
}

/* <button type="button" class="btn btn-info" onclick="putreview">리뷰 수정/삭제</button> */
