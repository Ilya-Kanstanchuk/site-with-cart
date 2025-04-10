let cart = {
  items: {},  
  totalPrice: 0,
  itemCount: 0
};


document.addEventListener('DOMContentLoaded', () => {
    // Initialize app
    loadProducts();
  });
  
  // Load and render products
  function loadProducts() {
    fetch("../data.json")
    .then((response) => response.json())
    .then((data) =>{
        renderProductsList(data);  
    }).catch(console.error);
  }
  
  function renderProductsList(data){
    const container = document.querySelector(".products-list");
    data.forEach(product=>{
       const card = document.createElement("div");
       card.classList.add("product-card");
       
       const picture = document.createElement("img");
       if(window.innerWidth < 768)
       {
        picture.src = product.image.mobile;
       }else{
        picture.src = product.image.desktop;
       }
       picture.classList.add("desert-img");

       const btn = document.createElement("button");
       btn.classList.add('add-to-cart-btn');
       btn.textContent = "Add to cart";
       btn.dataset.name = product.name;
       btn.dataset.price = product.price;
       btn.productImage = picture;

       btn.addEventListener('click', handleAddToCart);


       const cat = document.createElement("p");
       cat.textContent = product.category;

       const name = document.createElement("h3");
       name.textContent = product.name;


       const prs = document.createElement("p");
       prs.textContent = "$" + product.price;

       card.append(picture, btn, cat, name, prs);
       container.appendChild(card);

    });
    
  }


  function addToCart(productName, price)
  {
    if(cart.items[productName])
    {
      cart.items[productName].quantity++;
    }else{
      cart.items[productName] = {quantity: 1, price};
    }
    cart.totalPrice += price;
    cart.itemCount++;
    updateCartUI();
  }

  function increaseQuantity(productName)
  {
    if(cart.items[productName])
    {
      cart.items[productName].quantity++;
      cart.totalPrice += cart.items[productName].price;
      cart.itemCount++;
    }
    updateCartUI();
  }

  function decreaseQuantity(productName)
  {
    if(cart.items[productName])
      {
        cart.items[productName].quantity--;
        cart.totalPrice -= cart.items[productName].price;
        cart.itemCount--;
        if(cart.items[productName].quantity <= 0)
        {
          removeFromCart(productName);
        }
      }
      updateCartUI();
  }

  function removeFromCart(productName){
    if(cart.items[productName])
    {
      if(cart.items[productName].quantity > 0)
      {
        cart.itemCount -= cart.items[productName].quantity;
        cart.totalPrice -= (cart.items[productName].price * cart.items[productName].quantity);
      }
      delete cart.items[productName];
    }
    updateCartUI();
  }

  function updateCartUI() {
    const cartBox = document.querySelector(".cart .content");
    cartBox.innerHTML = "";
    if(cart.itemCount === 0)
    {
      cartBox.innerHTML = `
      <img src="assets/images/illustration-empty-cart.svg" alt="">
      <p>Your added items will appear here</p>
      `;
        document.querySelector(".cart h2").textContent = "Your Cart(0)";
      return;
    }
    for (let name in cart.items){
      const item = cart.items[name];
      const cartElement = document.createElement("div");
      cartElement.classList.add("cart-element");
      cartElement.innerHTML = `<p>${name}</p>
      <span>${item.quantity}x</span>
      <span>@ $${item.price}</span>
      <span>$${item.price * item.quantity}</span>
      <button data-name="${name}" class="remove-btn"></button>`;
      cartBox.appendChild(cartElement);
      // cartElement.querySelector(".remove-btn").addEventListener("click", (event)=>{
      //   console.log("Remove button clicked");
      //   removeFromCart(name);
      // });
    }
    const total = document.createElement("div");
    total.classList.add("ord-total");
    total.innerHTML = `<p>Order Total</p>
      <p>$${cart.totalPrice}</p>`;
    cartBox.appendChild(total);
    document.querySelector(".cart h2").textContent = `Your Cart(${cart.itemCount})`;
    cartBox.innerHTML += `<button id = "submit">Confirm Order</button>`;
    document.getElementById("submit").addEventListener("click", submitOrder);
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.dataset.name;
        removeFromCart(name);
        document.querySelectorAll('.add-to-cart-btn').forEach(addbtn =>{
          if(addbtn.dataset.name === name)
          {
            getBackButton(addbtn);
          }
        });
      });
    });
  }

  // function setupEventListeners() {
  //   document.querySelectorAll('.add-to-cart-btn').forEach(button => {
  //     button.addEventListener('click', handleAddToCart);
  //   });
    
  // }
  
  // Cart management functions
  function handleAddToCart(event) {
    const currButton = event.target;
    const name = currButton.dataset.name;
    const price = parseFloat(currButton.dataset.price);
    addToCart(name, price);
    transformButton(currButton);
  }

  function transformButton(cbtn)
  {
    cbtn.disabled = true;
    cbtn.innerHTML = "";
    cbtn.style.backgroundColor = "hsl(14, 86%, 42%)";
    cbtn.style.border = "none";
    im = cbtn.productImage;
    im.style.border = "3px solid hsl(14, 86%, 42%)";
    cbtn.innerHTML = 
    `<img src="../assets/images/icon-decrement-quantity.svg" class="minus-btn" alt="–">
    <span class="counter">1</span>
    <img src="../assets/images/icon-increment-quantity.svg" class="plus-btn" alt="+">`;
    cbtn.querySelector(".minus-btn").addEventListener("click", (e)=>{
      e.stopPropagation();
      decreaseQuantity(cbtn.dataset.name);
      if(!cart.items[cbtn.dataset.name]){
        getBackButton(cbtn);
        return;
      }
      cbtn.querySelector(".counter").textContent = cart.items[cbtn.dataset.name].quantity;
    });
    cbtn.querySelector(".plus-btn").addEventListener("click", (e)=>{
      e.stopPropagation();
      increaseQuantity(cbtn.dataset.name);
      cbtn.querySelector(".counter").textContent = cart.items[cbtn.dataset.name].quantity;
    });
  }
  
 function getBackButton(btn){
    btn.productImage.style.border = "none";
    btn.disabled = false;
    btn.innerHTML = "";
    btn.textContent = "Add to cart";
    btn.style.backgroundColor =  "hsl(13, 31%, 94%)"
    btn.style.border = "2px solid hsl(7, 20%, 60%)"; 
 }


 function startNewOrder() {
  cart = {
    items: {},  
    totalPrice: 0,
    itemCount: 0
  };
  document.querySelectorAll('.add-to-cart-btn').forEach(button =>{
    getBackButton(button);
  });
  updateCartUI();
  }



  function submitOrder()
  {
    const conclusion = document.querySelector(".conclusion");
    for (let name in cart.items){
      const item = cart.items[name];
      const cartElement = document.createElement("div");
      cartElement.classList.add("order-element");
      cartElement.innerHTML = `<p>${name}</p>
      <span>x${item.quantity}</span>
      <span>@ $${item.price}</span>
      <p>$${item.price * item.quantity}</p>`;
      conclusion.appendChild(cartElement);
    }
    const total = document.createElement("div");
    total.innerHTML = `<p>Order Total</p>
      <p>$${cart.totalPrice}</p>`;
    conclusion.appendChild(total);
    const newBtn = document.createElement("button");
    newBtn.id = "new";
    newBtn.textContent = "Start New Order";
    conclusion.appendChild(newBtn);
    newBtn.addEventListener("click", (event)=>{
      startNewOrder();
      document.querySelector(".conclusion").innerHTML = "";
      document.getElementById("conc").close();
    });
    document.getElementById("conc").showModal();
  }