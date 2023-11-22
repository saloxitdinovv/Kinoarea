import { getData } from "../modules/http"

let ids = []

export function reload(arr, place) {
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

        rating.innerHTML = item.vote_average.toFixed(1)
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

        ids.push(item.id)

        // console.log(ids);

        // for (let item of ids) {
        //     console.log(item);
        // }

    }
}

export function reload_swiper(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {

        let box = document.createElement('swiper-slide')
        let poster = document.createElement('div')
        let movie_info = document.createElement('div')
        let rating = document.createElement('div')
        let hovered = document.createElement('div')
        let movie_card = document.createElement('div')
        let movie_name = document.createElement('h1')
        let movie_genre = document.createElement('h1')


        box.classList.add('swipe_box')
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


        let title = item.original_title

        if (title.length > 25) {
            movie_name.innerHTML = title.substring(0, 16)
        } else {
            movie_name.innerHTML = title
        }


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
