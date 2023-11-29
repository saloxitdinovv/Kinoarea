import { getData } from "/./modules/http"
let id = location.search.split('=').at(-1)
let bio = document.querySelector('.biog')

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
