let cart = [];
let total = 0;

// Add to cart function
function addToCart(item, price) {
    // Check if item already exists
    let existingItem = cart.find(product => product.item === item);
    if (existingItem) {
        existingItem.quantity++;
        total += price;
    } else {
        cart.push({ item, price, quantity: 1 });
        total += price;
    }
    displayCart();
}

// Display cart items
function displayCart() {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";
    cart.forEach((product, index) => {
        cartItems.innerHTML += `
      <li>
        ${product.item} - ₹${product.price} x ${product.quantity}
        <button onclick="increaseQuantity(${index})">+</button>
        <button onclick="decreaseQuantity(${index})">-</button>
        <button onclick="removeItem(${index})">Remove</button>
      </li>`;
    });
    document.getElementById("total").innerText = total;
}

// Increase quantity
function increaseQuantity(index) {
    cart[index].quantity++;
    total += cart[index].price;
    displayCart();
}

// Decrease quantity
function decreaseQuantity(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
        total -= cart[index].price;
    } else {
        removeItem(index);
    }
    displayCart();
}

// Remove item
function removeItem(index) {
    total -= cart[index].price * cart[index].quantity;
    cart.splice(index, 1);
    displayCart();
}

// Search bar filter
document.getElementById("search-bar").addEventListener("keyup", function() {
    let searchValue = this.value.toLowerCase();
    let products = document.querySelectorAll(".product");

    products.forEach(product => {
        let itemName = product.querySelector("h2").innerText.toLowerCase();
        if (itemName.includes(searchValue)) {
            product.style.display = "block";
        } else {
            product.style.display = "none";
        }
    });
});