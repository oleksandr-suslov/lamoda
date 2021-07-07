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

//get base goods

const getData = async () => {
    const data = await fetch('db.json');

    if (data.ok) {
        return data.json();
    } else { 
        throw new Error(`Данные не были полученны, ошибка ${data.status} ${data.statusText}`)
    };
};

const getGoods = (callback, value) => {
        getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item.category === value))
            } else {
                callback(data)
            }
        })
        .catch(err => {console.error(err)
        })
};
// getGoods((data) => {console.warn(data)});

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

// render cards goods
let hash = location.hash.substring(1);
console.log(location);
try {
    const goodsList = document.querySelector('.goods__list');
    if (!goodsList) {
        throw 'This is not a goods page!'
    }
    const createCard = ({ id, preview, coast, brand, name, sizes}) => {
        const li = document.createElement('li');
        li.classList.add('goods__item');
        li.innerHTML = `
        <article class="good">
                            <a class="good__link-img" href="card-good.html#${id}">
                                <img class="good__img" src="goods-image/${preview}" alt="">
                            </a>
                            <div class="good__description">
                                <p class="good__price">${coast} &#8381;</p>
                                <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                                ${sizes ?
                                    `<p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>` :
                                    ''}
                                <a class="good__link" href="card-good.html#${id}">Подробнее</a>
                            </div>
                        </article>
        `
        return li;
    }

    const renderGoodsList = data => {
        goodsList.textContent = '';

        data.forEach(item => {
            const card = createCard(item);
            goodsList.append(card)
        })
    }

    window.addEventListener('hashchange', () => {
        hash = location.hash.substring(1);
        getGoods(renderGoodsList, hash);
        
        const goodsTitle = document.querySelector('.goods__title');

        goodsTitle.textContent = hash;

    })
getGoods(renderGoodsList, hash);

} catch (err) {
    console.warn(err)
}