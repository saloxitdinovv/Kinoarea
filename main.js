import { show_hide } from "./modules/functions"
import { getData } from "./modules/http"
import { reload, reload_swiper } from "./modules/reloads"

let grid_box = document.querySelector('.grid_box')
let moviesToShow = 8
let movies
let swiper = document.querySelector('swiper-container')
let trailer_box = document.querySelector('.tr_box')


getData('/movie/now_playing')
    .then(res => {
        movies = res.results
        reload(movies.slice(0, moviesToShow), grid_box)
        show_hide(movies, grid_box)
    })




// let genres = []


// let api_key = '4a9088dd3837fc977699085ed3a85211'
// let genre = `https://api.themoviedb.org/3/genre/movie/list?api_key=[${api_key}]&language=ru`

// fetch(genre, {
//     headers: {
//         Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'
//     }
// })
//     .then(res => res.json())
//     .then(res => {
//         for (let genre of res.genres) {
//             genres.push(genre)
//         }
//     })


getData('/movie/popular')
    .then(res => {
        movies = res.results
        reload_swiper(movies, swiper)
    })

let act_box = document.querySelector('.act_list')

let person_box = document.querySelector('.top')
let other_actors_box = document.querySelector('.others')

getData('/person/popular')
    .then(res => {
        reload_actors(res.results, person_box)
    })



function reload_actors(arr, place) {
    place.innerHTML = ''

    
    for(let i = 0; i < 2 && i < arr.length; i++) {
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