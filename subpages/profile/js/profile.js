const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjg4MDA0MTA2LCJpYXQiOjE2ODUwMDQxMDYsImp0aSI6IjhjZDQ1ZjJiZjk3MzQ4NDhhMDA5NGU1MTg3YjNhMGUxIiwidXNlcl9pZCI6MTMsImVtYWlsIjoidGVzdDVAdGVzdC5jb20iLCJuaWNrbmFtZSI6InRlc3QzNSJ9.42rLq6yFa8RjmvbPWtkb3W0U0axRDFzp4SFCUtmzhnw"

console.log('로딩 완료')

window.onload = async () =>  {

    getProfile();

}


async function getProfile() {
    const response_json = await fetch(`${backend_base_url}/api/user/profile/`, {
        method: 'GET',
        headers: {
            // 토큰넣기! 토큰값을 저장해두고 보내주기
            Authorization : `Bearer ${access_token}`
        } 
    }
    ).then(response => {return response.json()}).then(data => {
        //user, profile 정보 가져오기    
        console.log(data)
        console.log(data.user.email)
        
        const profile_image = document.getElementById('profile_image')
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        const introduction = document.getElementById('introduction')

        email.innerText = data.user['email']
        nickname.innerText = data.user['nickname']
        
        introduction.innerText = data.profile['introduction']
        // if (data.profile.introduction === null) {
        //     message = '아직 소개 글이 없습니다'
        //     introduction.innerText = message['introduction']
        // } else {
        //     introduction.innerText = data.profile['introduction']
        // }

        if (data.profile.profile_image === null) {
            profile_image.setAttribute("src", `/images/user_default_image.png`)
        } else {
            profile_image.setAttribute("src", `${backend_base_url}` + data.profile['profile_image'])
        }
        
        
        console.log(data.user.bookmark);
        // [{id: 1, name: 'ㅁㅁㅁ술', sort: '탁주', beverage: 10, taste: '깔끔한' ...}]

        response_alchol = data.user.bookmark
        response_alchol.forEach(e => {
        const bookmark = document.getElementById('bookmark')
        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body cols")
        bookmark.appendChild(newCardBody)
        newCardBody.setAttribute('style', 'float:left; background-color: white; padding: 5px; border-radius:5px;')
        // alchol 페이지로 이동
        // newCardBody.setAttribute('onclick','location.href=`${frontend_base_url}/alcholdetail.html?id=${alchol_id}`')
    
        if (e.image === null){
            const newBookmarkImage = document.createElement('img')
            newBookmarkImage.setAttribute('class', 'bookmark_image')
            newBookmarkImage.setAttribute("src", "/images/drink_default_image.png")
            newBookmarkImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
            newCardBody.appendChild(newBookmarkImage)
        } else {
            const newBookmarkImage = document.createElement('img')
            newBookmarkImage.setAttribute('class', 'bookmark_image')
            newBookmarkImage.setAttribute("src", `${backend_base_url}` + '/' + `${e.image['image']}`)
            newBookmarkImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
            newCardBody.appendChild(newBookmarkImage)
        }
        const newBookmark = document.createElement('a')
        newBookmark.setAttribute('class', 'name')
        newBookmark.setAttribute('style', 'margin-right:20px;')
        newBookmark.innerText = e['name']
        newCardBody.appendChild(newBookmark)
    
        const newTaste = document.createElement('a')
        newTaste.setAttribute('class', 'taste')
        newTaste.innerText = e['taste']
        newCardBody.appendChild(newTaste)

        const newSort = document.createElement('a')
        newSort.setAttribute('class', 'sort')
        newSort.setAttribute('style', 'margin-right : 10px;')
        newSort.innerText = e['sort']
        newCardBody.appendChild(newSort)
        })

        //나를 팔로잉한 유저
        console.log(data.user.following);
        response_following = data.user.following
        response_following.forEach(element => {
            const following = document.getElementById('following')
            const followingUser = document.createElement('a')
            followingUser.setAttribute('class', 'user_nickname')
            followingUser.setAttribute('style', 'margin-right:20px;')
            followingUser.setAttribute('onclick', 'location.href=`${frontend_base_url}/profile_shown.html?id=${element.id}`')
            followingUser.innerText = element['nickname']
            following.appendChild(followingUser)
        })

        //내가 팔로우 한 유저
        console.log(data.user.follower);
        response_follower = data.user.follower
        response_follower.forEach(element => {
            const follower = document.getElementById('follower')
            const followerUser = document.createElement('a')
            followerUser.setAttribute('class', 'user_nickname')
            followerUser.setAttribute('style', 'margin-right:20px;')
            followerUser.setAttribute('onclick', 'location.href=`${frontend_base_url}/profile_shown.html?id=${element.id}`')
            followerUser.innerText = element['nickname']
            follower.appendChild(followerUser)
        })

        //review 가져오기
        user_id = data.user.id
        getReview(user_id);

    })
}

async function getReview(user_id){
    const response_reviews = await fetch(`${backend_base_url}/review/${user_id}/reviews/`, {
            method: 'GET'
        })
    response_reviews_json = await response_reviews.json()

    console.log(response_reviews_json)
    // 0: {pk: 3, title: '하이하이', image: null, updated_at: '2023-05-25T18:03:32.392067+09:00', user: 'test5@test.com'}
    
    if (response_reviews_json === null) {
        const reviews = document.getElementById('reviews')
        const reviewTitle = document.createElement('pre')
        reviewTitle.setAttribute("pre", 'message')
        reviews.appendChild(reviewTitle)
    } else {
        response_reviews_json.forEach(e => {

            const reviews = document.getElementById('reviews')
            const newCardBody = document.createElement("div")
            newCardBody.setAttribute("class", "card-body")
            newCardBody.setAttribute('style', 'background-color: rgb(245, 245, 245); width: 150px; height: 20px;')
            reviews.appendChild(newCardBody)
            
            if (e.image ===null){ 
            const reviewImage = document.createElement('img')
            reviewImage.setAttribute('class', 'review_title')
            reviewImage.setAttribute("src", "/images/drink_default_image.png")
            reviewImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
            newCardBody.appendChild(reviewImage)
            } else {
                const reviewImage = document.createElement('img')
                reviewImage.setAttribute('class', 'review_title')
                reviewImage.setAttribute("src", `${backend_base_url}` + '/' + `${e.image['image']}`)
                reviewImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
                newCardBody.appendChild(reviewImage)
            }

            const reviewTitle = document.createElement('a')
            reviewTitle.setAttribute('class', 'review_title')
            reviewTitle.innerText = e['title']
            newCardBody.appendChild(reviewTitle)
            
            const reviewUpdatedAt = document.createElement('a')
            reviewUpdatedAt.setAttribute('class', 'review_title')
            const newYearMonthDate = new Date(e['updated_at']);
            const year = newYearMonthDate.getFullYear();
            const month = newYearMonthDate.getMonth() + 1;
            const date = newYearMonthDate.getDate();
            reviewUpdatedAt.innerText = (`${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`)
            newCardBody.appendChild(reviewUpdatedAt)

        })
    }
}