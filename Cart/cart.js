let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

function addToCart(name, price, image) {
    if (typeof name !== 'string' || name.trim() === '') {
        console.error('Invalid name:', name);
        return;
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
        console.error('Invalid price for item:', name);
        return;
    }

    if (typeof image !== 'string' || image.trim() === '') {
        console.error('Invalid image URL:', image);
        return;
    }

    const existingItem = cartItems.find(item => item.name === name);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cartItems.push({ name, price: parsedPrice, quantity: 1, image });
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    alert(`${name} has been added to your cart.`);
    renderCartItems();
}

function updateTotals() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + 24; // Assuming 24€ is the fixed delivery cost

    document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)}€`;
    document.getElementById('total-price').textContent = `${total.toFixed(2)}€`;
}

function renderCartItems() {
    const cartItemsElement = document.getElementById('cart-items');
    if (!cartItemsElement) {
        return;
    }

    cartItemsElement.innerHTML = '';

    cartItems.forEach(item => {
        // Check if the box image version exists
        const boxImage = item.image.replace('.webp', '-box.webp');
        checkImageExists(boxImage, (exists) => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>
                <img src="${exists ? boxImage : item.image}" alt="${item.name}" height="70">
                ${item.name}
            </td>
            <td>${item.price.toFixed(2)}€</td>
            <td>
                <div class="quantity-container">
                    <button class="quantity-button" onclick="updateQuantity('${item.name}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-button" onclick="updateQuantity('${item.name}', 1)">+</button>
                </div>
            </td>
            <td>${(item.price * item.quantity).toFixed(2)}€</td>
            <td><button class="remove-button" onclick="removeItem('${item.name}')">×</button></td>
        `;
            cartItemsElement.appendChild(row);
        });
    });

    updateTotals();
}

function checkImageExists(url, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = url;
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

function proceedToPayment() {
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const total = subtotal + 24; // Assuming 24€ is the fixed delivery cost

    fetch('/process_payment.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: total * 100 }) // Convert to cents
    })
        .then(response => response.json())
        .then(data => {
            const clientSecret = data.clientSecret;
            window.location.href = `/checkout.html?clientSecret=${clientSecret}`;
        })
        .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', () => {
    renderCartItems();
});