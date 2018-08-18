// plugins
import Swiper from 'swiper';
import superagent from 'superagent';
import autosize from 'autosize';

const StarRating = require('star-rating.js');

// rating
import {
  ratingStarChart,
  ratingSum,  
  ratingDetail
} from './rating';

// review
import {
  showReview,
  createReviewEntry,
  deleteReview
} from './review';

// dialog
import {
  openModal,
  closeModal,
  loginModal,
  reviewModal,
  loadMyreviewContent
} from './dialog';

// user login, logout
import {
  userControl
} from './user';

// helpers
import {
  formateDate,
  characterCountCheck
} from './helper';


// Token
const csrfToken = document.head.querySelector("[name=csrf-token]").content;

const campName = screviews.sc_name;

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
{
  // basic info: rating sum
  ratingSum(
    screviews,
    userinfo,
    document.querySelector('.basic-info ul'),
    'li'
  );

  // rating and review section
  ratingDetail(
    screviews,
    rSectionwpr
  )
  // ratingSection(screviews,document.querySelector('.main--content .centerwpr'));
}

document.querySelector('.star-container').addEventListener('click',() => {

  document.getElementById('reviewSection').scrollIntoView({ 
    behavior: 'smooth' 
  });

});

/* ---------- review section ---------- */
showReview(
  rSectionwpr,
  screviews,
  createReviewEntry,
  ratingStarChart,
  formateDate
)


/* ---------- login modal ---------- */
loginModal(
  document.querySelector('.outerWpr'),
  logingroup
);

/* ---------- user rating and review modal ---------- */
reviewModal(
  document.querySelector('.outerWpr'),
  campName,
  superagent,
  autosize,
  StarRating,
  csrfToken,
  screviews.myreview,
  loadMyreviewContent,
  characterCountCheck
);

// 隱藏 revieiw--coupon
if(userinfo.screviews_counts > 0){
  document.querySelector('.revieiw--coupon').classList.add('hide');
}

// open login / review modal
document.querySelector('#ratingTrigger').addEventListener('click', (event) => {
  
  if(!userinfo){
    // 開啟 Login Modal
    openModal(document.getElementById('loginModal'));
  } else {
    // 開啟 Rating and review Modal
    openModal(document.getElementById('reviewModal'));
    // update textarea autosize
    autosize.update(document.getElementById('reviewModalInput'));
  }  
  
});

/* ---------- user login / logout ---------- */
userControl(
  document.querySelector('.download'),
  userinfo,
  logingroup
);

document.querySelector('#ucLoginbtn').addEventListener('click', () => {
  // 開啟 Login Modal  
  openModal(document.getElementById('loginModal'));
  
});

/* ---------- 刪除與編輯評論 ---------- */
if(screviews.myreview) {

  // 刪除評分與評論
  document.querySelector('.reviewEntry--delete').addEventListener('click',(event) => {
    deleteReview(
      event,
      csrfToken,
      superagent
    );
  });

  // 編輯評論
  document.querySelector('.reviewEntry--edit').addEventListener('click',(event) => {
    openModal(document.getElementById('reviewModal'));
    autosize.update(document.getElementById('reviewModalInput'));
  });

}

