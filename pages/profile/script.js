import { getData } from "../../modules/http"

let user_auth = JSON.parse(localStorage.getItem('user_auth')) || null
let userFullName = document.querySelector('.profile_name')
let userIMG = document.querySelector('.avatar')
let API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'


if (user_auth) {
    fetch(`https://api.themoviedb.org/3/account/${user_auth?.account_id}`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
            'Content-Type': "application/json"
        },
    })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            userIMG.src = `https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}`
            userFullName.innerHTML = res.username
        })
}


let countrySelect = document.getElementById('country');
let regions = document.getElementById('region');


let countries;
fetch('https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json')
    .then(res => res.json())
    .then(res => {
        countries = res;

        let uniqueCountries = [...new Set(res.map(item => item.country))];

        for (let key of uniqueCountries) {
            let opt = new Option(key, key);
            countrySelect.append(opt);
        }



    });


countrySelect.addEventListener('change', function () {
    let selectedCountry = countrySelect.value;
    let citiesOfSelectedCountry = countries.filter(item => item.country === selectedCountry);

    let uniqueRegions = new Set(citiesOfSelectedCountry.map(item => item.subcountry));

    regions.innerHTML = '';

    for (let region of uniqueRegions) {
        let opt = new Option(region, region);
        regions.append(opt);
    }
});

let genres_select = document.getElementById('genres')

getData('/genre/movie/list')
    .then(res => {
        let genres = res.genres
        for (let genre of genres) {
            let opt = new Option(genre.name, genre.name)
            genres_select.append(opt);
        }
    })


let settings = document.querySelector('.settings_btn')
let setting = document.querySelector('.settings')
let profile_info = document.querySelector('.profile_info')

settings.onclick = () => {
    setting.style.display = 'flex'
    profile_info.style.display = 'none'
    settings.style.display = 'none'
}

let form = document.forms.setting
let inputs = form.querySelectorAll('input')
console.log(inputs);
form.onsubmit = (e) => {
    e.preventDefault()

    let error = false

    inputs.forEach(i => {
        if (i.value.length === 0) {
            error = true
        } else {
            error = false
        }
    })

    if (error) {
        return error;
    } else {
        submit()
        setting.style.display = 'none'
        profile_info.style.display = 'flex'
        settings.style.display = 'flex'
    }
}

let gender_choose = document.querySelector('.gender_choose')
let date = document.querySelector('.date')
let country = document.querySelector('.country')
let city = document.querySelector('.city')
let bio = document.querySelector('.bio')
let genres = document.querySelector('.genre')

function submit() {
    let user = {};

    let fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    console.log(user);
    userFullName.innerHTML = user.name
    gender_choose.innerHTML = user.gender
    date.innerHTML = user.date
    country.innerHTML = user.country
    city.innerHTML = user.city
    bio.innerHTML = user.bio
    genres.innerHTML = user.genres
}