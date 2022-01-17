import { setupProducts } from './products.js'
import { setupShoppingCart } from './shoppingCart.js'
// import { setupShoppingCart } from './shoppingCart.js'

document.addEventListener('click', (e) => {
    const isDropdownButton = e.target.matches('[data-dropdown-button]')

    // if click target is not the hamburger icon and click target is inside the 
    // drop down menu do not do anything
    if (!isDropdownButton && e.target.closest('[data-dropdown]') != null) return

    let activeDropdown 
    if (isDropdownButton) {
        activeDropdown = e.target.closest('[data-dropdown]')
        activeDropdown.classList.toggle('active')
    }

    // closes active dropdowns when clicking outside of the dropdown

    document.querySelectorAll('[data-dropdown].active').forEach(dropdown => {
        if (dropdown === activeDropdown) return
        dropdown.classList.remove('active')
    })
})

setupProducts()
setupShoppingCart()