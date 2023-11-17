let movie_name = document.querySelector('.movie_name');
let base_url = 'https://api.themoviedb.org/3'
let id = location.search.split('=').at(-1)

fetch(base_url + '/movie/' + id, {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'
    }
})
    .then(res => res.json())
    .then(res => {
        movie_name.innerHTML = res.title
    })

