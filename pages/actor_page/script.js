import Swiper from "swiper";
import { reload, reload_actorS_movies, reload_search } from "../../modules/reloads";
import { getData } from "/./modules/http"
import { fadeOutModal, initializeSwiper } from "../../modules/functions";
let id = location.search.split('=').at(-1)
let bio = document.querySelector('.biog')
let form = document.forms.search
let inp = document.querySelector('.search_input')
let place = document.querySelector('.results')



getData(`/person/${id}`)
    .then(res => {
        console.log(res);
        let poster = document.querySelector('.poster')
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.profile_path})`

        let actor_name = document.querySelector('.actor_name')
        actor_name.innerHTML = res.name

        let another_name = document.querySelector('.another_name')
        another_name.innerHTML = res.also_known_as[1]

        bio.innerHTML = res.biography
    })

let poster_photo = document.getElementById('f');
let poster_photo_2 = document.getElementById('t');
let poster_photo_3 = document.getElementById('tr');
let poster_photo_4 = document.getElementById('fr');

let backdrop_photo = document.querySelector('.back')
let backdrop_photo_2 = document.getElementById('g')



getData(`/person/${id}/images`)
    .then(res => {
        let photos = res.profiles
        function getRandomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        poster_photo.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;
        poster_photo_2.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;
        poster_photo_3.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;
        poster_photo_4.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;

        backdrop_photo.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;
        backdrop_photo_2.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(photos).file_path}`;
    })


let swiper = document.querySelector('.swiper')
let swiper_two = document.querySelector('.mySwiper')


getData(`/person/${id}/movie_credits`)
    .then(res => {
        let movies = res.cast
        reload(movies, swiper)

        initializeSwiper()

        reload_actorS_movies(movies, swiper_two)

    })


form.onsubmit = (e) => {
    e.preventDefault();

    let error = false;

    if (inp.value.length === 0) {
        error = true;
        inp.classList.add("error");
    } else {
        inp.classList.remove("error");
    }

    if (error) {
        return error
    } else {
        submit()
    }

}

function submit() {
    let user = {};

    let fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });


    let search_object = user.search

    getData(`/search/multi?query=${search_object}`)
        .then(res => {
            reload_search(res.results, place)
        })
}


let close_modal = document.querySelector('.close')
close_modal.onclick = fadeOutModal;
