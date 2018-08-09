// plugins
import Swiper from 'swiper';
import superagent from 'superagent';

// rating
import {
  ratingStarChart,
  showRating,  
  ratingSection
} from './rating';

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
  /*
  average: 平勳分數
  counts: 評分數量
  stars (array): 1星 ~ 5 星的評分數量

  list (array): review 內容
  myreview: 已登入使用者的 review 內容
  */

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

/*
superagent.get('./data/rating.json')
.then(res => {

  const data = JSON.parse(res.text);
  
  // basic info: rating
  showRating(data[0],document.querySelector('.basic-info ul'),'li');

  // rating and review section
  ratingSection(data,document.querySelector('.main--content .centerwpr'));

  document.querySelector('.star-container').addEventListener('click',() => {

    document.getElementById('reviewSection').scrollIntoView({ 
      behavior: 'smooth' 
    });

  });

})
.catch(err => {   
   console.log(err);
});
*/

