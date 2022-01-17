import hives from './hives.json' assert {type: 'json'}
import { addToCart } from './shoppingCart.js'
import addGlobalEventListener from './util/addGlobalEventListener.js'
import formatCurrency from './util/formattCurrency.js'


const productItemTemplate = document.querySelector('#product-template')
const productsContainer = document.querySelector('[data-products-container]')

export function setupProducts() {
    if (productsContainer == null) return
    addGlobalEventListener('click', '[data-add-to-cart-button]', (e)=> {
        const id = e.target.closest('[data-store-product]').dataset.productId
        addToCart(parseInt(id))
    })
    
    hives.forEach(renderProductItem)
}

function renderProductItem(hive) {
    const productItem = productItemTemplate.content.cloneNode(true)

    const container = productItem.querySelector('[data-store-product]')
    container.dataset.productId = hive.id

    const hiveColor = productItem.querySelector('[data-hive-color]')
    hiveColor.style.fill = hive.fillColor

    const name = productItem.querySelector('[data-name]')
    name.innerText = hive.name

    const price = productItem.querySelector('[data-price]')
    price.innerText = formatCurrency(hive.price / 100)

    productsContainer.appendChild(productItem)
}