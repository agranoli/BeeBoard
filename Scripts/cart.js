const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(name, price, image) {
    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price, quantity: 1, image });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${name} has been added to your cart.`);
}
function proceedToPayment() {
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }
    // Redirect to payment processing
    window.location.href = 'checkout.html';
}
function renderCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    cartItemsElement.innerHTML = '';

    cartItems.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${item.image}" alt="${item.name}" height="70">
                ${item.name}
            </td>
            <td>${item.price}€</td>
            <td>
                <div class="quantity-container">
                    <button class="quantity-button" onclick="updateQuantity('${item.name}', -1)">-</button>
                        <span>${item.quantity}</span>
                    <button class="quantity-button" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </td>
            <td>${item.price * item.quantity}€</td>
            <td><button class="remove-button" onclick="removeItem('${item.name}')">×</button></td>
        `;
        cartItemsElement.appendChild(row);
    });

    updateTotals();
}

function updateQuantity(name, change) {
    const item = cartItems.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeItem(name);
        } else {
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            renderCartItems();
        }
    }
}

function removeItem(name) {
    const index = cartItems.findIndex(item => item.name === name);
    if (index !== -1) {
        cartItems.splice(index, 1);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        renderCartItems();
    }
}

function updateTotals() {
    const subtotalElement = document.getElementById('subtotal');
    const totalElement = document.getElementById('total-price');
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const delivery = 24; // Example delivery cost
    const total = subtotal + delivery;

    subtotalElement.textContent = `${subtotal}€`;
    totalElement.textContent = `${total}€`;
}

document.addEventListener('DOMContentLoaded', renderCartItems);