import { show_hide } from "./modules/functions"
import { getData } from "./modules/http"
import { reload, reload_swiper, reload_actors, reload_search } from "./modules/reloads"

let grid_box = document.querySelector('.grid_box')
let moviesToShow = 8
let movies
let swiper = document.querySelector('swiper-container')
let place = document.querySelector('.results')
let cont2 = document.querySelector('.container2')
let base_url = 'https://api.themoviedb.org/3'

getData('/movie/now_playing')
    .then(res => {
        movies = res.results
        reload(movies.slice(0, moviesToShow), grid_box)
        show_hide(movies, grid_box)
        reload2(res.results, cont2)
    })


getData('/movie/popular')
    .then(res => {
        movies = res.results
        reload_swiper(movies, swiper)
    })


let person_box = document.querySelector('.top')

getData('/person/popular')
    .then(res => {
        reload_actors(res.results, person_box)
    })



let form = document.forms.search
let search_button = document.querySelector('.search')
let inp = document.querySelector('.search_input')
let modal = document.querySelector('.modal')
let body = document.body
let close_modal = document.querySelector('.close')



const fadeInModal = () => {
    modal.style.display = 'block';
    body.style.overflow = 'hidden';
    modal.style.opacity = 0;

    let opacity = 0;

    const fade = () => {
        if (opacity < 1) {
            opacity += 0.5;
            modal.style.opacity = opacity;
            setTimeout(fade, 50);
        }
    };

    fade();
};

const fadeOutModal = () => {
    let opacity = 1;

    const fade = () => {
        if (opacity > 0) {
            opacity -= 0.5;
            modal.style.opacity = opacity;
            setTimeout(fade, 100);
        } else {
            modal.style.display = 'none';
            body.style.overflowY = 'scroll';
        }
    };

    fade();
};

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



let upcoming_box = document.querySelector('.upcoming_box')

getData('/movie/upcoming')
    .then(res => {
        let upc_movies = res.results
        reload(upc_movies.slice(0, 4), upcoming_box)
    })

getData('/genre/movie/list?')
    .then(res => console.log(res.genres))


let hover_img2 = document.querySelectorAll('.hover_img2')
let youtube = document.querySelector('.youtube')

hover_img2.forEach(btn => {
    btn.onclick = () => {
        hover_img2.forEach(el => el.style.opacity = '1')
        let id_move = btn.getAttribute('data-move_id')
        btn.style.opacity = '1'
        fetch(base_url + '/movie/' + id_move + '?api_key=790c95e0985a2e338aea850a76b8ebda&append_to_response=videos', {
            headers: {
                Authorization: 'Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTBjOTVlMDk4NWEyZTMzOGFlYTg1MGE3NmI4ZWJkYSIsInN1YiI6IjY1NTYwNTAzNjdiNjEzNDVkYmMxMzM4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8vyyF9E6X99GgYd-5H6vLMKAn9jq7ik3ze9-zfOwsQw'
            }
        }).then(res => res.json())
            .then(res => youtube.src = `https://www.youtube.com/embed/${res.results[0].key}`)
    }
})

function reload2(arr, place) {
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