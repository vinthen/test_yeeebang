import {ratingSum,ratingDetail} from './rating'; // 更新 rating 相關的內容
import {showReview} from './review'; // 更新 review 相關的內容

import {reviewModal,ratingTriggerControl} from './dialog';

export const updateContent = (resData,csrfToken,init) => { 

    // init true | false (是否為初始狀態)

    if(!init){    

        let domRatingSum = document.querySelector('li.rating');
        domRatingSum.parentNode.removeChild(domRatingSum);
        domRatingSum = null;

        let domRatingDetail = document.querySelector('.ratingSummary');
        domRatingDetail.parentNode.removeChild(domRatingDetail);
        domRatingDetail = null;

        let domShowReview = document.querySelector('.reviewContainer');
        domShowReview.parentNode.removeChild(domShowReview);
        domShowReview = null;

        let domReviewModal = document.querySelector('#reviewModal');
        domReviewModal.parentNode.removeChild(domReviewModal);
        domReviewModal = null;

    }

    // 根據返回的資料，重新產生相關的內容                    
    ratingSum(
        resData,
        userinfo,
        document.querySelector('.basic-info ul'),
        'li'
    );

    ratingDetail(
        resData,
        document.getElementById('reviewSection')
    )  

    showReview(
        document.getElementById('reviewSection'),
        resData,
        csrfToken
    );        
    
    reviewModal(
        resData,
        document.querySelector('.outerWpr'),
        csrfToken
    );

    // 隱藏 revieiw--coupon
    if(userinfo != null && userinfo.screviews_counts > 0){
        document.querySelector('.revieiw--coupon').classList.add('hide');
    }

    // rating trigger event
    // open login or review modal (trigger click event)
    ratingTriggerControl(
        document.querySelector('#ratingTrigger'),
        userinfo
    );

    console.log('content update!');

}