/* --------------- Create main content --------------- */
export const createMainContent = (wrapper) => {

    const mainContainer = document.createElement('div');
    mainContainer.classList.add('main');

    const htmlFragment = 
    `<div class="banner"></div>
    <div class="centerwpr">
        
    </div>`;

    mainContainer.innerHTML = htmlFragment;

    wrapper.appendChild(mainContainer);


}