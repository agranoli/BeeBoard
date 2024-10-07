// item-details.js

// Function to get query parameter from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Fetch the item ID from the URL
const itemId = getQueryParameter('id');

// Define the item details for each item
const itemDetails = {
    1: {
        name: 'Goofy',
        img: './Images/Photos/goofy.png',
        description: 'This is Goofy. A lovable cartoon character.'
    },
    2: {
        name: 'Donald Duck',
        img: './Images/Photos/donald.png',
        description: 'Donald Duck is a classic Disney character.'
    }
    // Add more items as needed
};

// Get the item details based on the ID from the URL
const item = itemDetails[itemId];

// If the item exists, dynamically populate the page with the item's details
if (item) {
    document.querySelector('.recommended-h').textContent = item.name;
    document.querySelector('.recommended-p').textContent = item.description;
    document.querySelector('.popular-image').src = item.img;
    document.querySelector('.popular-image').alt = item.name;
} else {
    document.querySelector('.recommended-h').textContent = 'Item not found';
    document.querySelector('.recommended-p').textContent = 'This item does not exist or has been removed.';
    document.querySelector('.popular-image').src = '';
    document.querySelector('.popular-image').alt = 'No image';
}
