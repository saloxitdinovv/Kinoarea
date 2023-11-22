let base_url = 'https://api.themoviedb.org/3'
let movie_name = document.querySelector('.movie_name');
let movie_mini_name = document.querySelector('.mini_name')
let tagline = document.querySelector('.tagline')
let id = location.search.split('=').at(-1)
let movie_backdrop = document.querySelector('.movie_bg')
let poster = document.querySelector('.poster')
let description = document.querySelector('.description')
let rate = document.querySelector('.rate')
let vout_count = document.querySelector('.vout_count')

fetch(base_url + '/movie/' + id, {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'
    }
})
    .then(res => res.json())
    .then(res => {
        let title = res.title
        
        if(title.length > 25) {
            movie_name.innerHTML = title.substring(0, 16)
        } else {
            movie_name.innerHTML = title
        }

        movie_mini_name.innerHTML = res.title
        tagline.innerHTML = res.tagline
        movie_backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.backdrop_path})`
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.poster_path})`

        let overview = res.overview
        if(overview.length > 200) {
            description.innerHTML = `${overview.substring(0, 200)}...`
        } else {
            description.innerHTML = overview
        }

        rate.innerHTML = res.vote_average.toFixed(1)
        vout_count.innerHTML = res.vote_count
        console.log(res);
    })

