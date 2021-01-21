"use strict"
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
  if (ev.target.className !== 'dropdowns__link focus dropdowns__link-isActive') {
    removeActive()
  }
})

document.addEventListener('click', (ev) => {
  if (ev.target.className !== 'dropdowns__link focus dropdowns__link-isActive') {
    removeActive()
  }
})

//кастомный скролл
document.querySelectorAll('.dropdowns__menu').forEach((el) => {
  new SimpleBar(el, { autoHide: false })
});

// //бургер
const burger = document.querySelector('.burger__btn');
const menu = document.querySelector('.header__nav');
const body = document.querySelector('body');
const headerLink = document.querySelectorAll('.header__link');
const list = document.querySelector('.header__list');
const entry = document.querySelector('.header__entry');

const open = () => {
  burger.classList.toggle('burger__btn-active');
  [list, entry].forEach(el => el.classList.toggle('active'));
  menu.classList.toggle('burger__menu-on');
  body.classList.toggle('overflow');
}

const close = () => {
  headerLink.forEach(el => el.tabIndex = -1);
  burger.classList.remove('burger__btn-active');
  [list, entry].forEach(el => el.classList.remove('active'));
  menu.classList.remove('burger__menu-on');
  body.classList.remove('overflow');
}

burger.addEventListener('click', () => open());
headerLink.forEach(el => el.addEventListener('click', () => close()));

//показ полосы поиска
const container = document.querySelector('.down__container');
const search = document.querySelector('.header__search');
const buttonSearch = document.querySelector('.header__button');
const labelSearch = document.querySelector('.header__label');
const burgerBtn = document.querySelector('.burger__btn');
const logo = document.querySelector('.header__logo');
const closeButton = document.createElement('button');

buttonSearch.addEventListener('click', (ev) => {
  if (!(labelSearch.classList.contains('active'))) {
    ev.preventDefault();
  }
  if (document.documentElement.clientWidth < 1367) {
    labelSearch.classList.toggle('active');
  }
  if (document.documentElement.clientWidth < 769) {
    container.append(closeButton);
    closeButton.classList.toggle('header__search--close');
    [burgerBtn, logo].forEach(el => el.classList.toggle('unactive'));
    [labelSearch, search].forEach(el => el.classList.toggle('width-full'));
  }
  if (document.documentElement.clientWidth < 591) {
    search.classList.toggle('padding-search');
  }
})
closeButton.addEventListener('click', () => {
  [labelSearch, search].forEach(el => el.classList.remove('width-full'));
  labelSearch.classList.remove('active');
  closeButton.classList.remove('header__search--close');
  search.classList.remove('padding-search');
  closeButton.remove();
  [burgerBtn, logo].forEach(el => el.classList.remove('unactive'));
})

// //плавная прокрутка
const anchors = document.querySelectorAll('.header__link')

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

// Выпадающий список
const element = document.querySelector('#selectCustom');
const choices = new Choices(element, {
  searchEnabled: false,
  itemSelectText: '',
  shouldSort: false,
});

//модальное окно

const modalContainer = document.querySelector('.gallery__modal');

function clearModal() {
  // modalContainer.innerHTML = '';
  const modal = modalContainer.querySelector('.modal__main');
  if (modal) {
    modal.remove();
  }
  body.classList.remove('overflow');
  body.style.removeProperty('padding-right');
  modalContainer.classList.remove('flex');
  modalContainer.children[0].classList.remove('flex');
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
      const modalChild = modalContainer.children[1];
      [modalContainer, modalChild].forEach(el => el.classList.add('flex'));
      body.classList.add('overflow');
      const widthWindowNew = document.documentElement.clientWidth;
      const scrollWidth = widthWindowNew - widthWindow;
      body.style.paddingRight = scrollWidth + 'px';
    } else {
      const modalTemp = document.querySelector('.modal__temp');
      [modalContainer, modalTemp].forEach(el => el.classList.add('flex'));
      body.classList.add('overflow');
      const widthWindowNew = document.documentElement.clientWidth;
      const scrollWidth = widthWindowNew - widthWindow;
      body.style.paddingRight = scrollWidth + 'px';
    }
  })
})

document.addEventListener('click', (ev) => {
  if (ev.target.className === 'modal__close' || ev.target.className === 'gallery__modal flex') {
    setTimeout(clearModal, 400);
    modalContainer.classList.add('gallery__modal--off');
  }
})

//аккордион
function tabContent(content, boolean) {
  content.querySelectorAll('.article__link').forEach(el => {
    if (boolean) {
      el.removeAttribute('tabindex');
    } else {
      el.tabIndex = 0
    };
  })
}

