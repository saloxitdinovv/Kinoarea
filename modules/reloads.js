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
        movie_genre.innerHTML = 'Триллер, драма, криминал'


        let title = item.original_title

        if (title.length > 25) {
            movie_name.innerHTML = title.substring(0, 16)
        } else {
            movie_name.innerHTML = title
        }

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

        rating.innerHTML = item.vote_average.toFixed(1)
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


export function reload2(arr, place) {
    for (let item of arr) {
        let div = document.createElement('div')
        let img = document.createElement('img')
        let h1 = document.createElement('h1')
        let hover = document.createElement('div')
        let button = document.createElement('img')

        button.src = '/public/play.svg'
        button.classList.add('play')
        div.style.marginRight = 'none'
        img.src = `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
        h1.innerHTML = item.title
        div.dataset.move_id = item.id

        h1.classList.add('h1_post_new2')
        hover.classList.add('hover_img2')
        img.classList.add('img_post_new2')
        div.classList.add('place_img2')
        place.append(div)
        div.append(img, h1, hover)
        hover.append(button)

        div.onclick = () => {
            let id_move = 0
            hover_img2.forEach(el => el.style.opacity = '1')
            id_move = div.getAttribute('data-move_id')
            div.style.opacity = '1'
            fetch(base_url + '/movie/' + id_move + '/videos', {
                headers: {
                    Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTBjOTVlMDk4NWEyZTMzOGFlYTg1MGE3NmI4ZWJkYSIsInN1YiI6IjY1NTYwNTAzNjdiNjEzNDVkYmMxMzM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8vyyF9E6X99GgYd-5H6vLMKAn9jq7ik3ze9-zfOwsQw'
                }
            }).then(res => res.json())
                .then(res => {
                    let rnd = Math.floor(Math.random() * res.results.length)
                    youtube.src = `https://www.youtube.com/embed/${res.results[0].key}`
                })
        }

    }
}

export function reload_actors(arr, place) {
    place.innerHTML = ''


    for (let i = 0; i < 2 && i < arr.length; i++) {
        let actor = arr[i]
        let person = document.createElement('div')
        let actor_name = document.createElement('h1')
        let actor_original_name = document.createElement('h2')
        let rate = document.createElement('p')


        actor_name.innerHTML = actor.name
        actor_original_name.innerHTML = actor.name
        rate.innerHTML = `${i + 1}-е место`

        person.classList.add('actor')
        person.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${actor.profile_path})`

        place.append(person)
        person.append(actor_name, actor_original_name, rate)
        console.log(actor);

        person.onclick = () => {
            location.assign('/pages/actor_page/?id=' + actor.id)
        }
    }
    let others = document.createElement('div')
    others.classList.add('others')
    place.append(others)

    for (let i = 2; i < arr.length; i++) {
        let actor = arr[i];
        let person = document.createElement('div')
        let person_name = document.createElement('p');
        let person_orig_name = document.createElement('p');

        let span = document.createElement('span');

        person_name.classList.add('actor_name')
        person_orig_name.classList.add('actor_orig_name')
        person.classList.add('person')

        person_name.innerHTML = actor.name
        person_orig_name.innerHTML = actor.name
        span.innerHTML = `${i + 1}-е место`

        others.append(person)
        person.append(person_name, person_orig_name, span)


        person.onclick = () => {
            location.assign('/pages/actor_page/?id=' + actor.id)
        }
    }
}

export function reload_search(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let result = document.createElement('div')
        let poster_div = document.createElement('div')
        let result_title = document.createElement('h1')

        if (item.title) {
            result_title.innerHTML = item.title
        } else {
            result_title.innerHTML = item.name
        }


        poster_div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`

        result_title.classList.add('result_title')


        if (item.media_type === 'person') {
            poster_div.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.profile_path})`

            if (item.profile_path === null) {
                poster_div.style.backgroundImage = `url(https://www.iconbolt.com/iconsets/ionicons-regular/person.svg)`
            }
        }


        result.classList.add('result')
        poster_div.classList.add('poster')
        place.append(result)
        result.append(poster_div, result_title)
        console.log(item);
    }
}