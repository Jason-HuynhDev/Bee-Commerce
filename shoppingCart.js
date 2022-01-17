import hives from './hives.json' assert {type: 'json'}
import formatCurrency from './util/formattCurrency.js'
import addGlobalEventListener from './util/addGlobalEventListener.js'


const cartItemTemplate = document.querySelector('#cart-product-template')
const shoppingCartContainer = document.querySelector('[data-cart-container]')
const cartQuantity = document.querySelector('[data-cart-quantity]')
const cartTotal = document.querySelector('[data-cart-total]')
const cart = document.querySelector('[data-cart]')
const SESSION_STORAGE_KEY = 'SHOPPING_CART-cart'
let shoppingCart = loadCart()

export function setupShoppingCart() {
    addGlobalEventListener('click', '[data-remove-from-cart-button]', (e) => {
        const id = parseInt(e.target.closest('[data-product]').dataset.productId)
        removeFromCart(id)
    })

    renderCart()
}

function saveCart() {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(shoppingCart))
}

function loadCart() {
    const cart = sessionStorage.getItem(SESSION_STORAGE_KEY)
    return JSON.parse(cart) || []
}
export function addToCart(id) {
    const existingProduct = shoppingCart.find(entry => entry.id === id )
    if(existingProduct) {
        existingProduct.quantity++
    } else {
       shoppingCart.push({ id: id, quantity: 1 }) 
    }
    renderCart()
    saveCart()
}

function removeFromCart(id) {
    const existingProduct = shoppingCart.find(entry => entry.id === id )
    if (existingProduct == null) return
    shoppingCart = shoppingCart.filter(entry => entry.id !== id)
    renderCart()
    saveCart()
}

function renderCart() {
    if (shoppingCart.length === 0) {
        hideCart()
    } else {
        showCart()
        renderCartItems()
    }
}

function hideCart() {
    cart.classList.add('invisible')
}

function showCart() {
    cart.classList.remove('invisible')
}

function renderCartItems() {
    shoppingCartContainer.innerHTML = ''
    cartQuantity.innerText = shoppingCart.length
    const total = shoppingCart.reduce((sum, entry) => {
        const hive = hives.find(hive => entry.id === hive.id)
        return sum + hive.price * entry.quantity
    }, 0)
    cartTotal.innerText = formatCurrency(total / 100 )

    shoppingCart.forEach( entry => {
        
        const hive = hives.find(hive => entry.id === hive.id)
        const cartItem = cartItemTemplate.content.cloneNode(true)

        const container = cartItem.querySelector('[data-product]')
        container.dataset.productId = hive.id

        const hiveColor = cartItem.querySelector('[data-hive-color]')
        hiveColor.style.fill = hive.fillColor

        const name = cartItem.querySelector('[data-name]')
        name.innerText = hive.name

        if(entry.quantity > 1) {
            const quantity = cartItem.querySelector('[data-quantity]')
            quantity.innerText = `x${entry.quantity}`
        }
        
        const price = cartItem.querySelector('[data-price]')
        price.innerText = formatCurrency(hive.price * entry.quantity / 100 )

        shoppingCartContainer.appendChild(cartItem)
    })
}