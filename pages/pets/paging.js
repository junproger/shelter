/* jspaging-junproger */
'use strict';
window.addEventListener('resize', windowInnerWidthSize);
let controlPoinsNumber = null;
let cardRenderingNumber = null;
const blockPagination = document.querySelector('.pagination');
const buttonCollection = document.querySelectorAll('.pagin_button');
const charasCollection = document.querySelectorAll('.pagin_char');
const sliderStripBlock = document.querySelector('.cards_wrapper');
blockPagination.addEventListener('click', moveSliderItems);
const objKeys = ['Pets_1', 'Pets_5', 'Pets_2', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_4', 
'Pets_8', 'Pets_1', 'Pets_5', 'Pets_2', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_4', 'Pets_8', 
'Pets_1', 'Pets_8', 'Pets_2', 'Pets_7', 'Pets_3', 'Pets_6', 'Pets_4', 'Pets_5', 'Pets_5', 
'Pets_4', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_2', 'Pets_8', 'Pets_1'];
const randSet = new Set();
let workArr = [];
function windowInnerWidthSize() {
    let innerWidthSize = window.innerWidth;
    innerWidthSize = window.innerWidth;
        if (innerWidthSize >= 1280) {
            controlPoinsNumber = 8;
            cardRenderingNumber = 6;
            generator(cardRenderingNumber);
            console.log('start 8');
            startCreateElements(controlPoinsNumber);
        } else if (innerWidthSize >= 768) {
            controlPoinsNumber = 6;
            cardRenderingNumber = 8;
            generator(cardRenderingNumber);
            console.log('start 6');
            startCreateElements(controlPoinsNumber);
        } else if (innerWidthSize >= 280) {
            controlPoinsNumber = 3;
            cardRenderingNumber = 16;
            generator(cardRenderingNumber);
            console.log('start 3');
            startCreateElements(controlPoinsNumber);
        };
    console.log(innerWidthSize);
    return innerWidthSize;
};
windowInnerWidthSize();

function startCreateElements(numb) {
    let sliderFrameLength = sliderStripBlock.children.length;
    if (sliderFrameLength < controlPoinsNumber) {
        if ((numb - sliderFrameLength) >= 8) {
            sliderStripBlock.append(setupFragments(8, 0));
        } else if ((numb - sliderFrameLength) >= 6) {
            sliderStripBlock.append(setupFragments(6, 0));
        } else if ((numb - sliderFrameLength) >= 5) {
            sliderStripBlock.append(setupFragments(5, 0));
        } else if ((numb - sliderFrameLength) >= 3) {
            sliderStripBlock.append(setupFragments(3, 0));
        } else if ((numb - sliderFrameLength) >= 2) {
            sliderStripBlock.append(setupFragments(2, 0));
        };
    } else {
        console.log(sliderFrameLength);
        console.log(controlPoinsNumber);
        for (let i = 0; i < (sliderFrameLength - numb); i++) {
            sliderStripBlock.lastElementChild.remove();
            };
        return;
    };
};

function generator(numb) {
    let i = 0;
    workArr = [];
/* FIXED NUMBER !!!!! */
    while (i < numb) {
        let j = 0;
        randSet.clear();
            while (j <= 64) {
                let rand = Math.floor(Math.random() * 32);
                randSet.add(objKeys[rand]);
                j += 1;
            };
        i += 1;
        workArr.push(Array.from(randSet));
    };
};

generator(cardRenderingNumber);

function Counter() {
    let count = 0;
    let start = 0;
    let end = (cardRenderingNumber - 1);
    this.up = function() {
        return ++count;
    };
    this.val = function() {
        console.log(count);
        return count;
    };
    this.set = function() {
        count = end;
        return count;
    };
    this.res = function() {
        count = start;
        return count;
    };
    this.down = function() {
        if (count <= 0) {
            return;
        } else {
        return --count;
        };
    };
};
const counter = new Counter();

function setupFragments(numb, step) {
    console.log('fixing!', numb, step);
    let fragment = document.createDocumentFragment();
    let interval = 0;
    for (let i=1; i<=numb; i++) {
        let item = document.createElement('div');
        item.setAttribute('class', `pets_card`);
        item.setAttribute('id', `${[workArr[step][interval]]}`);
        fragment.append(item);
        interval += 1;
    };
    interval = 0;
    fragment.childNodes.forEach(function(elm) {
        elm.insertAdjacentHTML('beforeend', `<div class="card_image "><img src="${basePets[workArr[step][interval]].img}" class="image_img" alt="img"></div>`);
        elm.insertAdjacentHTML('beforeend', `<div class="card_title">${basePets[workArr[step][interval]].name}</div>`);
        elm.insertAdjacentHTML('beforeend', `<p class="card_button"><button class="learn_more">Learn more</button></p>`);
        console.log(elm);
        interval += 1;
    });
    return fragment;
};

function moveSliderItems(event) {
    if (event.target.closest('.right_next') && counter.val() < (cardRenderingNumber - 1)) {
        counter.up();
        console.log(counter.val());
        turnToRight(counter.val());
        page.textContent = (counter.val() + 1);
    };
    if (event.target.closest('.left_next') && counter.val() > 0) {
        counter.down();
        console.log(counter.val());
        turnToLeft(counter.val());
        page.textContent = (counter.val() + 1);
    };
    if (event.target.closest('.left_start') && counter.val() > 0) {
        counter.res();
        console.log(counter.val());
        turnToLeft(counter.val());
        page.textContent = (counter.val() + 1);
    };
    if (event.target.closest('.right_end') && counter.val() < (cardRenderingNumber - 1)) {
        counter.set();
        console.log(counter.val());
        turnToRight(counter.val());
        page.textContent = (counter.val() + 1);
    };
    if (counter.val() >= (cardRenderingNumber - 1)) {
        buttonCollection[3].classList.remove('default');
        buttonCollection[4].classList.remove('default');
        buttonCollection[3].classList.add('inactive_btn');
        buttonCollection[4].classList.add('inactive_btn');
    } else {
        buttonCollection[3].classList.add('default');
        buttonCollection[4].classList.add('default');
        buttonCollection[3].classList.remove('inactive_btn');
        buttonCollection[4].classList.remove('inactive_btn');
    };
    if (counter.val() > 0) {
        buttonCollection[0].classList.remove('inactive_btn');
        buttonCollection[1].classList.remove('inactive_btn');
        charasCollection[0].classList.remove('inactive_char');
        charasCollection[1].classList.remove('inactive_char');
        buttonCollection[0].classList.add('default');
        buttonCollection[1].classList.add('default');
    } else {
        buttonCollection[0].classList.remove('default');
        buttonCollection[1].classList.remove('default');
        buttonCollection[0].classList.add('inactive_btn');
        buttonCollection[1].classList.add('inactive_btn');
        charasCollection[0].classList.add('inactive_char');
        charasCollection[1].classList.add('inactive_char');
    };
    console.log(counter.val());
};

/* TAKE NOTE !!!! */

function turnToRight(num) {
    console.log('Turn to Right', counter.val());
    let count = 0;
    while (count < controlPoinsNumber) {
        sliderStripBlock.firstElementChild.remove();
        count += 1;
    };
    sliderStripBlock.classList.add('transition_right');
    sliderStripBlock.append(setupFragments(controlPoinsNumber, num));
    blockPagination.removeEventListener('click', moveSliderItems);
};

function turnToLeft(num) {
    console.log('Turn to Left', counter.val());
    let count = 0;
    while (count < controlPoinsNumber) {
        sliderStripBlock.lastElementChild.remove();
        count += 1;
    };
    sliderStripBlock.classList.add('transition_left');
    sliderStripBlock.prepend(setupFragments(controlPoinsNumber, num));
    blockPagination.removeEventListener('click', moveSliderItems);
};

sliderStripBlock.onanimationend = (animationEvent) => {
    console.log('Animation ended!');
    if (animationEvent.animationName === 'page_left') {
    sliderStripBlock.classList.remove('transition_left');
    blockPagination.addEventListener('click', moveSliderItems);
    } else if (animationEvent.animationName === 'page_right') {
    sliderStripBlock.classList.remove('transition_right');
    blockPagination.addEventListener('click', moveSliderItems);
    };
};