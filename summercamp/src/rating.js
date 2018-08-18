/* ---------- 產生 rating star chart ---------- */
export const ratingStarChart = (average,max) => {

    if(!average){
        average = 0;
    }

    if(!max){
        max = 5;
    }
        
    if(average > max){
        average = max;
    } else if(average < 0){
        average = 0;
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


/* ---------- basic info rating sum ---------- */
export const ratingSum = (screviews,userinfo,wrapper,element) => {

    // 分數
    // let average = data.average;
    let average = 0;
    if(screviews.average){
        average = screviews.average;
    }

    let max = 5;
    if(screviews.stars){
        max = screviews.stars.length;
    }
    
    if(average > max){
        average = max;
    } else if(average < 0){
        average = 0;
    }

    // 評分數    
    let counts = screviews.counts;
    let countsText = null;
    if(counts > 0){
        countsText = `${counts} 個評分`;
    } else{
        countsText = '尚未有人評分'
    }
    
    // 評分按鈕文字
    let triggerText = '';
    if(!userinfo){
        triggerText = '登入後即可評分';
    } else {

        if(screviews.myreview){
            triggerText = '編輯我的評分';
        } else {
            triggerText = '新增評分';
        }
    }

    const el = document.createElement(element);
    el.classList.add('rating');
    
    el.innerHTML = 
    `<strong>評分：</strong>
    <p id="ratingSum">${average} / ${max}<span class="sum">（${countsText}）</span></p>
    <a id="ratingTrigger">${triggerText}</a>
    `;
    
    wrapper.appendChild(el);
    
    // insert average rating star
    const ratingSum = el.querySelector('#ratingSum');
    
    el.insertBefore(
        ratingStarChart(average,max),
        ratingSum
    );

    // 捲動到 reviewSection
    el.querySelector('.star-container').addEventListener('click',() => {
        document.getElementById('reviewSection').scrollIntoView({ 
            behavior: 'smooth' 
        });    
    });
    
} // ratingSum


/* ---------- ratingDetail ---------- */
export const ratingDetail = (data,sectionwpr) => {

    // rating
    const ratingwpr = document.createElement('div');
    ratingwpr.classList.add('ratingSummary');

    // let average = data.average;
    let average = 0;
    if(data.average){
        average = data.average;
    }
    // let max = data.stars.length;  
    let max = 5;

    let ratingAmount = 0;
    let starAmount = [0,0,0,0,0];

    if(data.stars){
        max = data.stars.length;
        starAmount = data.stars.reverse(); // [5星, 4星 ,3星, 2星, 1星]
        ratingAmount = data.counts;
    }
    
    if(average > max){
        average = max;
    } else if(average < 0){
        average = 0;
    }

    // const ratingAmount = data.counts;
    // const starAmount = data.stars.reverse(); // [5星, 4星 ,3星, 2星, 1星]

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

    // bar chart and percent
    for(let i = 0; i < max; i++){
        const el = document.createElement('div');
        el.classList.add('rates-entry');

        let percent = (starAmount[i] / ratingAmount) * 100;
        if(isNaN(percent)){
            percent = 0;
        }

        el.innerHTML = 
        `<div class="rates--star__text">${max - i}星</div>
        <div class="rates--slot">
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

} // ratingDetail




