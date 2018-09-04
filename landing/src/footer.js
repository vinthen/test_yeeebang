/* --------------- Create footer --------------- */
export const createFooter = (wrapper) => {

    const footer = document.createElement('div');
    footer.classList.add('footer');

    const htmlFragment = 
    `<div class="centerwpr">
        <p class="footer--rights">Copyright © 2016 SynerFUN Technology Corp. All rights reserved.</p>
    </div>`;

    footer.innerHTML = htmlFragment;

    wrapper.appendChild(footer);


}