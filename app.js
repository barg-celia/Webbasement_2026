'use strict';

const unBtn = document.querySelector('.un');
const DeuxBtn = document.querySelector('.deux');
const HuitBtn = document.querySelector('.huit');
const carte = document.querySelector('.carte');

unBtn.addEventListener('click', () => {
    alert('1');
});
DeuxBtn.addEventListener('click', () => {
    alert('2');
});
HuitBtn.addEventListener('click', () => {
    carte.classList.add('color')
});