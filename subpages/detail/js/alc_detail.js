console.log('로딩 완료')

async function backmoving() {
    window.location.href = "메인페이지";
  }


async function reviewupload(userId, review) {
    // 요청할 데이터 생성
    var data = {
      user_id: userId,
      review: review
    };
  
    // POST 요청 설정
    var requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    // fetch를 사용하여 요청 보내기
    fetch('http://127.0.0.1:8000/users/signup/', requestOptions)
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