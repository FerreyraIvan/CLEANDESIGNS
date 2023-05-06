let shopContainer = document.querySelector('.shop-content');


// DISPLAY PRODUCTS

const products = [
    {
        id: 1,
        title: "REMERA OVERSIZE CLEAN",
        img: "./DESIGNS/MAQUETAS/CLEAN/unisex-premium-sweatshirt-black-front-637144dae5b67.png",
        price: 4000,
        quantity: 0
    },
    {
        id: 2,
        title: "BUZO SIMPLE BUT  CLEAN",
        img: "./DESIGNS/MAQUETAS/simplebutclean/negro.png",
        price: 5000,
        quantity: 0
    },
    {
        id: 3,
        title: "BUZO TO SUCCESS",
        img: "./DESIGNS/MAQUETAS/TOSUCCESS/NEGROTO.png",
        price: 5000,
        quantity: 0
    },
    {
        id: 4,
        title: "CLEAN SHIRT",
        img: "./DESIGNS/MAQUETAS/CLEAN/unisex-premium-sweatshirt-black-product-details-637144daf1cbf.png",
        price: 4000,
        quantity: 0
    }
    
    ]


 window.addEventListener('DOMContentLoaded', displayProducts())


function displayProducts() {
    products.forEach(product => {
        const div = document.createElement('DIV')
        div.classList.add('product-box')
        div.innerHTML = `
                <img src=${product.img} class="product-img" alt="">
                <h2 class="product-title"> ${product.title}</h2>
                <span class="price">$${product.price}</span>
                <i class="bx bx-shopping-bag add-cart ${product.id}"></i>
        `
        shopContainer.appendChild(div)
    });

}

// cart
const cartIcon = document.querySelector('#cart-icon');
const cart = document.querySelector('.cart');
const closeCart = document.querySelector('#close-cart');

// OPEN AND CLOSE CART

cartIcon.addEventListener('click',()=>{
    cart.classList.add('active');
})

closeCart.addEventListener('click', ()=>{
    cart.classList.remove('active');
})

if(document.readyState == "loading"){
    document.addEventListener('DOMContentLoaded', start);
}else{
    start()
}

// START
function start(){
    addEvents()
}

//add to cart



// update cart
function update(){
    addEvents()
    updatetotal()
}





function addEvents(){
    //removing items
    let cartRemoveBtns = document.querySelectorAll('.cart-remove');
    cartRemoveBtns.forEach((btn) => {
        btn.addEventListener('click', handle_removeCartItem)
    });

    //change quantity
    let cartQuantity_inputs = document.querySelectorAll('.cart-quantity')
    cartQuantity_inputs.forEach((input)=>{
        input.addEventListener('change', ()=>{
            if(isNaN(input.value) || input.value < 1){
                input.value = 1;
            }
            this.value = Math.floor(this.value)
            update()
        })
        
    })
    /* add products */
    let addCartBtns = document.querySelectorAll('.add-cart')
    addCartBtns.forEach((btn)=>{
        btn.addEventListener('click',  AddingProducts)
    })

    // BUY ORDER
    const buyBtn = document.querySelector('.btn-buy')
    buyBtn.addEventListener('click',()=>{
        if(itemsAdded.length <= 0){
            alert("You need to add products to the cart")
            return
        }
        const cartContent = cart.querySelector('.cart-content')
        cartContent.innerHTML = ''
        itemsAdded = []
        alert(" Your Order has been placed succesfully")
        update()
    })


}

//remove items
function handle_removeCartItem(){
    this.parentElement.remove()
    itemsAdded = itemsAdded.filter(
        (el) => el.title != 
        this.parentElement.querySelector('.cart-product-title').innerHTML)
    update()
}



//quantity changes




// update total

function updatetotal(){
    let cartBoxes = document.querySelectorAll('.cart-box');
    let totalElement = cart.querySelector('.total')
    let total = 0;
    
    cartBoxes.forEach((cartBox)=>{
        let priceElement = cartBox.querySelector('.cart-price')
        let price = parseFloat(priceElement.innerHTML.replace('$', ''))
        let quantity = cartBox.querySelector('.cart-quantity').value;
        total += price * quantity
        
    })
   
    total = total.toFixed(2)
    totalElement.innerHTML = "$" + total
    

} 
let itemsAdded =[]

function AddingProducts(){
    let product = this.parentElement;
    let title = product.querySelector('.product-title').innerHTML;
    let price = product.querySelector('.price').innerHTML;
    let imgSrc = product.querySelector('.product-img').src;

    let newToAdd ={
        title,
        price,
        imgSrc,
    }

    // IF ALREADY EXIST IN THE CART
    if(itemsAdded.find((el)=> el.title == newToAdd.title)){
        alert("This Item is Already in the CART")
        return
        
    } else{
        itemsAdded.push(newToAdd)
    }
    
    let cartBoxElement = cartBoxComponent(title,price,imgSrc);
    let newNode = document.createElement('div')
    newNode.innerHTML = cartBoxElement;
    const cartContent = cart.querySelector('.cart-content')
    cartContent.appendChild(newNode)
    
    update()
}
function cartBoxComponent (title,price,imgSrc){ 
    return  `
                        <div class="cart-box">
                            <img src="${imgSrc}" alt=""
                                class="cart-img">
                            <div class="detail-box">
                                <h2 class="cart-product-title">${title}</h2>
                                <span class="cart-price">${price}</span>
                                <input type="number" value="1" class="cart-quantity">
                            </div>
                            <i class="bx bxs-trash-alt cart-remove"></i>
                        </div>`}