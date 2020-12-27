//отмена фокуса при клике
let mouseDown = false;

const headerLink = document.querySelectorAll('.header__link');
const headerEntry = document.querySelectorAll('.header__entry');
const dropdownsLink = document.querySelectorAll('.dropdowns__link');

function focusOff(el) {
    el.addEventListener('mousedown', () => mouseDown = true);
    el.addEventListener('mouseup', () => mouseDown = false);
    el.addEventListener('focus', () => {
        if (mouseDown) {
        el.blur();
        }
    });
}

headerLink.forEach(el => focusOff(el));
headerEntry.forEach(el => focusOff(el));
dropdownsLink.forEach(el => focusOff(el));

//dropdown
function removeActive() {
    document.querySelectorAll('.dropdowns__isActive').forEach((el) => {
        el.classList.remove('dropdowns__isActive')
    })
    document.querySelectorAll('.dropdowns__link-isActive').forEach((el) => {
        el.classList.remove('dropdowns__link-isActive');
    })
}

function addActive(link, menu) {
  link.classList.add('dropdowns__link-isActive');
  menu.classList.add('dropdowns__isActive');
}

const canHover = window.matchMedia('(hover: hover)').matches;

document.querySelectorAll('.dropdowns__element').forEach((el) => {
  const link = el.children[0];
  const menu = el.children[1];
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    if (link.classList.contains('dropdowns__link-isActive')) {
      removeActive();
      return;
    }
    removeActive();
    addActive(link, menu);
    }
  )
  if (canHover) {
    el.addEventListener('mouseover', () => { addActive(link, menu) });
  }
})

document.addEventListener('mouseout', (ev) => {
    if (ev.target.className !== 'dropdowns__link dropdowns__link-isActive') {
        removeActive()
    }
})

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
// const burger = document.querySelector('.burger__btn');
// const menu = document.querySelector('.burger__menu');
// const body = document.querySelector('body');
// const burgerLink = document.querySelectorAll('.burger__link');

// const open = () => {
//     burgerLink.forEach(el => {
//         burger.classList.contains('burger__btn-active') ?
//             el.tabIndex = -1 : el.tabIndex = 0;
//     })
//     burger.classList.toggle('burger__btn-active');
//     menu.classList.toggle('burger__menu-on');
//     body.classList.toggle('overflow');
// }

// const close = () => {
//     burgerLink.forEach(el => el.tabIndex = -1);
//     burger.classList.remove('burger__btn-active');
//     menu.classList.remove('burger__menu-on');
//     body.classList.remove('overflow');
// }

// burger.addEventListener('click', () => open());
// burgerLink.forEach(el => el.addEventListener('click', () => close()));

//показ полосы поиска
// const search = document.querySelector('.search__top');
// const buttonSearch = document.querySelector('.header__button');
// const labelSearch = document.querySelector('.header__label');
// const burgerBtn = document.querySelector('.burger__btn');
// const logo = document.querySelector('.header__logo');
// const closeButton = document.createElement('button');

// buttonSearch.addEventListener('click', (ev) => {
//     ev.preventDefault();
//     if (document.documentElement.clientWidth < 1367) {
//         labelSearch.classList.toggle('block');
//     }
//     if (document.documentElement.clientWidth < 769) {
//         search.append(closeButton);
//         closeButton.classList.toggle('search__top_close');
//         [burgerBtn, logo].forEach(el => el.classList.toggle('block-none'));
//         [labelSearch, search].forEach(el => el.classList.toggle('width-full'));
//     }
//     if (document.documentElement.clientWidth < 591) {
//         search.classList.toggle('padding-search');
//     }
// })
// closeButton.addEventListener('click', () => {
//     [labelSearch, search].forEach(el => el.classList.remove('width-full'));
//     labelSearch.classList.remove('block');
//     closeButton.classList.remove('search__top_close');
//     search.classList.remove('padding-search');
//     [burgerBtn, logo].forEach(el => el.classList.remove('block-none'));
// })

// //плавная прокрутка
const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href').substr(1);

        document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
}
//свайпер
const swiper = new Swiper('.swiper-container', {
    // Optional parameters
    // direction: 'vertical',
    loop: true,
    navigation: {
      nextEl: '.gallery__next',
      prevEl: '.gallery__prev',
    },
    pagination: {
      el: '.gallery__pagination',
      type: 'custom',
      renderCustom: function (swiper, current, total) {
        return current + ' / ' + total;
      }
    },
})

// Выпадающий список
const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
    searchEnabled: false,
    itemSelectText: '',
    shouldSort: false,
});

//модальное окно

const modalContainer = document.querySelector('.gallery__modal');
const body = document.querySelector('body');

function clearModal() {
  modalContainer.innerHTML = '';
  body.classList.remove('overflow');
  body.style.removeProperty('padding-right');
  modalContainer.classList.remove('flex');
  modalContainer.classList.remove('gallery__modal--off');
}

document.querySelectorAll('.gallery__link').forEach(el => {
  el.addEventListener('click', (ev) => {
    ev.preventDefault();
    clearModal();
    const widthWindow = document.documentElement.clientWidth;
    const parent = ev.target.parentElement;
    const child = parent.children[1];
    if (child) {
    const modal = child.cloneNode(true);
    modalContainer.append(modal);
    const modalChild = modalContainer.children[0];
    [modalContainer, modalChild].forEach(el => el.classList.add('flex'));
    body.classList.add('overflow');
    const widthWindowNew = document.documentElement.clientWidth;
    const scrollWidth = widthWindowNew - widthWindow;
    body.style.paddingRight = scrollWidth + 'px';
    }
  })
})

document.addEventListener('click', (ev) => {
  if (ev.target.className === 'modal__close') {
    setTimeout(clearModal, 400);
    modalContainer.classList.add('gallery__modal--off');
  }
})
