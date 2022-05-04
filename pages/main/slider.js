/* jsslider-junproger */
'use strict';
window.addEventListener('resize', windowInnerWidthSize);
let controlPoinsNumber = null;
const bodyWrapperBlock = document.querySelector('.wrapper');
const sliderStripBlock = document.querySelector('.slider_stripe');
bodyWrapperBlock.addEventListener('click', moveSliderItems);
const objKeys = ['Pets_1', 'Pets_5', 'Pets_2', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_4', 
'Pets_8', 'Pets_1', 'Pets_5', 'Pets_2', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_4', 'Pets_8'];
const objKeys1 = ['Pets_1', 'Pets_8', 'Pets_2', 'Pets_7', 'Pets_3', 'Pets_6', 'Pets_4', 
'Pets_5', 'Pets_5', 'Pets_4', 'Pets_6', 'Pets_3', 'Pets_7', 'Pets_2', 'Pets_8', 'Pets_1'];
const randSet = new Set();
let workArr = [];
function randomize() {
    return;
};
function generator(numb) {
    let i = 0;
    workArr = [];
    randSet.clear();
    while (i <= 32) {
        let rand = Math.floor(Math.random() * 16);
        randSet.add(objKeys[rand]);
        i += 1;
    };
    let j = 0;
    workArr = Array.from(randSet);
    while (j <= numb) {
    workArr.push(...workArr);
    j += 1;
    };
};
generator(controlPoinsNumber);
function setupFragments(numb, step) {
    let fragment = document.createDocumentFragment();
    let interval = step;
    for (let i=1; i<=numb; i++) {
        let item = document.createElement('div');
        item.setAttribute('class', `slider_card`);
        item.setAttribute('id', `${[workArr[interval]]}`);
        fragment.append(item);
        interval += 1;
    };
    interval = step;
    fragment.childNodes.forEach(function(elm) {
        elm.insertAdjacentHTML('beforeend', `<div class="card_image "><img src="${basePets[workArr[interval]].img}" class="image_img" alt="img"></div>`);
        elm.insertAdjacentHTML('beforeend', `<div class="card_title">${basePets[workArr[interval]].name}</div>`);
        elm.insertAdjacentHTML('beforeend', `<p class="card_button"><button class="learn_more">Learn more</button></p>`);
        console.log(elm);
        interval += 1;
    });
    return fragment;
};
function startCreateElements(numb) {
    let sliderFrameLength = sliderStripBlock.children.length;
    if (sliderFrameLength < controlPoinsNumber) {
        if ((numb - sliderFrameLength) >= 3) {
            sliderStripBlock.append(setupFragments(3, 0));
        } else if ((numb - sliderFrameLength) >= 2) {
            sliderStripBlock.append(setupFragments(2, 0));
        } else if ((numb - sliderFrameLength) >= 1) {
            sliderStripBlock.append(setupFragments(1, 0));
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
function windowInnerWidthSize() {
    let innerWidthSize = window.innerWidth;
    innerWidthSize = window.innerWidth;
        if (innerWidthSize >= 1280) {
            controlPoinsNumber = 3;
            generator(controlPoinsNumber);
            console.log('start 3');
            startCreateElements(controlPoinsNumber);
        } else if (innerWidthSize >= 768) {
            controlPoinsNumber = 2;
            generator(controlPoinsNumber);
            console.log('start 2');
            startCreateElements(controlPoinsNumber);
        } else if (innerWidthSize >= 280) {
            controlPoinsNumber = 1;
            generator(controlPoinsNumber);
            console.log('start 1');
            startCreateElements(controlPoinsNumber);
        };
    console.log(innerWidthSize);
    return innerWidthSize;
};
windowInnerWidthSize();
let fixedCounterNumber = controlPoinsNumber;
function moveSliderItems(event) {
    if (fixedCounterNumber >= workArr.length) {
        fixedCounterNumber = controlPoinsNumber;
        generator(controlPoinsNumber);
    };
    if (event.target.className === 'button_arrow_left') {
    sliderStripBlock.classList.add(('transition_left_' + controlPoinsNumber));
    sliderStripBlock.prepend(setupFragments(controlPoinsNumber, fixedCounterNumber));
    bodyWrapperBlock.removeEventListener('click', moveSliderItems);
    fixedCounterNumber += controlPoinsNumber;
    console.log('Move Left');
    };
    if (event.target.className === 'button_arrow_right') {
    sliderStripBlock.classList.add(('transition_right_' + controlPoinsNumber));
    sliderStripBlock.append(setupFragments(controlPoinsNumber, fixedCounterNumber));
    bodyWrapperBlock.removeEventListener('click', moveSliderItems);
    fixedCounterNumber += controlPoinsNumber;
    console.log('Move Right');
    };
};
sliderStripBlock.onanimationend = (animationEvent) => {
    console.log('Animation ended!');
    if (animationEvent.animationName === ('move_left_' + controlPoinsNumber)) {
    sliderStripBlock.classList.remove(('transition_left_' + controlPoinsNumber));
    let count = 0;
        while (count < controlPoinsNumber) {
            sliderStripBlock.lastElementChild.remove();
            count += 1;
        };
    bodyWrapperBlock.addEventListener('click', moveSliderItems);
    } else if (animationEvent.animationName === ('move_right_' + controlPoinsNumber)) {
    sliderStripBlock.classList.remove(('transition_right_' + controlPoinsNumber));
    let count = 0;
        while (count < controlPoinsNumber) {
            sliderStripBlock.firstElementChild.remove();
            count += 1;
        };
    bodyWrapperBlock.addEventListener('click', moveSliderItems);
    };
};