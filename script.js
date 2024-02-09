let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})

let products = [
  {
    id: 1,
    name: 'iPhone 15',
    image: 'iPhone15.jpeg',
    price: 80000
  },
  {
    id: 2,
    name: 'iPhone 14',
    image: 'iphone14.jpg',
    price: 73000
  },
  {
    id: 3,
    name: 'iPhone 13',
    image: 'iphone13.webp',
    price: 60000
  },
  {
    id: 4,
    name: 'iPhone 12',
    image: 'iphone12.jpg',
    price: 50000
  },
  {
    id: 5,
    name: 'iPhone 11',
    image: 'iphone11.jpeg',
    price: 41990
  },
  {
    id: 6,
    name: 'iPhone X',
    image: 'iphonex.jpeg',
    price: 40000
  }
];

let listCards = JSON.parse(localStorage.getItem('listCards')) || [];

function initApp() {
  if (localStorage.getItem('listCards')) {
    listCards = JSON.parse(localStorage.getItem('listCards'));
    reloadCart();
  }

  products.forEach((value, key) => {
    let newDiv = document.createElement('div');
    newDiv.classList.add('item');
    newDiv.innerHTML = `
      <img src="image/${value.image}">
      <div class="title">${value.name}</div>
      <div class="price">${value.price.toLocaleString()}</div>
      <button onclick="addToCart(${key})">Add To Cart</button>`;
    list.appendChild(newDiv);
  });
}
initApp();

function addToCart(key) {
  if (listCards[key] == null) {
    listCards[key] = JSON.parse(JSON.stringify(products[key]));
    listCards[key].quantity = 1;
  }
  reloadCart();
  localStorage.setItem('listCards', JSON.stringify(listCards));
}

function reloadCart() {
  listCard.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCards.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if (value != null) {
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="image/${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>`;
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity == 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCart();
  localStorage.setItem('listCards', JSON.stringify(listCards));
}