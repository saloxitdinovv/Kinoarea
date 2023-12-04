let loginBtn = document.querySelector('.loginBtn')
let confirmBtn = document.querySelector('.confirmBtn')
let reqToken = ''
let userIMG = document.querySelector('.avatar')
let userFullName = document.querySelector('.userFullName')
let API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'

let form = document.forms[0]

form.onsubmit = (e) => {
    e.preventDefault()
}

loginBtn.onclick = () => {
    fetch('https://api.themoviedb.org/4/auth/request_token', {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                reqToken = res.request_token
                window.open(`https://www.themoviedb.org/auth/access?request_token=${res.request_token}`)
            }
            confirmBtn.style.display = 'block'
            loginBtn.style.display = 'none'
        })
}

confirmBtn.onclick = () => {
    fetch(`https://api.themoviedb.org/4/auth/access_token`, {
        method: 'POST',
        dataType: 'json',
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            request_token: reqToken
        }),
        start_time: new Date().getTime()
    })
        .then(res => res.json())
        .then(res => {
            if (res.success) {
                localStorage.setItem('user_auth', JSON.stringify(res))
                location.reload()
                location.assign('/pages/profile/')
            }
        })
}
