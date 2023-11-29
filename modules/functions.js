import { reload } from "./reloads";


let currentIndex = 0;
let items;
let totalItems;

let modal = document.querySelector('.modal')
let body = document.body


export function show_hide(arr, place) {
    let showAll = false
    let show_hide_button = document.querySelector('.show_hide')
    let moviesToShow = 8


    show_hide_button.onclick = () => {
        showAll = !showAll;

        if (showAll) {
            reload(arr, place);
        } else {
            reload(arr.slice(0, moviesToShow), place);
        }
    }
}


export function showItems(startIndex) {
    for (let i = 0; i < totalItems; i++) {
        items[i].style.display = 'none';
    }

    for (let j = startIndex; j < startIndex + 4 && j < totalItems; j++) {
        items[j].style.display = 'flex';
    }
}

export function initializeSwiper() {
    items = document.querySelectorAll('.swiper .box');
    totalItems = items.length;

    showItems(currentIndex);

    let nextButton = document.querySelector('.swiper-button-next');
    let prevButton = document.querySelector('.swiper-button-prev');

    nextButton.addEventListener('click', function () {
        currentIndex = (currentIndex + 4 < totalItems) ? currentIndex + 4 : 0;
        showItems(currentIndex);
    });

    prevButton.addEventListener('click', function () {
        currentIndex = (currentIndex - 4 >= 0) ? currentIndex - 4 : Math.max(0, totalItems - 4);
        showItems(currentIndex);
    });
}

export const fadeInModal = () => {
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

export const fadeOutModal = () => {
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
