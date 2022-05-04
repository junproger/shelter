/* shelter js */
'use strict';
const modalcollect = document.querySelector('.modal_wrapper');
const modalborder = document.querySelector('.modal_border');
const closemodal = document.querySelector('.modal_close');
const startwrapper = document.querySelector('.wrapper');
const blockmenu = document.querySelector('.nav_menu');
const linksList = document.querySelector('.menu_list');
const burgericon = document.querySelector('.burger');
const slide_wrapp = document.querySelector('.slider_wrapper');
modalcollect.onmouseover = (evnt) => {
    evnt.target === modalcollect || evnt.target === modalborder ? closemodal.classList.add('close_focus') : null;
};
modalcollect.onmouseout = (evnt) => {
    evnt.target === modalcollect || evnt.target === modalborder ? closemodal.classList.remove('close_focus') : null;
};
slide_wrapp.addEventListener('click', modalWindowOpen);
modalcollect.addEventListener('click', modalWindowClose);
burgericon.addEventListener('click', openBurgerMenu);
linksList.addEventListener('click', activate);
function modalWindowOpen(event) {
    console.log('event-target');
    console.log(event.target);
    console.log('event-closest-class');
    console.log(event.target.closest('.slider_card'));
    if (event.target.closest('.slider_card')) {
        modalRenderingFunction(event.target.closest('.slider_card').id);
        console.log(event.target.closest('.slider_card').id);
        modalcollect.firstElementChild.classList.remove('disable');
        modalcollect.classList.remove('disable');
        document.body.classList.add('hide_scroll');
    };
};
function modalRenderingFunction(idcard) {
    console.log(idcard);
    const pullDataset = document.querySelectorAll('[data-pets]');
    pullDataset[0].src = `${basePets[idcard].bigimg}`;
    console.log(pullDataset.item(0));
    console.log(pullDataset[0]);
    for (let elm of pullDataset) {
        elm.textContent = basePets[idcard][elm.dataset.pets];
    };
};
function modalWindowClose(event) {
    console.log('event-target');
    console.log(event.target);
    console.log('event-current-target');
    console.log(event.currentTarget);
    if (event.target.className === 'modal_wrapper' || event.target.className === 'modal_border' || event.target.className === 'modal_close') {
        modalcollect.firstElementChild.classList.add('disable');
        modalcollect.classList.add('disable');
        document.body.classList.remove('hide_scroll');
    };
};
function activate(event) {
    const parent = event.target.parentNode;
    if (parent.classList.contains('list')) {
        for (let child of linksList.children) {
            child.classList.remove('active');
        };
    parent.classList.add('active');
    } else {
        return;
    };
};
function openBurgerMenu(event) {
    console.log('event-target-1');
    console.log(event.target);
    console.log('event-closest-class');
    console.log(event.target.closest('.burger') && !event.target.closest('.burger_active'));
    blockmenu.classList.remove('transition_close');
    if (event.target.closest('.burger')) {
        console.log('toggler-1');
        burgericon.classList.add('burger_active');
        blockmenu.classList.add('transition_open');
        blockmenu.classList.add('nav_menu_open');
        blockmenu.classList.add('blackout');
    } else if (event.target.closest('.burger_active')) {
        console.log('toggler-2');
        burgericon.classList.remove('burger_active');
        blockmenu.classList.remove('nav_menu_open');
        blockmenu.classList.remove('transition_open');
        blockmenu.classList.add('transition_close');
        blockmenu.classList.remove('blackout');
    };
};
function closeBurgerMenu(event) {
    console.log('event-target-2');
    console.log(event.target);
    console.log('event-closest-class');
    console.log(event.target.closest('.list'));
    if (event.target.closest('.list')) {
        console.log('toggler-3');
        blockmenu.classList.remove('blackout');
        burgericon.classList.remove('burger_active');
        blockmenu.classList.remove('nav_menu_open');
        blockmenu.classList.remove('transition_open');
        blockmenu.classList.add('transition_close');
    } else if (event.currentTarget.className === 'wrapper' && event.target.className !== 'menu_list' && !(event.target.classList.contains('nav_menu'))) {
        console.log('toggler-4');
        blockmenu.classList.remove('blackout');
        burgericon.classList.remove('burger_active');
        blockmenu.classList.remove('nav_menu_open');
        blockmenu.classList.remove('transition_open');
        blockmenu.classList.add('transition_close');
    } 
};
blockmenu.onanimationend = (animationEnd) => {
    console.log('Animation End!');
    if (animationEnd.animationName === 'menu_open') {
        startwrapper.addEventListener('click', closeBurgerMenu);
        document.body.classList.add('hide_scroll');
    } else if (animationEnd.animationName === 'menu_close') {
        startwrapper.removeEventListener('click', closeBurgerMenu);
        document.body.classList.remove('hide_scroll');
    };
};