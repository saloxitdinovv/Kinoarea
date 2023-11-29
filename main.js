import { fadeInModal, fadeOutModal, initializeSwiper, showItems, show_hide } from "./modules/functions"
import { getData } from "./modules/http"
import { reload, reload_actors, reload_genres, reload_search, reload_trailers } from "./modules/reloads"

let grid_box = document.querySelector('.grid_box')
let moviesToShow = 8
let movies
let place = document.querySelector('.results')
let swiper = document.querySelector('.swiper')
let upcoming_box = document.querySelector('.upcoming_box')
let person_box = document.querySelector('.top')
let form = document.forms.search
let search_button = document.querySelector('.search')
let inp = document.querySelector('.search_input')
let close_modal = document.querySelector('.close')
let genre_menu = document.querySelector('.genre_menu')
let trailers = document.querySelector('.other_trailers')


getData('/movie/now_playing')
    .then(res => {
        movies = res.results
        reload(movies.slice(0, moviesToShow), grid_box)
        show_hide(movies, grid_box)
    })


getData('/movie/popular')
    .then(res => {
        movies = res.results
        reload_trailers(movies, trailers)
    })



getData('/person/popular')
    .then(res => {
        reload_actors(res.results, person_box)
    })



search_button.onclick = fadeInModal;

close_modal.onclick = fadeOutModal;


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
        inp.value = ''
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




getData('/movie/upcoming')
    .then(res => {
        let upc_movies = res.results
        reload(upc_movies.slice(0, 4), upcoming_box)
    })



getData('/genre/movie/list')
    .then(res => reload_genres(res.genres, genre_menu))




getData('/movie/popular')
    .then(res => {
        movies = res.results
        reload(movies, swiper)

        initializeSwiper();
    })


let movie_years = document.querySelectorAll('.time')

movie_years.forEach(year => {
    let yearMovie
    year.onclick = () => {
        yearMovie = year.innerHTML
        movie_years.forEach(y => y.classList.remove('active'))
        year.classList.add('active')
        
        getData(`/discover/movie?primary_release_year=${yearMovie}`)
            .then(res => {
                let movies = res.results
                reload(movies, swiper)

                initializeSwiper()
            })
    }
})