document.addEventListener('DOMContentLoaded', () => {
    const items = {
        1: {
            name: 'Elza',
            description: 'Kad jūties emocionāli pārņemts vai sasprindzis, Elza ar savām ledus spējām palīdz "atvēsināt" emocijas, ļaujot tev rast mieru un koncentrēties uz risinājumu.',
            image: '/Images/Photos/elsa.webp',
            backgroundClass: 'recommended-bee-board-cont-elsa'
        },
        2: {
            name: 'Harijs Potters',
            description: 'Harijs Potters ir pazīstams ar savu drosmi un lojalitāti. Viņš iedvesmo mūs stāties pretī izaicinājumiem un aizstāvēt savus draugus.',
            image: '/Images/Photos/harry-potter.webp',
            backgroundClass: 'recommended-bee-board-cont-potter'
        },
        3: {
            name: 'Stičs',
            description: 'Stičs ir jautrs un enerģisks, vienmēr gatavs piedzīvojumiem. Viņš atgādina mums par draudzības un ģimenes nozīmi.',
            image: '/Images/Photos/stitch.webp',
            backgroundClass: 'recommended-bee-board-cont-stitch'
        },
        4: {
            name: 'Laime',
            description: 'Laime ir prieka un pozitīvisma iemiesojums. Viņa palīdz mums saskatīt labo katrā dienā un izbaudīt dzīves mazās lietas.',
            image: '/Images/Photos/joy.webp',
            backgroundClass: 'recommended-bee-board-cont-joy'
        }
    };

    // Extract the item ID from the URL query parameters
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = parseInt(urlParams.get('id'), 10);

    const item = items[itemId];
    if (item) {
        const titleElement = document.querySelector('.product-title');
        const descriptionElement = document.querySelector('.product-description');
        const imageElement = document.querySelector('.product-image');
        const containerElement = document.querySelector('.recommended-bee-board-cont');
        const addToCartButton = document.querySelector('.btn-cart');

        if (titleElement && descriptionElement && imageElement && containerElement && addToCartButton) {
            titleElement.textContent = item.name;
            descriptionElement.textContent = item.description;
            imageElement.src = item.image;
            imageElement.alt = item.name;
            containerElement.classList.add(item.backgroundClass);

            // Update the addToCart button to use the current item's details
            addToCartButton.setAttribute('onclick', `addToCart('${item.name}', 29.99, '${item.image}')`);
        } else {
            console.error('One or more elements not found in the DOM.');
        }
    } else {
        console.error('Item not found for ID:', itemId);
    }
});