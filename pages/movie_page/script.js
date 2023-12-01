import { fadeOutModal } from "../../modules/functions";
import { getData } from "../../modules/http";
import { reload_search } from "../../modules/reloads";

let movie_name = document.querySelector('.movie_name');
let movie_mini_name = document.querySelector('.mini_name')
let tagline = document.querySelector('.tagline')
let id = location.search.split('=').at(-1)
let movie_backdrop = document.querySelector('.movie_bg')
let poster = document.querySelector('.poster')
let description = document.querySelector('.description')
let rate = document.querySelector('.rate')
let vout_count = document.querySelector('.vout_count')
let waiting_rate = document.querySelector('.waiting')
let wait_rate = document.querySelector('.wait_rate')
let year = document.querySelector('.year')
let slogan = document.querySelector('.slogan')
let trailer_name = document.querySelector('.trailer h2')
let form = document.forms.search
let inp = document.querySelector('.search_input')
let place = document.querySelector('.results')


getData('/movie/' + id)
    .then(res => {
        let title = res.title

        if (title.length > 25) {
            movie_name.innerHTML = title.substring(0, 16)
        } else {
            movie_name.innerHTML = title
        }

        movie_mini_name.innerHTML = res.title
        tagline.innerHTML = res.tagline
        movie_backdrop.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.backdrop_path})`
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.poster_path})`

        let overview = res.overview
        if (overview.length > 200) {
            description.innerHTML = `${overview.substring(0, 200)}...`
        } else {
            description.innerHTML = overview
        }

        rate.innerHTML = res.vote_average.toFixed(1)
        vout_count.innerHTML = res.vote_count
        if (res.runtime >= 100) {
            waiting_rate.innerHTML = '100'
            wait_rate.style.width = `100%`
        } else {
            waiting_rate.innerHTML = res.runtime
            wait_rate.style.width = `${res.runtime}%`
        }
        let date = new Date(res.release_date)
        let yearr = date.getFullYear()
        year.innerHTML = yearr

        let countries = res.production_countries

        let countriesElement = document.getElementById('countries');
        let countryNames = countries.map(country => country.name);
        let joinedNames = countryNames.join(', ');
        countriesElement.innerHTML = joinedNames;

        slogan.innerHTML = res.tagline


        let companies = res.production_companies
        let companyElement = document.getElementById('companies')
        let companyName = companies.map(company => company.name)
        let joinCompany = companyName.join(', ')
        companyElement.innerHTML = joinCompany

        trailer_name.innerHTML = res.title
    })


function reload_credits(arr, place) {
    place.innerHTML = ''

    for (let item of arr) {
        let person_box = document.createElement('div')
        let poster = document.createElement('div')
        let title = document.createElement('h2')

        person_box.classList.add('credits')
        poster.classList.add('poster')
        title.classList.add('title')

        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.profile_path})`;
        title.innerHTML = item.name

        place.append(person_box)
        person_box.append(poster, title)

        poster.onclick = () => {
            location.assign('/pages/actor_page/?id=' + item.id)
        }
    }
}


let actors_box = document.querySelector('.actors_box')

getData(`/movie/${id}/credits`)
    .then(res => {
        let cast = res.cast
        reload_credits(cast.splice(0, 8), actors_box)
    })


let iframe = document.querySelector('iframe')
getData(`/movie/${id}/videos`)
    .then(res => {
        let movie = res.results
        let random_index = Math.floor(Math.random() * movie.length);
        let random_trailer = movie[random_index];
        let trailer_key = random_trailer.key

        iframe.src = `https://www.youtube.com/embed/${trailer_key}`
    })
let poster_one = document.querySelector('.poster_one');
let poster_two = document.querySelector('.poster_two');
let poster_three = document.querySelector('.poster_three');
let poster_four = document.querySelector('.poster_four');
let poster_photo = document.getElementById('f');
let poster_photo_2 = document.getElementById('t');
let poster_photo_3 = document.getElementById('tr');
let poster_photo_4 = document.getElementById('fr');

let backdrop_photo = document.querySelector('.back')
let backdrop_photo_2 = document.getElementById('g')

getData(`/movie/${id}/images`)
    .then(res => {
        let posters = res.posters;
        let backdrops = res.backdrops;

        function getRandomItem(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        poster_one.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_two.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_three.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_four.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;

        poster_photo.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_photo_2.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_photo_3.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;
        poster_photo_4.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(posters).file_path}`;

        backdrop_photo.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(backdrops).file_path}`;
        backdrop_photo_2.src = `https://image.tmdb.org/t/p/w500/${getRandomItem(backdrops).file_path}`;
    })
    .catch(error => {
        console.error(error);
    });





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
