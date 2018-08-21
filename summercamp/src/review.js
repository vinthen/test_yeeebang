import {ratingStarChart} from './rating'; // 畫 star rating 星星
import {formateDate} from './helper'; // 轉換日期格式
import {openModal} from './dialog'; // 開啟 modal

import {updateContent} from './update'; // 更新內容

import superagent from 'superagent';
import autosize from 'autosize';

/* ---------- 顯示所有評論 ---------- */
export const showReview = (
    sectionwpr, // sectionwpr: 包含星星數統計與所有評論的 section
    _screviews, // screviews: 資料
    token // token
) => {

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('reviewContainer'); 

    sectionwpr.appendChild(reviewContainer);

    const reviewEntrywpr = document.createElement('div');
    reviewEntrywpr.classList.add('reviewEntrywpr');

    reviewEntrywpr.innerHTML = `<h4>所有評論</h4>`;

    reviewContainer.appendChild(reviewEntrywpr);

    // 最大星星數
    let maxStar = 5;
    if(_screviews.stars){
        maxStar = _screviews.stars.length;
    }

    if(_screviews.list.length > 0){
        // 顯示評論條目
        _screviews.list.forEach((listItem) => {
            createReviewEntry(
                listItem,
                maxStar,
                reviewEntrywpr,
                false
            );
        });

    } else {
        // 目前尚無評論  
        const hint = document.createElement('div');
        hint.classList.add('reviewEntry');
        hint.innerHTML = '<p>目前尚無評論</p>';

        reviewContainer.appendChild(hint);
    }

    // 目前登入使用者的評論
    if(_screviews.myreview){
        // 目前登入使用者有評論
        const myreviewEntry = document.createElement('div');
        myreviewEntry.classList.add('myreviewEntry');

        myreviewEntry.innerHTML = '<h4>我的評論</h4>';

        createReviewEntry(
            _screviews.myreview,
            maxStar,
            myreviewEntry,
            true
        );

        reviewContainer.insertBefore(myreviewEntry, reviewEntrywpr);
        
        // add event listener for button        
        // 刪除評分與評論
        myreviewEntry.querySelector('.reviewEntry--delete')
        .addEventListener('click',(event) => {

            deleteReview(event,_screviews,token);

        });

        // 編輯評論
        myreviewEntry.querySelector('.reviewEntry--edit').addEventListener('click',(event) => {
            openModal(document.getElementById('reviewModal'));
            autosize.update(document.getElementById('reviewModalInput'));

            // console.log('edit btn');
        });
        

    }

} //showReview


/* ----- 產生單筆評論條目 ----- */
export const createReviewEntry = (
    data, // "單筆"評論的資料
    maxStar, // 最大星星數
    container, // reviewEntrywpr，所有條目的 container
    myReview // true | false 設定要產生的是否為 myreview
) => {

    const reviewEntry = document.createElement('div');
    reviewEntry.classList.add('reviewEntry');

    reviewEntry.setAttribute('data-id', data.id);

    // 轉換後的日期格式
    const outputDate = formateDate(data.updated_at);

    reviewEntry.innerHTML = 
    `<div class="reviewEntry--avatar">
        <div class="imgwpr">
            <img src="${data.avatar}" />              
        </div>
    </div>
    <div class="reviewEntry--content">
        <div class="user">
            <div class="name">${data.name}</div>
            <div class="user--group">
                <div class="rating"></div>                    
                <div class="date">${outputDate}</div>
            </div>
        </div>
        <div class="text">${data.review}</div>            
    </div>`;

    // add rating star
    const rating = ratingStarChart(data.scores,maxStar);          
    const ratingwpr = reviewEntry.querySelector('.rating');
    ratingwpr.appendChild(rating);

    const entryContent = reviewEntry.querySelector('.reviewEntry--content');

    // 如果是 myreview，則需要加上刪除與編輯按鈕    
    if(myReview){
        const userBtnwpr = document.createElement('div');
        userBtnwpr.classList.add('reviewEntry--userBtnwpr');
        userBtnwpr.innerHTML = 
        `<div class="reviewEntry--delete" data-reviewid="${data.id}">刪除</div>
        <div class="reviewEntry--edit" data-reviewid="${data.id}">編輯</div>`;            

        // const entryContent = reviewEntry.querySelector('.reviewEntry--content');
        entryContent.appendChild(userBtnwpr);
    } else {
        // 如果是一般評論，要加上檢舉的選項
        const report = document.createElement('div');
        report.classList.add('report');
        report.innerHTML = 
        `<div class="report--trigger">
            <div class="report--icon"></div>
        </div>
        <div class="report--menu deselect">            
            <h5>檢舉此則評論</h5>
            <div class="report--hint">
                <div class="report--loginbtn">
                    <i class="fas fa-user"></i>登入
                </div>
            </div>
            <div class="report--option">
                <div class="report--reason" data-id="${data.id}" data-reason="1">沒有幫助</div>
                <div class="report--reason" data-id="${data.id}" data-reason="2">內容不當</div>
                <div class="report--reason" data-id="${data.id}" data-reason="3">垃圾內容</div>
            </div>    
            <div class="report--footer">
                <div class="report--btn cancel">取消</div>
                <div class="report--btn submit">送出</div>
            </div>
        </div>
        <div class="report--feedback">檢舉已送出，謝謝您</div>
        `;

        // reviewEntry.appendChild(report);
        entryContent.appendChild(report);

    }    

    container.appendChild(reviewEntry);

} // createReviewEntry


/* ---------- 刪除自己的評論 ---------- */
export const deleteReview = (event,_screviews,token) => {
  
    const entryID = event.target.dataset.reviewid;
    
    superagent
        .post('/summercamp/screview')                
        .set('X-CSRF-TOKEN', token)
        .send({
            sc_id: _screviews.sc_id,
            crud: 'd',
            screview_id: entryID,
        })
        .then(res => {

            const resData = JSON.parse(res.text).data;
            // if(screviews){
            //     screviews = null; 
            // }       
                 
            updateContent(
                resData.screviews,
                resData.userinfo,
                token,
                false
            );      
          
            // 測試用，force reload
            // window.location.reload(true);
        })
        .catch(err => {
            console.log(err);                    
        });    
} // deleteReview