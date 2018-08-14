// plugins
import Swiper from 'swiper';
// import superagent from 'superagent';
import autosize from 'autosize';
// import * as StarRating from 'star-rating.js';
const StarRating = require('star-rating.js');

// rating
import {
  ratingStarChart,
  showRating,  
  ratingSection
} from './rating';

// dialog
import {
  openModal,
  closeModal,
  loginModal,
  reviewModal
} from './dialog';

/* ---------- swiper image gallery ---------- */
let gallery = new Swiper(".swiper-container", {

  loop: true,
  autoHeight: true,

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },

  pagination: {
    el: '.swiper-pagination',
  }

});

/* ---------- APP download button for mobile ---------- */
let trigger = document.getElementById("hamburger");
let menu = document.querySelector(".download");
let overlay = document.getElementById("downloadOverlay");

trigger.addEventListener("click",toggleDownloadMenu,false);

overlay.addEventListener("click",hideDownloadMenu,false);

document.querySelectorAll(".download--btn").forEach(function(element){
  element.addEventListener("click",hideDownloadMenu,false);
});

// toggle download menu
function toggleDownloadMenu(){

  if(menu.classList.contains("open")){
    menu.classList.remove("open");
    trigger.classList.remove("active");
    overlay.classList.remove("active");
  } else {
    menu.classList.add("open");
    trigger.classList.add("active");
    overlay.classList.add("active");
  }
}

// hide download menu
function hideDownloadMenu(){
  trigger.classList.remove("active");
  menu.classList.remove("open");
  overlay.classList.remove("active");
}

/* ---------- rating ---------- */
{
  // basic info: rating
  showRating(screviews,document.querySelector('.basic-info ul'),'li');

  // rating and review section
  ratingSection(screviews,document.querySelector('.main--content .centerwpr'));
}

document.querySelector('.star-container').addEventListener('click',() => {

  document.getElementById('reviewSection').scrollIntoView({ 
    behavior: 'smooth' 
  });

});

/* ---------- login ---------- */
loginModal(
  document.querySelector('.outerWpr')
);

/* ---------- user rating and review  ---------- */
reviewModal(
  document.querySelector('.outerWpr'),
  campName,
  autosize,
  StarRating
);

// 開啟
/*
document.querySelector('#ratingTrigger').addEventListener('click', () => {
  
  if(userLogin == false){
    // 開啟 Login Modal
    openModal(document.getElementById('loginModal'));
  } else {
    // 開啟 Rating and review Modal
    openModal(document.getElementById('reviewModal'));
  }  
  
});
*/

// 測試用
document.querySelector('#ratingTrigger1').addEventListener('click', () => {
  
  openModal(document.getElementById('loginModal'));
  
});

document.querySelector('#ratingTrigger2').addEventListener('click', () => {
  
  openModal(document.getElementById('reviewModal'));
  
});

