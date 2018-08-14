/* ---------- Open Modal ---------- */
export const openModal = (modal) => {

    modal.classList.add('active');

} // openModal

/* ---------- Close Modal ---------- */
export const closeModal = (modal) => {

    modal.classList.remove('active');

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
                    <div class="loginTypeBtn normal" data-user-type="normal">一般</div>
                    <div class="loginTypeBtn teacher" data-user-type="teacher">才藝班班主任</div>
                </div>                        
                <div id="userTypeHint">您尚未選擇身分</div>
            </div>
            <div class="login-btnwpr socialLogin">
                <a href="/auth/facebook" class="loginbtn login-facebook">
                    <i class="fab fa-facebook-f"></i>使用 Facebook 帳號登入
                </a>
                <a href="/auth/google" class="loginbtn login-google">
                    <i class="fab fa-google"></i>使用 Google 帳號登入
                </a>
            </div>
        </div>    
    </div>
    `;

    container.appendChild(wrapper);

    /* ----- 選擇身分別 ----- */
    let userSelectType = null;    

    const loginTypeBtns = wrapper.querySelectorAll('.loginTypeBtn');
    
    // 沒有選擇身分別時的提示文字
    const userTypeHint = wrapper.querySelector('#userTypeHint');

    loginTypeBtns.forEach((btn) => {

        btn.addEventListener('click',(event) => {

            loginTypeBtns.forEach((element) => {
                if(element.classList.contains('selected')){
                    element.classList.remove('selected');
                }
            });
         
            btn.classList.add('selected');

            // 送出 user type 資訊 (不能在此時就送出)
            // console.log(btn.dataset.userType);

            const type = btn.dataset.userType;
            let typeText = '';

            switch(type){
                case 'normal':
                    typeText = '一般';
                    break;

                case 'teacher':
                    typeText = '才藝班班主任';
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

        if(wrapper.classList.contains('active')){

            // console.log('close modal');
            wrapper.classList.remove('active');

        }        
    });

} // loginModal


/* ---------- user rating and review ---------- */
export const reviewModal = () => {

    // console.log('review modal test');

} // reviewModal