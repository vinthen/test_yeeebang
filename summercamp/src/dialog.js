import StarRating from 'star-rating.js';
import autosize from 'autosize';
import superagent from 'superagent';

import {updateContent} from './update'; // 更新內容

import {characterCountCheck} from './helper'; // 計算去掉空白後的字數

/* ---------- Open Modal ---------- */
export const openModal = (modal) => {

    modal.classList.add('active');

} // openModal

/* ---------- Close Modal ---------- */
export const closeModal = (modal) => {

    if(modal.classList.contains('active')){
        modal.classList.remove('active');
    }   

} // closeModal

/* ---------- Rating Trigger Eventlistener ---------- */
export const ratingTriggerControl = (trigger,userinfo) => {

    trigger.addEventListener('click', () => {
  
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

} // ratingTriggerControl

/* ---------- login Modal ---------- */
export const loginModal = (container,loginUrl) => {

    const wrapper = document.createElement('div');
    wrapper.id = 'loginModal';
    wrapper.classList.add('modal');

    wrapper.innerHTML = 
    `<div class="modal--overlay"></div>
    <div class="modal--container">
        <div class="modal--header">
            <h1>使用社群帳號登入才藝幫</h1>
        </div>
        <div class="modal--content">                      
            <div class="userType">
                <h3>
                    <i class="fas fa-asterisk"></i>
                    請選擇您的身分：
                    <span id="userSelectedType"></span>
                </h3>
                <div class="login-btnwpr">
                    <div class="loginTypeBtn general" data-user-type="general">一般</div>
                    <div class="loginTypeBtn manager" data-user-type="manager">才藝班班主任</div>
                </div>                        
                <div id="userTypeHint">您尚未選擇身分</div>
            </div>
            <div class="login-btnwpr socialLogin">
                <a class="loginbtn login-facebook" id="loginbtnFB">
                    <i class="fab fa-facebook-f"></i>使用 Facebook 帳號登入
                </a>
                <a class="loginbtn login-google" id="loginbtnGoogle">
                    <i class="fab fa-google"></i>使用 Google 帳號登入
                </a>
            </div>
        </div>  
        <div class="modal--footer">
            <div class="item">
            <i class="fas fa-genderless"></i>
                <p>以上登入只作為身分認證之用，我們不會在您的社群網站張貼任何文章。</p>
            </div>
            <div class="item">
            <i class="fas fa-chevron-right"></i>
                <p>登入即表示您同意<a id="loginModalLinkTerms" target="_blank">使用條款</a>，檢視<a id="loginModalLinkPrivacy" target="_blank">隱私權政策</a>。
                </p>
            </div>
        </div>  
    </div>
    `;

    container.appendChild(wrapper);

    /* ----- 選擇身分別 ----- */
    let userSelectType = null;    

    const loginTypeBtns = wrapper.querySelectorAll('.loginTypeBtn');

    /* ---------- */
    // 條款與政策
    const loginModalLinkTermsEl = wrapper.querySelector('#loginModalLinkTerms');
    const loginModalLinkPrivacyEl = wrapper.querySelector('#loginModalLinkPrivacy');

    // 一般條款的連結
    let linkGeneralTerms = '/about/yeeebang_tc_terms?general';
    let linkGeneralPrivacy = '/about/yeeebang_tc_rules?general';

    // 班主任條款的連結
    let linkManagerTerms = '/about/yeeebang_tc_terms?manager';
    let linkManagerPrivacy = '/about/yeeebang_tc_rules?manager';

    // 預設顯示一般條款連結
    loginModalLinkTermsEl.href = linkGeneralTerms;
    loginModalLinkPrivacyEl.href = linkGeneralPrivacy;
    
    // 沒有選擇身分別時的提示文字
    const userTypeHint = wrapper.querySelector('#userTypeHint');
    /* ---------- */

    /* ---------- */
    // 登入按鈕
    const loginbtnFB = wrapper.querySelector('#loginbtnFB');
    const loginbtnGoogle = wrapper.querySelector('#loginbtnGoogle');

    // Facebook login Link
    const loginLinkFBgeneral = loginUrl['0'][0];
    const loginLinkFBmanager = loginUrl['1'][0];

    // Google Login link
    const loginLinkGoogleGeneral = loginUrl['0'][1];
    const loginLinkGoogleManager = loginUrl['1'][1];
    /* ---------- */

    // 選擇登入的身分別
    loginTypeBtns.forEach((btn) => {

        btn.addEventListener('click',(event) => {

            loginTypeBtns.forEach((element) => {
                if(element.classList.contains('selected')){
                    element.classList.remove('selected');
                }
            });
         
            event.target.classList.add('selected');

            // user type 資訊 (不能在此時就送出)
            // console.log(btn.dataset.userType);

            const type = event.target.dataset.userType;
            let typeText = '';

            switch(type){
                case 'general':
                    typeText = '一般';

                    // 登入按鈕連結
                    loginbtnFB.href = loginLinkFBgeneral;
                    loginbtnGoogle.href = loginLinkGoogleGeneral;
                    
                    // 政策與條款連結
                    loginModalLinkTermsEl.href = linkGeneralTerms;
                    loginModalLinkPrivacyEl.href = linkGeneralPrivacy;
                    break;

                case 'manager':
                    typeText = '才藝班班主任';

                    // 登入按鈕連結
                    loginbtnFB.href = loginLinkFBmanager;
                    loginbtnGoogle.href = loginLinkGoogleManager;

                    // 政策與條款連結
                    loginModalLinkTermsEl.href = linkManagerTerms;
                    loginModalLinkPrivacyEl.href = linkManagerPrivacy;
                    break;
            }
           
            wrapper.querySelector('#userSelectedType').textContent = typeText;

            userSelectType = type;

            if(userTypeHint.classList.contains('show')){
                userTypeHint.classList.remove('show');
            }
      
        });

    });

    /* ----- 在按下社群登入按鈕之前，檢查是否已經選擇身分別 ----- */ 
    wrapper.querySelectorAll('.loginbtn').forEach((btn) => {

        btn.addEventListener('click',(event) => {
            if(!userSelectType){
                // 還沒選擇的話顯示提示
                event.preventDefault();
                // console.log('還沒選擇身分');
                userTypeHint.classList.add('show');


            } else {

                // 在此送出 user type 資訊
                console.log(userSelectType);
                // event.preventDefault();

            }
        });

    });

    /* ----- 關閉 ----- */
    wrapper.querySelector('.modal--overlay').addEventListener('click',() => {
        closeModal(wrapper);          
    });

} // loginModal


/* ---------- User rating and review Modal ---------- */
export const reviewModal = (
    screviews,
    container,
    token
) => {

    const wrapper = document.createElement('div');
    wrapper.id = 'reviewModal';
    wrapper.classList.add('modal');

    wrapper.innerHTML = 
    `<div class="modal--overlay"></div>
    <div class="modal--container">
        <div class="modal--header">
            <h1>新增評分與評論</h1>
            <h2>夏令營：${screviews.sc_name}</h2>
        </div>
        <div class="modal--content">  
        
            <h3>評分：<span id="userSelectRatingText">尚未評分</span></h3>
            <div class="review--ratingwpr">
                <form id="starRatingForm">
                    <select class="star-rating">
                        <option value="">Select a rating</option>
                        <option value="5">Excellent</option>
                        <option value="4">Very Good</option>
                        <option value="3">Average</option>
                        <option value="2">Poor</option>
                        <option value="1">Terrible</option>
                    </select>
                </form>
            </div>

            <h3>評論：</h3>
            <div class="review--textwpr">
                <textarea id="reviewModalInput"></textarea>
            </div>

            <div class="revieiw--coupon">
                <h4><i class="fas fa-thumbs-up"></i>評分夏令營送好康</h4>
                <p>第一次評分夏令營且評論超過十個字，即贈送才藝幫點數 100 點，將可抵扣課程或活動費用！</p>
                <div class="hint">您目前的字數：
                    <span class="hint--count">0</span>
                    <span class="hint--qualified">(已符合贈送資格)</span>
                </div>
            </div>
        </div> 
        <div class="modal--footer">                          
            <div class="btnwpr">
                <button class="cancel">取消</button>
                <button class="submit">送出</button>           
            </div>
        </div>  

    </div>
    `;

    container.appendChild(wrapper);

    
    // 最大星星數
    let maxStarValue = 5;
    if(screviews.stars){
        maxStarValue = screviews.stars.length;
    }

    // star rating (use StarRating plugin)
    const starRatingEl = wrapper.querySelector('.star-rating');
    let starRatingControls = new StarRating(starRatingEl,{ 
        maxStars: maxStarValue,
        showText: false
    });

    // 使用者選擇的星星數
    let userSelectRatingScore = 0;

    let userSelectRatingText = wrapper.querySelector('#userSelectRatingText');

    starRatingEl.addEventListener('change',(event) => {
        
        // 取得使用者選擇的星星數
        userSelectRatingScore = event.target.value;    

        if(userSelectRatingScore != ''){
            userSelectRatingText.textContent = `${userSelectRatingScore} 星`;
        } else {
            userSelectRatingText.textContent = '尚未評分';
        }
    });


    // 文字輸入框
    const reviewModalInput = wrapper.querySelector('#reviewModalInput');

    // autosize
    autosize(reviewModalInput);

    // 計算輸入的字數
    const hintCount = wrapper.querySelector('.hint--count');
    const hintQualified = wrapper.querySelector('.hint--qualified');

    reviewModalInput.addEventListener('input', (event) => {

        characterCountCheck(
            event.target,
            hintCount,
            hintQualified
        ); 

    });

    // 如果已經存在 myrevuew，帶入資料
    if(screviews.myreview){

        wrapper.querySelector('.modal--header h1').textContent = '編輯評分與評論';

        loadMyreviewContent(
            screviews,                 
            starRatingEl,
            starRatingControls,
            reviewModalInput,        
            hintCount,
            hintQualified
        );
        
    }

    /* ----- overlay 關閉 ----- */
    wrapper.querySelector('.modal--overlay').addEventListener('click',() => {
        closeModal(wrapper);
    });

    /* ----- 取消：關閉並清除已輸入的內容 ----- */
    wrapper.querySelector('.cancel').addEventListener('click',() => {

        // 清除星星
        wrapper.querySelector('#starRatingForm').reset();
        userSelectRatingScore = 0;
        userSelectRatingText.textContent = '尚未評分';
        
        // 清除 textarea
        reviewModalInput.value = '';  

        // reset, 帶入 myreview 內容
        if(screviews.myreview){
            loadMyreviewContent(
                screviews,                 
                starRatingEl,
                starRatingControls,
                reviewModalInput,        
                hintCount,
                hintQualified
            );
        }

        closeModal(wrapper);
    });

    /* ----- 送出，關閉並送出已輸入的內容 ----- */
    wrapper.querySelector('.submit').addEventListener('click',(event) => {
        
        if(userSelectRatingScore >= 1 && reviewModalInput.value.length > 1){

            // console.log('評分數：' + userSelectRatingScore);
            // console.log('評論內容：' + reviewModalInput.value);

            let sendContent = {
                sc_id: screviews['sc_id'],
                crud: '',
                scores: userSelectRatingScore,
                review: reviewModalInput.value
            };

            if(screviews.myreview){
                // 如果 myreview 已存在，則更新評論內容
                // update             
                sendContent.crud = 'u';
                sendContent.screview_id = screviews.myreview.id;

            } else {
                // myreview 不存在，新增評論
                // create           
                sendContent.crud = 'c';
            }

            superagent
                .post('/summercamp/screview')                
                .set('X-CSRF-TOKEN', token)
                .send(sendContent)
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

            closeModal(wrapper);     

        } else {
            event.preventDefault();
            console.log('無內容或內容不完整');
        }

        
    });


} // reviewModal


/* ---------- 帶入 myreview 內容 ---------- */
export const loadMyreviewContent = (
    screviews,

    starRatingEl,
    starRatingControls,
    
    reviewModalInput,
    hintCount,
    hintQualified
) => {

    // 帶入星星數
    const scores = screviews.myreview.scores;
    const options = starRatingEl.querySelectorAll('option');
    const index = options.length - scores;

    options[index].selected = true;
    const triggerEvent = new Event('change');
    starRatingEl.dispatchEvent(triggerEvent);
    starRatingControls.rebuild();

    // 帶入評論內容
    reviewModalInput.value = screviews.myreview.review;
    
    characterCountCheck(reviewModalInput,hintCount,hintQualified); 

} // loadMyreviewContent