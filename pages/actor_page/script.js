import { getData } from "/./modules/http"
let id = location.search.split('=').at(-1)

getData(`/person/${id}`) 
    .then(res => {
        console.log(res);
        let poster = document.querySelector('.poster')
        poster.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${res.profile_path})`

        let actor_name = document.querySelector('.actor_name')
        actor_name.innerHTML = res.name

        let another_name = document.querySelector('.another_name')
        another_name.innerHTML = res.also_known_as[1]
    })

