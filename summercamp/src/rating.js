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
    const partStar = scoreArr[1];

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
}


/* ---------- basic info rating star ---------- */
export const showRating = (data,wrapper,element) => {

    let average = data.averageRating;
    let max = data.maxRating;
    
    if(average > max){
        average = max;
    }
    
    const el = document.createElement(element);
    
    el.innerHTML = 
    `<strong>評分：</strong>
    <p id="ratingSum">${average} / ${max}<span class="sum">（${data.ratingAmount} 個評分）</span></p>
    <a id="ratingTrigger">我要評分</a>
    `;
    
    wrapper.appendChild(el);
    
    // insert average rating star
    const ratingSum = document.getElementById('ratingSum');
    const parentDiv = ratingSum.parentNode;
    
    parentDiv.insertBefore(
        ratingStarChart(average,max),
        ratingSum
    );
    
}


/* ---------- create rating and review section ---------- */
export const ratingSection = (data,wrapper) => {

    const ratingData = data[0];
    const reviewData = data[1];    

    const sectionwpr = document.createElement('section');
    sectionwpr.classList.add('review');

    sectionwpr.innerHTML = '<h2>Rating & Review Section</h2>';

    wrapper.appendChild(sectionwpr);

    // rating
    const ratingwpr = document.createElement('div');
    ratingwpr.classList.add('ratingSummary');

    let average = ratingData.averageRating;
    let max = ratingData.maxRating;
    
    if(average > max){
        average = max;
    }

    const ratingAmount = ratingData.ratingAmount;
    const starAmount = ratingData.starAmount;

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

}