// plugins
import Swiper from 'swiper';

// dialog
import {loginModal} from './dialog';

// user login, logout
import {userControl} from './user';

// 初始化 | 更新 rating 與 review 相關的內容
import {updateContent} from './update';


// Token
const csrfToken = document.head.querySelector("[name=csrf-token]").content;


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

/* ---------- login modal ---------- */
loginModal(
  document.querySelector('.outerWpr'),
  logingroup
);


/* ---------- user login / logout ---------- */
userControl(
  document.querySelector('.download'),
  userinfo,
  logingroup
);

/* ---------- create rating and review section ---------- */
const rSectionwpr = document.createElement('section');
rSectionwpr.classList.add('review');
rSectionwpr.id = 'reviewSection';

rSectionwpr.innerHTML = '<h2>家長評分與評論</h2>';

document.querySelector('.main--content .centerwpr').appendChild(rSectionwpr);

updateContent(
  screviews,
  userinfo,
  csrfToken,
  true
);