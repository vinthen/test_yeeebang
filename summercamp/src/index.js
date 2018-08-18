// plugins
import Swiper from 'swiper';

// rating
import {
  ratingSum,  
  ratingDetail
} from './rating';

// review
import {
  showReview
} from './review';

// dialog
import {
  ratingTriggerControl,
  loginModal,
  reviewModal
} from './dialog';

// user login, logout
import {
  userControl
} from './user';


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

/* ---------- create rating and review section ---------- */
const rSectionwpr = document.createElement('section');
rSectionwpr.classList.add('review');
rSectionwpr.id = 'reviewSection';

rSectionwpr.innerHTML = '<h2>家長評分與評論</h2>';

document.querySelector('.main--content .centerwpr').appendChild(rSectionwpr);


/* ---------- rating ---------- */
// basic info: rating sum
ratingSum(
  screviews,
  userinfo,
  document.querySelector('.basic-info ul'),
  'li'
);

// rating detail
ratingDetail(
  screviews,
  document.getElementById('reviewSection')
)

/* ---------- review section ---------- */
showReview(
  document.getElementById('reviewSection'),
  screviews,
  csrfToken
);


/* ---------- login modal ---------- */
loginModal(
  document.querySelector('.outerWpr'),
  logingroup
);

/* ---------- user rating and review modal ---------- */
reviewModal(
  screviews,
  document.querySelector('.outerWpr'),
  csrfToken
);

// 隱藏 revieiw--coupon
if(userinfo != null && userinfo.screviews_counts > 0){
  document.querySelector('.revieiw--coupon').classList.add('hide');
}

// open login / review modal (trigger click event)
ratingTriggerControl(
  document.querySelector('#ratingTrigger'),
  userinfo
);

/* ---------- user login / logout ---------- */
userControl(
  document.querySelector('.download'),
  userinfo,
  logingroup
);
