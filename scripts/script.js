const menu = document.querySelector(".products-list");
const cartTitle = document.querySelector("h2");
const cartItems = document.querySelector(".content");
const cart = document.querySelector(".cart");
let cartEmpty = cart.innerHTML;
let clone;
let globalCount = 0;
let overallPrice = 0;
async function populate()
{
    const response = await fetch("data.json");
    const data = await response.json();
    populateMenu(data);
}

function populateMenu(data)
{
    for(const desert of data)
    {
        let imag = "";
        const newDiv = document.createElement("div");
        if(window.innerWidth < 768)
        {
            const source = desert.image.mobile;
            imag = document.createElement("img");
            imag.src = source;
            newDiv.appendChild(imag); 
        }else{
            const source = desert.image.desktop;
            imag = document.createElement("img");
            imag.src = source;
            newDiv.appendChild(imag);
        }
        const add = document.createElement("button");
        add.textContent = "Add to Cart";
        newDiv.appendChild(add);
        const cat = document.createElement("p");
        cat.textContent = desert.category;
        newDiv.appendChild(cat);
        const n = document.createElement("p");
        n.textContent = desert.name;
        newDiv.appendChild(n);
        const pr = document.createElement("p");
        pr.textContent = "$" + (desert.price).toFixed(2);
        newDiv.appendChild(pr);
        menu.appendChild(newDiv);
        add.addEventListener("click", ()=> addActions(add, imag, n.textContent, pr.textContent));
    }
}
populate();



function addActions(button, pic, name, price) {
  if(globalCount === 0){
    cartEmpty = cart.innerHTML;
    cartItems.innerHTML = "";
    clone = cart.cloneNode(true);
  }
    if (!button.count) {
      button.count = 1;
    }
    if(!button.finalPrice)
    {
      button.finalPrice = price;
    }
    if (!button.originalHTML) {
        button.originalHTML = button.innerHTML;
        button.originalStyle = button.getAttribute("style");
        button.originalBackgroundColor = button.style.backgroundColor;
        button.originalBorder = button.style.border;
    }
    overallPrice += parseFloat(price.slice(1));
    button.disabled = true;
    globalCount++;
    cartTitle.textContent = `Your Cart(${globalCount})`;
    // Clear existing content
    button.innerHTML = "";
    button.style.border = "none";
    button.style.padding = "0";
    button.style.display = "flex";
    button.style.justifyContent = "center";
    button.style.alignItems = "center";
    button.style.flexDirection = "row";
    button.style.backgroundColor = "hsl(14, 86%, 42%)";
    pic.style.border = "3px solid hsl(14, 86%, 42%)";
  
    // Minus icon
    const minusIcon = document.createElement("img");
    minusIcon.src = "../assets/images/icon-decrement-quantity.svg";
    minusIcon.style.width = "15px";
    minusIcon.style.height = "15px";
    minusIcon.style.cursor = "pointer";
    button.appendChild(minusIcon);
  
    // Counter text
    const counter = document.createElement("p");
    counter.textContent = button.count;
    counter.style.fontSize = "16px";
    counter.style.color = "hsl(20, 50%, 98%)";
    counter.style.margin = "0 35px";
    button.appendChild(counter);
  
    // Plus icon
    const plusIcon = document.createElement("img");
    plusIcon.src = "../assets/images/icon-increment-quantity.svg";
    plusIcon.style.width = "15px";
    plusIcon.style.height = "15px";
    plusIcon.style.cursor = "pointer";
    button.appendChild(plusIcon);
    const item = document.createElement("div");
    item.classList.add("cart-item");
    const info = document.createElement("div");
    info.classList.add("cart-info");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const spanName = document.createElement("span");
    spanName.textContent = name;
    p1.appendChild(spanName);
    const spanCount = document.createElement("span");
    spanCount.textContent = button.count + "x";
    const spanDefaulPrice = document.createElement("span");
    spanDefaulPrice.textContent = "@" + price;
    const spanFinalPrice = document.createElement("span");
    spanFinalPrice.textContent = button.finalPrice;
    const d = document.createElement("img");
    d.classList.add("delete-button");
    d.src = "../assets/images/icon-remove-item.svg";
    p2.appendChild(spanCount);
    p2.appendChild(spanDefaulPrice);
    p2.appendChild(spanFinalPrice);
    info.appendChild(p1);
    info.appendChild(p2);
    item.appendChild(info);
    item.appendChild(d);
    cartItems.appendChild(item);
    if(!document.querySelector(".totalPrice"))
    {
        const total = document.createElement("div");
        total.classList.add("totalPrice");
        const ord = document.createElement("p");
        ord.textContent = "Total price";
        const prs = document.createElement("p");
        prs.textContent = "$" + overallPrice;
        prs.classList.add("op");
        total.appendChild(ord);
        total.appendChild(prs);
        document.querySelector(".second-block").appendChild(total);
    }else{
      const blo = document.querySelector(".op");
      blo.textContent = "$" + overallPrice;
    }
    if(!document.querySelector(".confirm-button"))
    {
      const cb = document.createElement("button");
      cb.classList.add("confirm-button");
      cb.textContent = "Confirm Order"
      document.querySelector(".button").appendChild(cb);
    }

    // Event listeners
    plusIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // stop the click from bubbling to the button itself
      button.count++;
      counter.textContent = button.count;
      globalCount++;
        cartTitle.textContent = `Your Cart(${globalCount})`;
        spanFinalPrice.textContent
    });
  
    minusIcon.addEventListener("click", (e) => {
      e.stopPropagation();
      globalCount--;
        cartTitle.textContent = `Your Cart(${globalCount})`
      if (button.count > 1) {
        button.count--;
        counter.textContent = button.count;
      }else{
        button.innerHTML = button.originalHTML;
        button.setAttribute("style", button.originalStyle);
        button.style.backgroundColor = button.originalBackgroundColor;
        button.style.border = button.originalBorder;
        button.disabled = false;
        pic.style.border = "none";
        cart.replaceWith(clone);
        return;
      }
    });
  } 
  
