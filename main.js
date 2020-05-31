let addCartBtn = document.querySelectorAll('.add-cart');

let products = [
    {
        name: 'Phone 1',
        tag: 'phone1',
        price: 15,
        inCart: 0
    },
    {
        name: 'Phone 2',
        tag: 'phone2',
        price: 85,
        inCart: 0
    },
    {
        name: 'Phone 3',
        tag: 'phone3',
        price: 95,
        inCart: 0
    },
    {
        name: 'Phone 4',
        tag: 'phone4',
        price: 75,
        inCart: 0
    },
    {
        name: 'Phone 5',
        tag: 'phone5',
        price: 55,
        inCart: 0
    }

];


for (let i = 0; i < addCartBtn.length; i++) {
    addCartBtn[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })

}

// onLoadNumbers makes sure that when refresh the page it keeps the totalItems in blue cart button
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('totalItems');

    if (productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}


// cartNumbers updates the quantity of all items in localstorage and blue cart button
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('totalItems');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('totalItems', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('totalItems', 1)
        document.querySelector('.cart span').textContent = 1;

    }

    // pass product into satItems function
    setItems(product);

}


// tells you which item was clicked on and how many 
function setItems(product) {
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart);

    if (productsInCart != null) {
        if (productsInCart[product.tag] == undefined) {
            //upates productsInCart and  ... productsInCart pushes watever was in your productsInCart from before line 78 which is the productsInCart
            productsInCart = {
                ...productsInCart,
                [product.tag]: product
            }
        }
        productsInCart[product.tag].inCart += 1;

    } else {
        product.inCart = 1;
        productsInCart = {
            [product.tag]: product
        }


    }

    localStorage.setItem('productsInCart', JSON.stringify(productsInCart))


}



// calculates total cost 
function totalCost(product) {
    // console.log("the product price is", product.price)
    let cartCost = localStorage.getItem('totalCost');

    console.log('my CartCost is', cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseInt(cartCost);

        localStorage.setItem('totalCost', cartCost + product.price)

    } else {
        localStorage.setItem('totalCost', product.price);

    }

}




function displayCart() {
    let productsInCart = localStorage.getItem('productsInCart');
    productsInCart = JSON.parse(productsInCart);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');


    if (productsInCart && productContainer) {
        productContainer.innerHTML = '';

        Object.values(productsInCart).map(item => {
            productContainer.innerHTML += `
                <div class='product'>
                <ion-icon name="close-circle-outline"></ion-icon>
                <img src='./images/${item.tag}.jpg'>
                <span>${item.name}</span>
                </div>
                <div class='price'>$${item.price}.00</div>
                <div class = 'quantity'>
                <ion-icon class='decrease'name="arrow-back-circle-outline"></ion-icon>   
                <span>${item.inCart}</span>
                <ion-icon class='increase' name="arrow-forward-circle-outline"></ion-icon>
                </div>
                <div class='total'>
                $${item.inCart * item.price}.00
                </div> 

                `;
        })

        productContainer.innerHTML += `
        <div class = 'basketTotalContainer'>
            <h4 class='basketTotalTitle'>
            Basket Total
            </h4>
             <h4 class='basketTotal'>
                $${cartCost}.00
             </h4>
       
       
        </div>
   `;

    }

}


onLoadCartNumbers();
displayCart() 
