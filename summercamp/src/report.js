import {openModal} from './dialog';

import superagent from 'superagent';

/* ---------- Report abuse review ---------- */
export const reportAbuse = (allReportNode,allReportMenu,scID,token) => {

    // allReportNode: .querySelectorAll('.report')
    // allReportMenu: querySelectorAll('.report--menu')
    // scID: summercamp ID
    // token: csrfToken

    /* ----- 所有的 report 操作 ----- */
    allReportNode.forEach((reportNode) => {

        // report trigger 的 click 事件
        reportNode.querySelector('.report--trigger').addEventListener('click', (event) => {
            
            // 取消所有已選的項目
            _deselectedAllOptions(
                reportNode.querySelector('.report--menu'), //reportMenu,
                reportNode.querySelectorAll('.report--reason')//options
            );
            
            // 開啟 / 關閉 report menu
            _toggleReportMenu(event,allReportMenu);
        });
    });

    /* ----- 所有的 report menu 操作 ----- */
    allReportMenu.forEach((reportMenu) => {

        // report menu 中的所有選項操作
        const options = reportMenu.querySelectorAll('.report--reason');        
        options.forEach((option) => {

            // 各選項的 click 事件
            option.addEventListener('click',(event) => {
                _selectOption(event,options);
            })

        });

        // 取消按鈕 click 操作
        reportMenu.querySelector('.cancel').addEventListener('click', () => {
            // 取消選取所有的 option
            _deselectedAllOptions(reportMenu,options);

            // 關閉選單
            _closeAllReportMenu(allReportMenu);
        });

        // 登入按鈕 click 操作
        reportMenu.querySelector('.report--loginbtn').addEventListener('click', () => {
            // 開啟登入 dialog
            openModal(document.getElementById('loginModal'));

             // 關閉選單
             _closeAllReportMenu(allReportMenu);
        });

        // 送出按鈕 click 操作
        reportMenu.querySelector('.submit').addEventListener('click', () => {

            const selected = reportMenu.querySelector('.selected');

            const reviewID = selected.dataset.id;
            const reason = selected.dataset.reason;

            const feedback = reportMenu.parentNode.querySelector('.report--feedback');
            
            // console.log(reviewID);
            // console.log(reason);
            // console.log(scID);

            superagent
                .post('/summercamp/screview')                
                .set('X-CSRF-TOKEN', token)
                .send({
                    sc_id: scID,
                    crud: 'rp',
                    screview_id: reviewID,
                    reportreason: reason
                })
                .then(res => {

                    const resData = JSON.parse(res.text);
                    console.log(resData);

                    if(resData.ajaxcode == 0){
                        // console.log('檢舉成功');

                        // 取消所有已選的項目
                        _deselectedAllOptions(reportMenu,options);

                        // 關閉選單
                        _closeAllReportMenu(allReportMenu);

                        // 顯示 feedback
                        feedback.classList.add('show');
                        setTimeout(() => {
                            feedback.classList.remove('show');
                        },2000);


                    } else {
                        // console.log('請稍後再試');

                        // 取消所有已選的項目
                        _deselectedAllOptions(reportMenu,options);

                        // 關閉選單
                        _closeAllReportMenu(allReportMenu);

                        feedback.textContent = '請稍後再試，謝謝您';

                        // 顯示 feedback
                        feedback.classList.add('show');
                        setTimeout(() => {
                            feedback.classList.remove('show');
                        },2000);
                    }                    
                  
                })
                .catch(err => {
                    console.log(err);                    
                }); 

             
        });

    });


}

/* ---------- Toggle current report menu ---------- */
const _toggleReportMenu = (e,allMenu) => {

    // e: event

    // allMenu: querySelectorAll('.report--menu')
    // --> allReportMenu

    const parent = e.target.parentNode;
    const menu = parent.querySelector('.report--menu');
    // .classList.add('show');

    if(menu.classList.contains('show')){
        _closeAllReportMenu(allMenu);
    } else {
        _closeAllReportMenu(allMenu);
        menu.classList.add('show');
    }

}

/* ---------- Close all report menu ---------- */
const _closeAllReportMenu = (allMenu) => {

    // allMenu: querySelectorAll('.report--menu')
    // --> allReportMenu

    allMenu.forEach((menu) => {
        menu.classList.remove('show');
    });
}

/* ---------- Toggle report option ---------- */
const _selectOption = (e,allOption) => {    

    // e: event
    // allOption

    const currentOption = e.target;
    // const allOption = currentOption.parentNode.querySelectorAll('.report--reason');

    const menu = currentOption.parentNode.parentNode;

    // 單選，不做 toggle
    _deselectedAllOptions(menu,allOption);
    currentOption.classList.add('selected');  

    menu.classList.remove('deselect');

}

const _deselectedAllOptions = (_menu,_allOption) => {

    // _menu: .report--menu
    // _allOption: querySelectorAll('.report--reason');

    _allOption.forEach((item) => {
        item.classList.remove('selected');
    });

    if(!_menu.classList.contains('deselect')){
        _menu.classList.add('deselect');
    }

}


