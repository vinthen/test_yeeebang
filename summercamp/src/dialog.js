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

/* ---------- login ---------- */
export const loginModal = (container) => {

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
    const loginLinkFBgeneral = '/auth/facebook/grp_general';
    const loginLinkFBmanager = '/auth/facebook/grp_tcmgr';

    // Google Login link
    const loginLinkGoogleGeneral = '/auth/google/grp_general';
    const loginLinkGoogleManager = '/auth/google/grp_tcmgr';
    /* ---------- */

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

    /* ----- 檢查是否已經選擇身分別 ----- */ 
    wrapper.querySelectorAll('.loginbtn').forEach((btn) => {

        btn.addEventListener('click',(event) => {
            if(userSelectType == null){
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


/* ---------- user rating and review ---------- */
export const reviewModal = (container,campName,autosize,StarRating) => {

    const wrapper = document.createElement('div');
    wrapper.id = 'reviewModal';
    wrapper.classList.add('modal');

    wrapper.innerHTML = 
    `<div class="modal--overlay"></div>
    <div class="modal--container">
        <div class="modal--header">
            <h1>新增評分與評論</h1>
            <h2>夏令營：${campName}</h2>
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

    const maxStarValue = screviews.stars.length;
    // console.log(maxStarValue);

    // star rating
    const starRatingEl = wrapper.querySelector('.star-rating');
    let starRatingControls = new StarRating(starRatingEl,{ 
        maxStars: maxStarValue,
        showText: false
    });

    let userSelectRatingScore = 0;

    let userSelectRatingText = wrapper.querySelector('#userSelectRatingText');

    starRatingEl.addEventListener('change',(event) => {
        userSelectRatingScore = event.target.value
        // console.log(userSelectRatingScore);

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

        characterCountCheck(event);      

    });

    const characterCountCheck = (event) => {

        // 去掉空白
        let originValue = event.target.value;
        let trimValue = originValue.replace(/\s+|　+/g,''); 

        // 計算字數
        let inputCount = trimValue.length;

        hintCount.textContent = inputCount;
        
        if(inputCount > 10){
            hintQualified.classList.add('show');
        } else {
            hintQualified.classList.remove('show');
        }
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
        autosize.update(reviewModalInput);

        closeModal(wrapper);
    });

    /* ----- 送出，關閉並送出已輸入的內容 ----- */
    wrapper.querySelector('.submit').addEventListener('click',(event) => {        
        
        if(userSelectRatingScore >= 1 && reviewModalInput.value.length > 1){

            console.log('評分數：' + userSelectRatingScore);
            console.log('評論內容：' + reviewModalInput.value);

            autosize.update(reviewModalInput);
            closeModal(wrapper);     

        } else {
            event.preventDefault();
            console.log('無內容或內容不完整');
        }

        
    });


} // reviewModal