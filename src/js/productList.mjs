import { getData } from "./productData.mjs";
export async function productList(category, htmlElement){
    const product = await getData(category);
    product.forEach(data => {
        if (data.Id == "989CG" || data.Id == "880RT"){
            
        }else{
            const template = productCardTemplate(data);
            const element = document.querySelector(htmlElement);
            const li = document.createElement("li");
            li.innerHTML = template
            element.append(li);
        }
    });
}

function productCardTemplate(product){
    return `<li class="product-card">
            <a href="product_pages/index.html?product=${product.Id}">
              <img
                src="${product.Image}"
                alt="Image of ${product.Name}"
              />
              <h3 class="card__brand">${product.Brand.Name}</h3>
              <h2 class="card__name">${product.NameWithoutBrand}</h2>
              <p class="product-card__price">${product.FinalPrice}</p></a>
            </li>`;
}

// Optional function: renderList - move adding to the document to its own funciton
