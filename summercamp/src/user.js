import {openModal} from './dialog'; // 開啟 modal

export const userControl = (container,userinfo,logingroup) => {

    const wrapper = document.createElement('div');
    wrapper.id = 'userControlwpr';

    wrapper.innerHTML = 
    `<div id="ucLoginbtn"><i class="fas fa-user"></i>登入</div>
    <div class="uc-info">
        <div class="uc-info--avatar">
            <img src="" />
        </div>
        <div class="uc-info--name"></div>
        <a id="ucLogoutbtn" href="${logingroup.logout}">登出</a>
    </div>`;

    container.appendChild(wrapper);

    const ucLoginbtn = wrapper.querySelector('#ucLoginbtn');
    const ucInfo = wrapper.querySelector('.uc-info');

    if(!userinfo){
        // 未登入
        if(wrapper.classList.contains('login')){
            wrapper.classList.remove('login');
        }

    } else {
        // 已登入
        wrapper.classList.add('login'); 

        ucInfo.querySelector('.uc-info--avatar img').setAttribute('src',userinfo.avatar);
        ucInfo.querySelector('.uc-info--name').textContent = userinfo.name;

    }

    // 登入按鈕
    ucLoginbtn.addEventListener('click', () => {
        // 開啟 Login Modal  
        openModal(document.getElementById('loginModal'));
    
    });

}