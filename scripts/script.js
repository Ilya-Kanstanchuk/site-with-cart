const menu = document.querySelector(".products-list");
const cartTitle = document.querySelector("h2");
let globalCount = 0;
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
        add.addEventListener("click", ()=> addActions(add, imag));
    }
}
populate();



function addActions(button, pic) {
    // Initialize the count for this specific button if not set
    if (!button.count) {
      button.count = 1;
    }
    if (!button.originalHTML) {
        button.originalHTML = button.innerHTML;
        button.originalStyle = button.getAttribute("style");
        button.originalBackgroundColor = button.style.backgroundColor;
        button.originalBorder = button.style.border;
    }
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
    
    // Event listeners
    plusIcon.addEventListener("click", (e) => {
      e.stopPropagation(); // stop the click from bubbling to the button itself
      button.count++;
      counter.textContent = button.count;
      globalCount++;
        cartTitle.textContent = `Your Cart(${globalCount})`;
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
        return;
      }
    });
  }
  
