import { foodArray } from "/data.js"

const menuEl = document.querySelector(".menu")
const cartItemsEl = document.querySelector(".cart")
const cartTotal = document.querySelector(".total")
const purchaseBtn = document.querySelector(".modal")
const innerModal = document.getElementById("modal-inner")
const closeModalBtn = document.getElementById("modal-close-btn")
const paymentForm = document.getElementById("payment-form")

document.addEventListener("click", function(e) {
    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add)
        renderCartItems(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    } else if (e.target.dataset.buy) {
        finaliseOrder(e.target.dataset.buy)
    }
})

function renderProducts() {
    foodArray.forEach((item) => {
        const purchaseBtnClass = ""
        menuEl.innerHTML += `
        <div class="item">
            <div class-"row">
                <div class="border">
                    <img src="${item.img}"
                </div>
                 <div class="middle">
                    <h2>${item.name}<h2>
                    <h2><em>${item.ingredients}</em><h2>
                    <p>£${item.cost}
                </div>
                <div class="border">
                    <i class="fa-solid fa-cart-plus ${purchaseBtnClass}"
                    data-add="${item.id}"
                    ></i>
                </div>
            </div>
        </div>
`
    })
}
renderProducts()

let cart = []

function addToCart(itemId) {
    const targetMenuItem = foodArray.find(product => product.id === Number(itemId))
    if (targetMenuItem) {
        cart.push({
            ...targetMenuItem
        })
    }
}

function removeFromCart(itemId) {
    itemId = Number(itemId)

    const index = cart.findIndex(item => item.id === itemId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    renderCartItems()
}


function renderCartItems() {
    cartItemsEl.innerHTML = ""
    cart.forEach((item) => {
        cartItemsEl.innerHTML += `
        <div class="cart-item">
            <div class="item-info">
                <img src="${item.img}">
                <p><i class="fa-solid fa-square-xmark" data-remove="${item.id}"></i><p>
                <h4>${item.name}<h4>
            </div>
            <div class="unit-price">
                <p>£${item.cost}</p>
            </div>
        </div>`
        })
        orderTotal()
    }

function orderTotal() {
    let totalOrder = 0
    cart.forEach((item) => {
        totalOrder += item.cost
    })
    cartTotal.innerHTML = `
    <p>Order total: £${totalOrder.toFixed(2)}</p>
    <p><i class="fa-solid fa-credit-card" data-buy="${cart}"></i></p>`
}

function finaliseOrder() {
    if (cart.length !== 0){
        purchaseBtn.style.display="block"
    }
}

closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none"
    cart = []
    cartTotal.innerHTML = ""
    cartItemsEl.innerHTML = ""
    location.reload()
})

paymentForm.addEventListener("submit", function() {
    
    const finaliseOrderForm = new FormData (paymentForm)
    const ordererName = finaliseOrderForm.get("fullName")
    const ordererEmail = finaliseOrderForm.get("email")

    innerModal.innerHTML = `
    <i class="fa-solid fa-truck fa-bounce"></i>
    <p>Thank you, <em>${ordererName}</em>, your order will arrive soon.</p>
    <p>A receipt has been sent to ${ordererEmail}<p>`
})

