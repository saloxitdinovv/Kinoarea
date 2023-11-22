import { reload } from "./reloads";

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
