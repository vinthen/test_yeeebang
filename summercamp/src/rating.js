/* ---------- show rating star chart ---------- */
export const ratingStarChart = (average,max) => {
        
    if(average > max){
        average = max;
    }
    
    // 將星星數轉為字串
    const scoreStr = average.toString();
    // 取得小數點前後的數字
    const scoreArr = scoreStr.split('.');

    // 小數點前，完整的星星數
    let fullStar = scoreArr[0];
    // 小數點後，部分星星
    let partStar = 0;
    if(scoreArr.length > 1) {
        partStar = scoreArr[1];
    }

    const container = document.createElement("div");
    container.classList.add("star-container");

    for(let i = 0; i < max; i++){
        const starWpr = document.createElement("div");
        starWpr.classList.add("star-wpr");

        starWpr.innerHTML = `<i></i>`;

        container.appendChild(starWpr);
    }

    setTimeout(() => {
        const starwpr = container.querySelectorAll('.star-wpr');   

        if(average < max && average > 0){

            for(let i = 0; i <= fullStar*1; i++){
                starwpr[i].classList.add('checked');
            }     
            starwpr[fullStar*1].querySelector('i').style.width = `${(partStar / 10) * 100}%`;       

        } else if (average == max && average > 0) {

            starwpr.forEach((el) => {
                el.classList.add('checked');
            });

        }   

    },0);  
    
    return container; 
} // ratingStarChart


/* ---------- basic info rating star ---------- */
export const showRating = (data,wrapper,element) => {

    let average = data.average;
    let max = data.stars.length;
    
    if(average > max){
        average = max;
    }
    
    const el = document.createElement(element);
    
    el.innerHTML = 
    `<strong>評分：</strong>
    <p id="ratingSum">${average} / ${max}<span class="sum">（${data.counts} 個評分）</span></p>
    <a id="ratingTrigger1">評分測試 (未登入)</a>
    <a id="ratingTrigger2" style="margin-left:10px;">評分測試 (已登入)</a>
    `;
    
    wrapper.appendChild(el);
    
    // insert average rating star
    const ratingSum = el.querySelector('#ratingSum');
    
    el.insertBefore(
        ratingStarChart(average,max),
        ratingSum
    );
    
} //showRating


/* ---------- create rating and review section ---------- */
export const ratingSection = (data,wrapper) => {

    // rating data
    // const ratingData = data[0];

    // 最大星星數
    const maxStar = data.stars.length;
    
    // review data
    const reviewAmount = data.list.length;
    let reviewData = 0;
    
    if(reviewAmount > 0) {
        reviewData = data.list;
    }
    

    const sectionwpr = document.createElement('section');
    sectionwpr.classList.add('review');
    sectionwpr.id = 'reviewSection';

    sectionwpr.innerHTML = '<h2>家長評分與評論</h2>';

    wrapper.appendChild(sectionwpr);

    // rating
    const ratingwpr = document.createElement('div');
    ratingwpr.classList.add('ratingSummary');

    let average = data.average;
    let max = data.stars.length;  
    
    if(average > max){
        average = max;
    }

    const ratingAmount = data.counts;
    const starAmount = data.stars.reverse(); // [5星, 4星 ,3星, 2星, 1星]

    ratingwpr.innerHTML = 
    `<div class="ratingSummary--avg">
        <div class="ratingSummary--avg__number">${average}</div>
    </div>
    <div class="ratingSummary--rates"></div>`;

    sectionwpr.appendChild(ratingwpr);

    ratingwpr.querySelector('.ratingSummary--avg').appendChild(
        ratingStarChart(average,max)
    )

    const ratesWpr = ratingwpr.querySelector('.ratingSummary--rates');

    for(let i = 0; i < max; i++){
        const el = document.createElement('div');
        el.classList.add('rates-entry');

        const percent = (starAmount[i] / ratingAmount) * 100;

        el.innerHTML = 
        `<div class="rates--slot">
            <div class="rates--bar" style="width:${percent.toFixed(1)}%;"></div>
        </div>
        <div class="rates--star"></div>
        <div class="rates--percent">${percent.toFixed(0)}%</div>
        `;

        ratesWpr.appendChild(el);

        for(let i = 0; i < max; i++){

            const icon = document.createElement('i')
            icon.classList.add('star');

            el.querySelector('.rates--star').appendChild(icon);
        }
    }

    // 標註星星數
    const rateStarSet = ratesWpr.querySelectorAll('.rates--star');  

    rateStarSet.forEach((item,index) => {

        const star = item.querySelectorAll('.star');

        for(let i = 0; i < (max - index); i++){
            star[i].classList.add('checked');
        }
    })


    // review
    const reviewContainer = document.createElement('div');
    reviewContainer.classList.add('reviewContainer');

    reviewContainer.innerHTML = '<h3>評論</h3>';

    sectionwpr.appendChild(reviewContainer);

    const reviewEntrywpr = document.createElement('div');
    reviewEntrywpr.classList.add('reviewEntrywpr');

    reviewContainer.appendChild(reviewEntrywpr);

    if(reviewAmount == 0){
        // 目前尚無評論  
        const hint = document.createElement('div');
        hint.classList.add('reviewEntry');
        hint.innerHTML = 
        `<p>目前尚無評論</p>`;

        reviewContainer.appendChild(hint);

    } else {
        // 顯示評論條目
        reviewData.forEach((listItem) => {

            createReviewEntry(listItem,reviewEntrywpr);

        });
    }

    // 目前登入使用者的評論
    if(data.myreview){
        // console.log('目前登入使用者有評論');
        const myreviewEntry = document.createElement('div');
        myreviewEntry.classList.add('myreviewEntry');

        createReviewEntry(data.myreview,myreviewEntry);

        reviewContainer.insertBefore(myreviewEntry, reviewEntrywpr);

    }


    /* ----- 產生評論條目內容 ----- */
    function createReviewEntry(data,container){

        const reviewEntry = document.createElement('div');
        reviewEntry.classList.add('reviewEntry');
    
        const date = formateDate(data.updated_at);

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
                    <div class="date">${date}</div>
                </div>
            </div>
            <div class="text">${data.review}</div>
        </div>`;

        // add rating star
        const rating = ratingStarChart(data.scores,maxStar);          
        const ratingwpr = reviewEntry.querySelector('.rating');
        ratingwpr.appendChild(rating);    

        container.appendChild(reviewEntry);

    } // createReviewEntry

    /* ----- 日期格式改為 2018/8/10 ----- */
    function formateDate(source){

        const dataArray = source.split(' ');
        const date = dataArray[0];
        const dateArray = date.split('-');

        return `${dateArray[0]}年${dateArray[1].replace(/^0+/, '')}月${dateArray[2].replace(/^0+/, '')}日`;

    } // formateDate

} // ratingSection