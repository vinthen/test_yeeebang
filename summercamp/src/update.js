import {ratingSum,ratingDetail} from './rating'; // 更新 rating 相關的內容
import {showReview} from './review'; // 更新 review 相關的內容

import {reviewModal,ratingTriggerControl} from './dialog';

export const updateContent = (_screviews,_userinfo,token,init) => { 

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
        _screviews,
        _userinfo,
        document.querySelector('.basic-info ul'),
        'li'
    );

    ratingDetail(
        _screviews,
        document.getElementById('reviewSection')
    )  

    showReview(
        document.getElementById('reviewSection'),
        _screviews,
        token
    );        
    
    reviewModal(
        _screviews,
        document.querySelector('.outerWpr'),
        token
    );

    // 隱藏 revieiw--coupon
    if(_userinfo != null && _userinfo.screviews_counts > 0){
        document.querySelector('.revieiw--coupon').classList.add('hide');
    }

    // rating trigger event
    // open login or review modal (trigger click event)
    ratingTriggerControl(
        document.querySelector('#ratingTrigger'),
        _userinfo
    );

    // update user ybpoint
    updateYBpoint(_userinfo);

    // console.log('content update!');

}

const updateYBpoint = (_userinfo) => {

    if(_userinfo){
        const ybpoints = _userinfo.ybpoints;
        // console.log(ybpoints)
        document.getElementById('ybpointCurrent').textContent = ybpoints;
        document.getElementById('ybpointHint').innerHTML = 
        `您目前有<br />${ybpoints} 藝幫幣`;

    }

}