import { products } from "./products.js";
const openShopping = document.querySelector('.shopping');
const closeShopping = document.querySelector('.closeShopping');
const list = document.querySelector('.list');
const listCard = document.querySelector('.listCard');
const body = document.querySelector('body');
const total = document.querySelector('.total');
const quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', () => {
  body.classList.add('active');
})
closeShopping.addEventListener('click', () => {
  body.classList.remove('active');
})

let listCards = JSON.parse(localStorage.getItem('listCards')) || [];

function initApp() {
  if (localStorage.getItem('listCards')) {
    listCards = JSON.parse(localStorage.getItem('listCards'));
    reloadCart();
  }
  products.forEach((value, key) => {
    const newDiv = document.createElement('div');
    newDiv.classList.add('item');
  
    const img = document.createElement('img');
    img.src = `image/${value.image}`;
  
    const title = document.createElement('div');
    title.classList.add('title');
    title.textContent = value.name;
  
    const price = document.createElement('div');
    price.classList.add('price');
    price.textContent = value.price.toLocaleString();
  
    const button = document.createElement('button');
    button.textContent = 'Add To Cart';
    button.addEventListener('click', () => addToCart(key));
  
    newDiv.appendChild(img);
    newDiv.appendChild(title);
    newDiv.appendChild(price);
    newDiv.appendChild(button);
    list.appendChild(newDiv);
  });
}

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
    if (value != null) {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    
      let newDiv = document.createElement('li');
    
      // Creating image div
      let imageDiv = document.createElement('div');
      let image = document.createElement('img');
      image.src = `image/${value.image}`;
      imageDiv.appendChild(image);
    
      // Creating name div
      let nameDiv = document.createElement('div');
      nameDiv.textContent = value.name;
    
      // Creating price div
      let priceDiv = document.createElement('div');
      priceDiv.textContent = value.price.toLocaleString();
    
      // Creating quantity div
      let quantityDiv = document.createElement('div');
      let minusButton = document.createElement('button');
      minusButton.textContent = '-';
      minusButton.onclick = function() {
        changeQuantity(key, value.quantity - 1);
      };

      //Creating quantity div
      let countDiv = document.createElement('div');
      countDiv.classList.add('count');
      countDiv.textContent = value.quantity;
      let plusButton = document.createElement('button');
      plusButton.textContent = '+';
      plusButton.onclick = function() {
        changeQuantity(key, value.quantity + 1);
      };
      quantityDiv.appendChild(minusButton);
      quantityDiv.appendChild(countDiv);
      quantityDiv.appendChild(plusButton);
    
      // Appending all created elements to newDiv
      newDiv.appendChild(imageDiv);
      newDiv.appendChild(nameDiv);
      newDiv.appendChild(priceDiv);
      newDiv.appendChild(quantityDiv);
    
      listCard.appendChild(newDiv);
    }
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

function changeQuantity(key, quantity) {
  if (quantity === 0) {
    delete listCards[key];
  } else {
    listCards[key].quantity = quantity;
    listCards[key].price = quantity * products[key].price;
  }
  reloadCart();
  localStorage.setItem('listCards', JSON.stringify(listCards));
}
initApp();