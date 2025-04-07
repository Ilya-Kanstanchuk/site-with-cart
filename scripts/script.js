const menu = document.querySelector(".products-list");

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
        const newDiv = document.createElement("div");
        if(window.innerWidth < 768)
        {
            const source = desert.image.mobile;
            const imag = document.createElement("img");
            imag.src = source;
            newDiv.appendChild(imag); 
        }else{
            const source = desert.image.desktop;
            const imag = document.createElement("img");
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
    }
}
populate();
