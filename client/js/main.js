var swiper = new Swiper(".mySwiper", {
  loop: true,
  navigation: {
    nextEl: "#next",
    prevEl: "#prev",
  },
});

const cartIcon = document.querySelector(".cart-icon");
const cartTab = document.querySelector(".cart-tab");
const closeBtn = document.querySelector(".close-btn");
const cardList = document.querySelector(".card-list");
const cartList = document.querySelector(".cart-list");
const cartTotal = document.querySelector(".cart-total");
const cartValue = document.querySelector(".cart-values");
const hamburger = document.querySelector(".hamBurger");
const mobileMenu = document.querySelector(".mobile-list");
const bars = document.querySelector(".fa-xmark");

cartIcon.addEventListener("click", () =>
  cartTab.classList.add("cart-tab-active")
);

closeBtn.addEventListener("click", () =>
  cartTab.classList.remove("cart-tab-active")
);

hamburger.addEventListener('click',()=>mobileMenu.classList.toggle('mobile-list-action'));
hamburger.addEventListener('click',()=>bars.classList.toggle('fa-bars'));


let productList = []; 
let cartProduct =[];

const updatePrice = () =>{
  let totalPrice=0;
  let totalQuantity = 0; 
  document.querySelectorAll('.item').forEach(item =>{
    const quantity = parseInt(item.querySelector('.quantity-value').textContent)
    const price = parseInt(item.querySelector('.item-total').textContent.replace('₹',''))
    totalPrice += price;
    totalQuantity +=quantity; 
  })
  cartTotal.textContent = `₹${totalPrice}`;
  cartValue.textContent = totalQuantity;
}

const showCards = () => {
  productList.forEach((product) => {
    const orderCard = document.createElement("div");
    orderCard.classList.add("order-card");

    orderCard.innerHTML = `
            <div class="card-image">
                <img src = "${product.image}">
            </div>
            <h4>${product.name}</h4>
            <h4 class="price">${product.price}</h4>
            <a href="#" class="btn card-btn">Add to Cart</a> 
        `;

    cardList.appendChild(orderCard);

    const cardBtn = orderCard.querySelector(".card-btn");
    cardBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addToCart(product);
    });
  });
};

const addToCart = (product) => {

  const existingProduct = cartProduct.find(item => item.id === product.id);
  if(existingProduct){
    alert("Item is already in cart");
    return;
  } 
  cartProduct.push(product)
  let quantity = 1;
  let price = parseInt(product.price.replace('₹',''));

  const cardItem = document.createElement("div");
  cardItem.classList.add("item");
  cardItem.innerHTML = `
    <div class="item-image">
        <img src="${product.image}">
    </div>
    <div class="detail">
        <h4>${product.name}</h4>
        <h4 class="item-total">${product.price}</h4>
    </div>
    <div class="flex">
        <a href="#" class="quantity-btn">
            <i class="fa-solid fa-minus minus"></i>
        </a>
        <h4 class="quantity-value">${quantity}</h4>
        <a href="#" class="quantity-btn plus">
            <i class="fa-solid fa-plus"></i>
        </a>
    </div>
    `;
  cartList.appendChild(cardItem);
  updatePrice();
  const plusbtn = cardItem.querySelector('.plus');
  const minusbtn = cardItem.querySelector('.minus');
  const quantityValue = cardItem.querySelector('.quantity-value');
  const itemTotal = cardItem.querySelector('.item-total');

  plusbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    quantity++;
    quantityValue.textContent = quantity;
    itemTotal.textContent = `₹${price * quantity}`;
    updatePrice();
  })

  minusbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(quantity>1){
      quantity--;
      quantityValue.textContent = quantity;
      itemTotal.textContent = `₹${price * quantity}`;
      updatePrice();
    }else{
      cardItem.classList.add('slide-out');
      setTimeout(()=>{
        cardItem.remove();
        cartProduct = cartProduct.filter(item => item.id !== product.id)
        updatePrice();
      },300)

    }

  })

};

const initApp = () => {
  fetch("./js/product.json")
    .then((response) => response.json())
    .then((data) => {
      productList = data;
      showCards();
    });
};
initApp();
