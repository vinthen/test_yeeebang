/* --------------- Create header --------------- */
export const createHeader = (wrapper) => {

    // header wrapper
    const header = document.createElement('div');
    header.classList.add('header');

    // header html
    const htmlFragment = _htmlFragment();
    header.innerHTML = htmlFragment;
    wrapper.appendChild(header);

    // search bar handler
    const searchControl = header.querySelector('.search-control');
    searchBarHandler(searchControl);    

}

/* ---------- header HTML fragment ---------- */
const _htmlFragment = () => {

    const HTML = 
    `<div class="centerwpr">
        <a class="logo" href="/"></a>

        <div class="search-control">
            <input type="text" id="siteSearchBar">
            <div class="search-hint">
                <i class="fas fa-search"></i>
                <i class="fas fa-angle-down"></i>
                <span class="placeholder">搜尋才藝班或冬夏令營</span>
            </div>

            <div class="search-menu">
                <div class="searchMenu--overlay"></div>
                <div id="siteSearchMenu" class="search-condition">
                    <h3><i class="fas fa-circle"></i>增加搜尋條件</h3>
                    <ul class="classType">
                        <li class="typeEntry selected">才藝班</li>
                        <li class="typeEntry">夏令營</li>
                        <li class="typeEntry">冬令營</li>
                    </ul>
                    
                    <div class="condition-tab">
                        <div class="condition-tab__bg"></div>
                        <div class="condition-entry">
                            <span class="type">地區</span>
                            <div class="option">所有地區</div>
                        </div>

                        <div class="condition-entry">
                            <span class="type">類別</span>
                            <div class="option">所有類別</div>
                        </div>

                        <div class="condition-entry">
                            <div class="condition-select">
                                <div class="checkbox"></div>                             
                                <div class="text">有夏令營</div>
                            </div>

                            <div class="condition-select">  
                                <div class="checkbox"></div>                            
                                <div class="text">有冬令營</div>
                            </div>
                        </div>

                    </div>

                    <div id="search-submit">搜尋</div>
                </div>
            </div><!-- .search-menu -->

        </div><!-- .search-control -->

    </div>`;

    return HTML;
} // _htmlFragment


/* ---------- search bar handler ---------- */
const searchBarHandler = (container) => {

    const searchBar = container.querySelector('#siteSearchBar');
    const placeholder = container.querySelector('.placeholder');
    
    // input handler
    searchBar.addEventListener('input',(event) => {
  
        const _this = event.target;
        let inputValue = _this.value;

        inputValue.length > 0 ? container.classList.add('input') : container.classList.remove('input');  
        
        // console.log(inputValue);

    });

    // focus handler
    searchBar.addEventListener('focus',() => {

        container.classList.add('active');
        placeholder.textContent = '輸入關鍵字 ...';

    });

    // blur handler
    // searchBar.addEventListener('blur',() => {
    //     container.classList.remove('input');
    // });

    
    const menuOverlay = container.querySelector('.searchMenu--overlay');
    // console.log(menuOverlay);

    menuOverlay.addEventListener('click',() => {

        container.classList.remove('active');
        placeholder.textContent = '搜尋才藝班或冬夏令營';
        // console.log('click');
    });

}



