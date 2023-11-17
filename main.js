let base_url = 'https://api.themoviedb.org/3'
let grid_box = document.querySelector('.grid_box')
let moviesToShow = 8
let movies
let showAll = false
let show_hide_button = document.querySelector('.show_hide')

fetch(base_url + '/movie/now_playing?language=ru', {
    headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'
    }
})
    .then(res => res.json())
    .then(res => {
        movies = res.results
        reload(movies.slice(0, moviesToShow), grid_box)
    })


show_hide_button.onclick = () => {
    showAll = !showAll;

    if (showAll) {
        reload(movies, grid_box);
    } else {
        reload(movies.slice(0, moviesToShow), grid_box);
    }
}



function reload(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let box = document.createElement('div')
        let poster = document.createElement('div')
        let movie_info = document.createElement('div')
        let rating = document.createElement('div')
        let hovered = document.createElement('div')
        let movie_card = document.createElement('div')
        let movie_name = document.createElement('h1')
        let movie_genre = document.createElement('h1')


        box.classList.add('box')
        poster.classList.add('poster')
        movie_info.classList.add('movie_info')
        rating.classList.add('rating')
        hovered.classList.add('hovered')
        movie_card.classList.add('movie_card')
        movie_name.classList.add('movie_name')
        movie_genre.classList.add('movie_genre')


        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`

        rating.innerHTML = item.vote_average
        movie_card.innerHTML = 'Карточка фильма'
        movie_name.innerHTML = item.original_title
        movie_genre.innerHTML = 'Триллер, драма, криминал'

        place.append(box)
        box.append(poster, movie_info)
        poster.append(rating, hovered)
        hovered.append(movie_card)
        movie_info.append(movie_name, movie_genre)

        poster.onmouseenter = () => {
            hovered.style.display = 'block'
        }
        poster.onmouseleave = () => {
            hovered.style.display = 'none'
        }

        movie_card.onclick = () => {
            location.assign('/pages/movie_page/?id=' + item.id)
        }

    }
}

// let api_key = '4a9088dd3837fc977699085ed3a85211'
// let genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=[${api_key}]&language=ru`

// fetch(genres, {
//     headers: {
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'
//     }
// })
//     .then(res => res.json())
//     .then(res => console.log(res))