const accordionHeaders = document.querySelectorAll('.article__btn');
accordionHeaders.forEach(accordionBtn => {
  accordionBtn.onclick = () => {
    const parent = accordionBtn.closest('div[data-target]');
    const content = accordionBtn.nextElementSibling;
    const expanded = accordionBtn.getAttribute('aria-expanded') === 'true' || false;
    if (expanded) {
      accordionBtn.setAttribute('aria-expanded', !expanded);
    } else {
      parent.querySelectorAll('.article__btn').forEach(accordionBtn => {
        accordionBtn.setAttribute('aria-expanded', expanded);
      })
      parent.querySelectorAll('.article__artists').forEach(accordionContent => {
        accordionContent.setAttribute('aria-hidden', !expanded);
      })
      accordionBtn.setAttribute('aria-expanded', !expanded);
    }
    content.setAttribute('aria-hidden', expanded);
    tabContent(content, expanded);
  }
})
//EDITIONS
//спойлер
const spoilerParent = document.querySelector('.categories');
const spoilerTitle = document.querySelector('.categories__legend');
const spoilerItems = document.querySelectorAll('.categories__item');
const spoilerContentItem = document.querySelectorAll('.categories__checkbox');

if (document.documentElement.clientWidth < 591) {
  spoilerTitle.tabIndex = 0;
  spoilerTitle.setAttribute('aria-expanded', false);
  spoilerItems.forEach(el => el.setAttribute('aria-hidden', true));
  spoilerTitle.onclick = () => {
    const expanded = spoilerTitle.getAttribute('aria-expanded') === 'true' || false;
    spoilerTitle.setAttribute('aria-expanded', !expanded);
    spoilerItems.forEach(el => el.setAttribute('aria-hidden', expanded));
  }
  spoilerContentItem.forEach(el => {
    el.onclick = () => {
      const parent = el.closest('li');
      parent.classList.toggle('categories__item--active');
    }
  })
}
//отмена свайпера
const editionsSwiper = document.querySelector('.editions__swiper');
const editionsSwiperWrapper = document.querySelector('.editions__slider');
const books = document.querySelectorAll('.book');
if (document.documentElement.clientWidth < 591) {
  editionsSwiper.classList.remove('swiper-container');
  editionsSwiperWrapper.classList.remove('swiper-wrapper');
  books.forEach(el => el.classList.remove('swiper-slide'));
}

/* ****** */

//табы

function tabs(button, content) {
  document.querySelectorAll(button).forEach(el => {
    el.addEventListener('click', ev => {
      if (el.className === 'country__btn') {
        document.querySelectorAll('.country__btn').forEach(el =>
          el.classList.remove('country__btn--active')
        );
        el.classList.add('country__btn--active');
      }
      const path = ev.currentTarget.dataset.path;
      const parent = el.closest('div[data-target]') ? el.closest('div[data-target]') : document;
      const target = parent.querySelector(`[data-target="${path}"]`);
      parent.querySelectorAll(content).forEach(el => {
        el.classList.remove('active');
      });
      if (target === null) {
        parent.querySelector(`[data-target="template"]`).classList.add('active');
      } else {
        target.classList.add('active');
      }
    })
  })
}

tabs('.country__btn', '.article');
tabs('.article__link', '.painter');

//секция Events
const viewAll = document.querySelector('.events__btn');
const cards = document.querySelectorAll('.card');
const cardLinks = document.querySelectorAll('.card__link');
const eventsList = document.querySelector('.events__list');
const eventsSlider = document.querySelector('.events__swiper');

function getAllCard(cards) {
  cards.forEach(card => {
    card.classList.remove('unactive');
    viewAll.classList.add('unactive');
  })
}

viewAll.onclick = () => { getAllCard(cards) };

if (document.documentElement.clientWidth < 877) {
  eventsList.children[2].classList.add('unactive');
}

if (document.documentElement.clientWidth < 591) {
  getAllCard(cards);
  eventsSlider.classList.add('swiper-container');
  eventsList.classList.add('swiper-wrapper');
  cards.forEach(card => { card.classList.add('swiper-slide') });
}

// Валидация формы
//маска
const selector = document.querySelector("input[type='tel']");

const im = new Inputmask("+7 (999)-999-99-99");
im.mask(selector);
//валидатор
const callback = document.querySelector('.callback');
const callbackBtn = document.querySelector('.callback__btn');

