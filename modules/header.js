import { fadeInModal } from "./functions";
let API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0YTkwODhkZDM4MzdmYzk3NzY5OTA4NWVkM2E4NTIxMSIsInN1YiI6IjY1NTRjYWRjZWE4NGM3MTA5NDAwMDFlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.dTIivT2f1mMQIEEf-gxzHim7irgnQgmOS1sOOE0mZJg'


let head_cont = document.getElementById('head_cont')

const headerDiv = document.createElement('div');
headerDiv.classList.add('header');

const logoDiv = document.createElement('div');
logoDiv.classList.add('head_box');
logoDiv.id = 'logo';

const logoSpan = document.createElement('span');
logoSpan.classList.add('logo');

const logoImg = document.createElement('img');
logoImg.src = '/public/logo.svg';
logoImg.alt = 'Logo';

const homePageParagraph = document.createElement('p');
homePageParagraph.classList.add('home_page');
homePageParagraph.innerHTML = '<span>Kino</span>area';

logoSpan.appendChild(logoImg);
logoSpan.appendChild(homePageParagraph);

const linksImg = document.createElement('img');
linksImg.src = '/public/links.png'
linksImg.alt = '';

logoDiv.appendChild(logoSpan);
logoDiv.appendChild(linksImg);

headerDiv.appendChild(logoDiv);

const navElement = document.createElement('nav');

const navLinks = ['Афиша', 'Медиа', 'Фильмы', 'Актёры', 'Новости', 'Подборки', 'Категории'];
navLinks.forEach(linkText => {
    const anchorElement = document.createElement('a');
    anchorElement.href = '#';
    anchorElement.textContent = linkText;
    navElement.appendChild(anchorElement);
});

headerDiv.appendChild(navElement);

const buttonsDiv = document.createElement('div');
buttonsDiv.classList.add('head_box');
buttonsDiv.id = 'buttons';

const searchButton = document.createElement('button');
searchButton.classList.add('search');

const signinButton = document.createElement('button');
signinButton.classList.add('signin');
signinButton.textContent = 'Войти';

const profile = document.createElement('div');
profile.classList.add('profile');
profile.style.display = 'none';

const profile_name = document.createElement('p');

const profile_avatar = document.createElement('img');
profile_avatar.classList.add('profile-avatar');

profile.append(profile_name, profile_avatar)

buttonsDiv.appendChild(searchButton);
buttonsDiv.append(signinButton, profile);

headerDiv.appendChild(buttonsDiv);

head_cont.appendChild(headerDiv);



searchButton.onclick = fadeInModal;



logoSpan.onclick = () => {
    location.assign('/')
}

let user_auth = JSON.parse(localStorage.getItem('user_auth')) || null

if (!user_auth) {
    signinButton.onclick = () => {
        location.assign('/pages/login/');
    };
} else {
    profile.onclick = () => {
        location.assign('/pages/profile/');
    }
}

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
            profile_avatar.src = `https://www.gravatar.com/avatar/${res.avatar.gravatar.hash}`
            profile_name.innerHTML = res.username
            signinButton.onclick = () => {
                location.assign('/pages/profile/');
            };
            signinButton.style.display = 'none';
            profile.style.display = 'flex';
        })
}