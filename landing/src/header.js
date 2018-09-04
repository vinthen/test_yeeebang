/* --------------- Create header --------------- */
export const createHeader = (wrapper) => {

    const header = document.createElement('div');
    header.classList.add('header');

    const htmlFragment = 
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
                <div id="siteSearchMenu">
                </div>
            </div>
        </div>
    </div>`;

    header.innerHTML = htmlFragment;

    wrapper.appendChild(header);

    const searchControl = header.querySelector('.search-control');
    searchBarHandler(searchControl);

    // setTimeout(() => {
    //     console.log(searchControl.querySelector('#siteSearchBar'));
    // },0);

    

}



/* --------------- search bar handler --------------- */
const searchBarHandler = (container) => {

    const searchBar = container.querySelector('#siteSearchBar');
    
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
    });

    // blur handler
    // searchBar.addEventListener('blur',() => {
    //     container.classList.remove('input');
    // });

    
    const menuOverlay = container.querySelector('.searchMenu--overlay');
    // console.log(menuOverlay);

    menuOverlay.addEventListener('click',() => {
        container.classList.remove('active');
        // console.log('click');
    });



}



