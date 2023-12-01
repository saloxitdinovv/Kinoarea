import { fadeInModal } from "./functions";

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

buttonsDiv.appendChild(searchButton);
buttonsDiv.appendChild(signinButton);

headerDiv.appendChild(buttonsDiv);

head_cont.appendChild(headerDiv);



searchButton.onclick = fadeInModal;


signinButton.onclick = (event) => {
    event.preventDefault();
    location.assign('/pages/profile/');
};