//dropdown

function removeActive() {
    document.querySelectorAll('.dropdowns__isActive').forEach((el) => {
        el.classList.remove('dropdowns__isActive')
    })
    document.querySelectorAll('.dropdowns__link-isActive').forEach((el) => {
        el.classList.remove('dropdowns__link-isActive');
    })
}

document.querySelectorAll('.dropdowns__title').forEach((el) => {
    el.addEventListener('click', (ev) => {
        ev.preventDefault;
        // ev.stopPropagation;
        const link = el.children[0];
        const menu = el.children[1];
        if (link.classList.contains('dropdowns__link-isActive')) {
            removeActive();
            return;
        }
        removeActive();
        link.classList.add('dropdowns__link-isActive');
        menu.classList.add('dropdowns__isActive');
        }
    )
})

//не срабатывает в мобильной версии первый клик
// const canHover = window.matchMedia('(hover: hover)').matches;
// if (canHover) {
//     document.querySelectorAll('.dropdowns__title').forEach((el) => {
//         el.addEventListener('mouseover', (ev) => {
//             ev.preventDefault;
//             // ev.stopPropagation;
//             const link = el.children[0];
//             const menu = el.children[1];
//             link.classList.add('dropdowns__link-isActive');
//             menu.classList.add('dropdowns__isActive');
//             }
//         )
//     })
//     document.addEventListener('mouseout', (ev) => {
//         if (ev.target.className !== 'dropdowns__link dropdowns__link-isActive') {
//             removeActive()
//         }
//     })
// }

document.addEventListener('click', (ev) => {
    if (ev.target.className !== 'dropdowns__link dropdowns__link-isActive') {
        removeActive()
    }
})

//кастомный скролл
document.querySelectorAll('.dropdowns__menu').forEach((el) => {
    new SimpleBar(el, { autoHide: false })
});

// //бургер
const burger = document.querySelector('.burger__btn');
const nav = document.querySelector('.burger__menu');
const body = document.querySelector('body');
const burgerList = document.querySelector('.burger__list');
const button = document.querySelector('.burger__bottom');

const open = () => {
    burger.classList.toggle('burger__btn-active');
    nav.classList.toggle('burger__menu-on');
    body.classList.toggle('overflow');
}

const close = () => {
    burger.classList.remove('burger__btn-active');
    nav.classList.remove('burger__menu-on');
    body.classList.remove('overflow');
}

burger.addEventListener('click', () => open());
burgerList.addEventListener('click', () => close());
button.addEventListener('click', () => close());

//показ полосы поиска
const search = document.querySelector('.header__input');
const searchButton = document.querySelector('.adapt__button');
const logo = document.querySelector('.header__left');
const block = document.querySelector('.header__right');
const searchBlock = document.querySelector('.adapt');
const closeButton = document.createElement('button');

searchButton.addEventListener('click', () => {
    if (document.documentElement.clientWidth < 831) {
        [logo, burger].forEach(el => el.classList.toggle('block__none'));
        block.classList.toggle('width__full');
        searchBlock.append(closeButton);
        closeButton.classList.toggle('adapt__close');
    }
    if (document.documentElement.clientWidth < 531) {
        searchBlock.classList.toggle('header__search-padding');
    }
    search.classList.toggle('block');
})
closeButton.addEventListener('click', () => {
    [logo, burger].forEach(el => el.classList.remove('block__none'));
    block.classList.remove('width__full');
    closeButton.classList.remove('adapt__close');
    search.classList.remove('block');
    searchBlock.classList.remove('header__search-padding');
})


// //плавная прокрутка
// const anchors = document.querySelectorAll('a[href*="#"]')

// for (let anchor of anchors) {
//     anchor.addEventListener('click', function (e) {
//         e.preventDefault()

//         const blockID = anchor.getAttribute('href').substr(1)

//         document.getElementById(blockID).scrollIntoView({
//             behavior: 'smooth',
//             block: 'start'
//         })
//     })
// }