const headerCityButton = document.querySelector('.header__city-button');

headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';

headerCityButton.addEventListener('click', () =>{
const city = prompt('Укажите ваш город');
headerCityButton.textContent = city;
localStorage.setItem('lomoda-location', city)
});

//scroll blocked

const disableScroll = () => {
const widthScroll = window.innerWidth - document.body.offsetWidth;
document.body.dbScrollY = window.scrollY;
document.body.style.cssText = `
        positio: fixed;
        top: ${-window.scrollY}px;
        width: 100%;
        height: 100%;
        overflow: hidden;
        padding-right: ${widthScroll}px;
`

    // document.body.style.overflow = 'hidden';
}
const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: 'document.body.dbScrollY',
    })
    // document.body.style.overflow = '';
}

//modal window

const subheaderCart = document.querySelector('.subheader__cart')
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
}
const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open')
    enableScroll();
}

subheaderCart.addEventListener('click', cartModalOpen);
cartOverlay.addEventListener('click', event => {
    const target = event.target;
    if(target.classList.contains('cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();   
    }
})