function clearForm() {
  callback.classList.remove('sending');
  callbackBtn.removeAttribute('disabled');
  callback.reset();
}
new JustValidate('.callback', {
  rules: {
    name: {
      required: true,
      minLength: 2,
      maxLength: 10
    },
    tel: {
      required: true,
      function: (name, value) => {
        const phone = selector.inputmask.unmaskedvalue()
        return Number(phone) && phone.length === 10
      }
    },
  },
  messages: {
    name: 'Введите имя!',
    tel: 'Введите телефон!',
  },
  colorWrong: 'red',
  focusWrongField: true,
  submitHandler: function (form, values, ajax) {
    callback.classList.add('sending');
    callbackBtn.setAttribute('disabled', 'disabled');
    ajax({
        url: 'sendmail.php',
        method: 'POST',
        data: values,
        async: true,
        callback: function(response) {
          alert(`Спасибо, ${values.name}, мы обязательно свяжемся с Вами`);
          clearForm();
        },
        error: function (response) {
          alert('Ошибка! \nResponse from server:' + response);
          clearForm();
        },
    });
  }
});

// Карта
ymaps.ready(init);

function init() {
  const geolocationControl = new ymaps.control.GeolocationControl({
    options: {
      position: {
        right: 10,
        top: 400,
      }
    }
  });
  const myMap = new ymaps.Map("map", {
    center: [55.758034, 37.600784],
    controls: [],
    zoom: 15
  },
    {
      suppressMapOpenBlock: true
    });
  const myPlacemark = new ymaps.Placemark([55.758034, 37.600784], {}, {
    iconLayout: 'default#image',
    iconImageHref: 'img/geo.svg',
    iconImageSize: [20, 20],
    iconImageOffset: [0, 0]
  })
  myMap.geoObjects.add(myPlacemark);
  myMap.controls.add('zoomControl', {
    size: "small",
    position: {
      left: 'auto',
      right: 10,
      top: 320,
    }
  });
  myMap.controls.add(geolocationControl);
  myMap.behaviors.disable('drag');
}

//свайперы
const sliders = document.querySelectorAll('.swiper-container');

sliders.forEach(el => {
  const parent = el.closest('.container');
  const mySwiper = new Swiper(el, {
    loop: false,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    navigation: {
      nextEl: parent.querySelector('.slider-section__next'),
      prevEl: parent.querySelector('.slider-section__prev'),
    },
    pagination: el.classList.contains('events__swiper') ? {
      el: el.querySelector('.events__pagination'),
      type: 'bullets',
      clickable: true,
      bulletClass: 'card__dot',
      bulletActiveClass: 'card__dot--active',
    } :
      {
        el: parent.querySelector('.slider-section__pagination'),
        type: 'custom',
        renderCustom: function (mySwiper, current, total) {
          return current + ' / ' + total;
        }
      },
    breakpoints: {
      320: {
        slidesPerView: 1,
        slidesPerGroup: 1,
        slidesPerColumn: 1,
        spaceBetween: 30,
        autoHeight: true,
      },
      590: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 34,
        slidesPerColumn: el.classList.contains('gallery__swiper') ? 2 : 1,
      },
      1024: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: el.classList.contains('gallery__swiper') ? 34 : 50,
        slidesPerColumn: el.classList.contains('gallery__swiper') ? 2 : 1,
      },
      1276: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 50,
        slidesPerColumn: el.classList.contains('gallery__swiper') ? 2 : 1,
        autoHeight: el.classList.contains('gallery__swiper') ? false : true,
      },
    }
  })
})

//tooltips
const tooltipButton = document.querySelectorAll('.projects__tooltip');

const tooltipPosition = () => {
  tooltipButton.forEach(el => {
    const coord = el.getBoundingClientRect();
    const coordLeft = coord.left;
    if ((document.documentElement.clientWidth - coordLeft) < 140) {
      el.children[0].style.transform = 'translate(-97%, 0)'
    } else if (coordLeft < 140) {
      el.children[0].style.transform = 'translate(-3%, 0)'
    } else {
      el.children[0].style.transform = 'translate(-50%, 0)'
    }
  })
}

tooltipPosition();
window.addEventListener('resize', tooltipPosition);

//отмена фокуса при клике
let mouseDown = false;

const focus = document.querySelectorAll('.focus');

function focusOffClickElement(element) {
  element.forEach(el => {
    el.addEventListener('mousedown', () => mouseDown = true);
    el.addEventListener('mouseup', () => mouseDown = false);
    el.addEventListener('focus', () => {
      if (mouseDown) {
        el.blur();
      }
    });
  })
}

focusOffClickElement(focus);
