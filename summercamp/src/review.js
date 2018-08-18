/* ---------- 顯示所有評論 ---------- */
export const showReview = (sectionwpr,screviews,createReviewEntry,ratingStarChart,formateDate) => {

    // sectionwpr: 包含星星數統計與所有評論的 section    
    // screviews: 資料

    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('reviewContainer');

    reviewContainer.innerHTML = '<h3>評論</h3>';

    sectionwpr.appendChild(reviewContainer);

    const reviewEntrywpr = document.createElement('div');
    reviewEntrywpr.classList.add('reviewEntrywpr');

    reviewContainer.appendChild(reviewEntrywpr);

    const maxStar = screviews.stars.length;
    console.log('maxStar: ' + maxStar);

    if(screviews.list.length > 0){
        // 顯示評論條目
        screviews.list.forEach((listItem) => {
            createReviewEntry(
                listItem,
                maxStar,
                reviewEntrywpr,
                false,
                ratingStarChart,
                formateDate
            );
        });

    } else {
        // 目前尚無評論  
        const hint = document.createElement('div');
        hint.classList.add('reviewEntry');
        hint.innerHTML = 
        `<p>目前尚無評論</p>`;

        reviewContainer.appendChild(hint);
    }

    // 目前登入使用者的評論
    if(screviews.myreview){
        // console.log('目前登入使用者有評論');
        const myreviewEntry = document.createElement('div');
        myreviewEntry.classList.add('myreviewEntry');

        createReviewEntry(
            screviews.myreview,
            maxStar,
            myreviewEntry,
            true,
            ratingStarChart,
            formateDate
        );

        reviewContainer.insertBefore(myreviewEntry, reviewEntrywpr);

    }

} //showReview


/* ----- 產生單筆評論條目 ----- */
export const createReviewEntry = (data,maxStar,container,myReview,ratingStarChart,formateDate) => {

    // data: "單筆"評論的資料

    // container: reviewEntrywpr，所有條目的 container

    // myReview: true / false
    // 設定要產生的是否為 myreview

    // formateDate: 轉換日期格式 helper

    const reviewEntry = document.createElement('div');
    reviewEntry.classList.add('reviewEntry');

    reviewEntry.setAttribute('data-id', data.id);

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

    // add delete and edit button
    if(myReview){
        const userBtnwpr = document.createElement('div');
        userBtnwpr.classList.add('reviewEntry--userBtnwpr');
        userBtnwpr.innerHTML = 
        `<div class="reviewEntry--delete" data-reviewid="${data.id}">刪除</div>
        <div class="reviewEntry--edit" data-reviewid="${data.id}">編輯</div>`;            

        const entryContent = reviewEntry.querySelector('.reviewEntry--content');
        entryContent.appendChild(userBtnwpr);
    }    

    container.appendChild(reviewEntry);

} // createReviewEntry


/* ---------- 刪除自己的評論 ---------- */
export const deleteReview = (event,csrfToken,superagent) => {
  
    const entryID = event.target.dataset.reviewid;
    
    superagent
        .post('/summercamp/screview')                
        .set('X-CSRF-TOKEN', csrfToken)
        .send({
            sc_id: screviews['sc_id'],
            crud: 'd',
            screview_id: entryID,
        })
        .then(res => {
            console.log(JSON.parse(res.text));

            // 測試用，force reload
            window.location.reload(true);
        })
        .catch(err => {
            console.log(err);                    
        });    
} // deleteReview