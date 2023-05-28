import { injectNavbar, injectFooter } from '../../../js/protocol_api.js'

const backend_base_url = "http://127.0.0.1:8000"
const frontend_base_url = "http://127.0.0.1:5500"
const access_token = localStorage.getItem('access')

window.onload = async () =>  {
    await injectNavbar();
    await injectFooter();
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

        console.log(data)
        
        const profile_image = document.getElementById('profile_image')
        const email = document.getElementById('email')
        const nickname = document.getElementById('nickname')
        const introduction = document.getElementById('introduction')

        email.innerText = data.user['email']
        nickname.innerText = data.user['nickname']
        
        if (data.profile.introduction == null) {
            introduction.innerText = '자기소개가 없습니다.'
        } else {
            introduction.innerText = data.profile['introduction']
        }

        if (data.profile.profileimage == null) {
            profile_image.setAttribute("src", `./images/profiledefault.png`)
        } else {
            profile_image.setAttribute("src", `${backend_base_url}` + data.profile.profileimage)
        }
        
        if (data.user.bookmark.length == 0) {
            const bookmark = document.getElementById('bookmark')
            const newCardBody = document.createElement("p")
            newCardBody.innerText = '북마크한 술이 없습니다.'
            bookmark.appendChild(newCardBody)
        }
        else{
            response_alchol = data.user.bookmark
            response_alchol.forEach(e => {
                const bookmark = document.getElementById('bookmark')
                const newCardBody = document.createElement("div")
                newCardBody.setAttribute("class", "card-body cols")
                bookmark.appendChild(newCardBody)
                newCardBody.setAttribute('style', 'float:left; background-color: white; padding: 5px; border-radius:5px;')
                // alchol 페이지로 이동
                // newCardBody.setAttribute('onclick','location.href=`${frontend_base_url}/alcholdetail.html?id=${alchol_id}`')
                
                if (e.image == null){
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
        }

        //나를 팔로잉한 유저
        if (data.user.following.length == 0) {
            const following = document.getElementById('following')
            const no_following = document.createElement('p')
            no_following.innerText = '팔로잉한 유저가 없습니다.'
            following.appendChild(no_following)
        }else{
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
        }

        //내가 팔로우 한 유저
        if (data.user.follower.length == 0){
            const follower = document.getElementById('follower')
            const no_follower = document.createElement('p')
            no_follower.innerText = '팔로워가 없습니다.'
            follower.appendChild(no_follower)

        }
        else{
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
        }

        //review 가져오기
        const user_id = data.user.id
        getReview(user_id);
    })
}

async function getReview(user_id){
    const response_reviews = await fetch(`${backend_base_url}/review/${user_id}/reviews/`, {
            headers:{
                'Authorization': `Bearer ${access_token}`
            },
            method: 'GET'
        })
    const response_reviews_json = await response_reviews.json()

    console.log(response_reviews_json)
    // reviews
    //  {id: 1, content: '21312321', updated_at: '2023-05-27T22:31:20.401934+09:00', table: 'alcohol', user: 20}
    //  {id: 2, content: 'rrrrrr', updated_at: '2023-05-27T22:31:27.150968+09:00', table: 'alcohol', user: 20}

    if (response_reviews_json === null) {
        const reviews = document.getElementById('reviews')
        const reviewTitle = document.createElement('pre')
        reviewTitle.setAttribute("pre", 'message')
        reviews.appendChild(reviewTitle)
    } else {
        response_reviews_json.reviews.forEach(e => {
            const reviews = document.getElementById('reviews')
            const newCardBody = document.createElement("div")
            newCardBody.setAttribute("class", "card-body")
            newCardBody.setAttribute('style', 'background-color: rgb(245, 245, 245); width: 100%; height: 30px;')
            reviews.appendChild(newCardBody)
            
            // if (e.profileimage ==null){ 
            // const reviewImage = document.createElement('img')
            // reviewImage.setAttribute('class', 'review_title')
            // reviewImage.setAttribute("src", "/images/drink_default_image.png")
            // reviewImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
            // newCardBody.appendChild(reviewImage)
            // } else {
            //     const reviewImage = document.createElement('img')
            //     reviewImage.setAttribute('class', 'review_title')
            //     reviewImage.setAttribute("src", `${backend_base_url}` + '/' + `${e.profileimage['image']}`)
            //     reviewImage.setAttribute('style', 'width:50px; height:50px; margin-right:20px;')
            //     newCardBody.appendChild(reviewImage)
            // }

            const reviewTitle = document.createElement('a')
            reviewTitle.setAttribute('class', 'review_title')
            if(e.table == 'alcohol'){
                reviewTitle.setAttribute('onclick', `location.href='${frontend_base_url}/subpages/detail/alc_detail.html?category=${e.table}&id=${e.id}'`)
            }
            else if(e.table == 'brewery'){
                reviewTitle.setAttribute('onclick', `location.href='${frontend_base_url}/subpages/detail/brew_detail.html?category=${e.table}&id=${e.id}'`)
            }
            else if(e.table == 'event'){
                reviewTitle.setAttribute('onclick', `location.href='${frontend_base_url}/subpages/detail/eve_detail.html?category=${e.table}&id=${e.id}'`)
            }
            
            const reviewUpdatedAt = document.createElement('a')
            reviewUpdatedAt.setAttribute('class', 'review_title')
            const newYearMonthDate = new Date(e['updated_at']);
            const year = newYearMonthDate.getFullYear();
            const month = newYearMonthDate.getMonth() + 1;
            const date = newYearMonthDate.getDate();
            const updateDate= (`${year}-${month >= 10 ? month : '0' + month}-${date >= 10 ? date : '0' + date}`)

            reviewTitle.innerText = `${e['content']} ${updateDate}`
            reviewTitle.setAttribute('style', 'cursor: pointer;')
            newCardBody.appendChild(reviewTitle)
        })
    }
}