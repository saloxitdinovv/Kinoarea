import { getData } from "../modules/http"

let ids = []
let grid_box = document.querySelector('.grid_box')
let iframe = document.querySelector('iframe')
let movie_bg = document.querySelector('.movie_bg')


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


        let title = item.title

        if (title.length > 25) {
            movie_name.innerHTML = title.substring(0, 15)
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

        result.onclick = () => {
            if (item.media_type === 'person') {
                location.assign('/pages/actor_page/?id=' + item.id)
            } else {
                location.assign('/pages/movie_page/?id=' + item.id)
            }
        }


    }
}


export function reload_genres(arr, place) {
    place.innerHTML = ''

    for (let genre of arr) {
        let genre_div = document.createElement('div')
        genre_div.innerHTML = genre.name
        genre_div.setAttribute('id', genre.id)
        genre_div.classList.add('genre')
        place.append(genre_div)

        genre_div.onclick = () => {
            let genres = document.querySelectorAll('.genre')
            genres.forEach(genre => {
                genre.classList.remove('active')
            })
            genre_div.classList.add('active')
            getData('/discover/movie?with_genres=' + genre.id)
                .then(res => reload(res.results, grid_box))
        }
    }
}


export function reload_trailers(arr, place) {
    place.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        let item = arr[i];

        let trailer_box = document.createElement('div');
        let trailer = document.createElement('div');
        let title = document.createElement('h2');
        let play_button = document.createElement('div');
        let active_trailer = document.createElement('div');

        trailer.classList.add('trailer');
        title.classList.add('trailer_name');
        play_button.classList.add('play_btn');
        active_trailer.classList.add('active_trailer');

        if(item.backdrop_path === null) {
            trailer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.poster_path})`;
        } else {
            trailer.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`;
        }
        title.innerHTML = item.title.substring(0, 16);

        place.append(trailer_box);
        trailer_box.append(trailer, title);
        trailer.append(play_button, active_trailer);

        play_button.addEventListener('click', function () {
            document.querySelectorAll('.trailer').forEach(t => {
                t.querySelector('.active_trailer').style.display = 'none';
            });

            this.closest('.trailer').querySelector('.active_trailer').style.display = 'block';

            getData(`/movie/${item.id}/videos`)
                .then(res => {
                    let movie = res.results
                    let random_index = Math.floor(Math.random() * movie.length);
                    let random_trailer = movie[random_index];
                    let trailer_key = random_trailer.key

                    iframe.src = `https://www.youtube.com/embed/${trailer_key}`
                })
        });

        if (i === 0) {
            active_trailer.style.display = 'block';
            getData(`/movie/${item.id}/videos`)
                .then(res => {
                    let movie = res.results
                    let random_index = Math.floor(Math.random() * movie.length);
                    let random_trailer = movie[random_index];
                    let trailer_key = random_trailer.key

                    iframe.src = `https://www.youtube.com/embed/${trailer_key}`
                })
        }
    }
}