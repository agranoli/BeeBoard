document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    console.log('Item ID from URL:', itemId);

    const items = {
        1: {
            name: 'Elza',
            description: 'Kad jūties emocionāli pārņemts vai sasprindzis, Elza ar savām ledus spējām palīdz "atvēsināt" emocijas, ļaujot tev rast mieru un koncentrēties uz risinājumu. Viņa dod spēku saglabāt vēsu prātu un skaidri saskatīt, kā rīkoties pat sarežģītās situācijās.',
            image: './Images/Photos/elsa.webp',
            backgroundClass: 'recommended-bee-board-cont-elsa'
        },
        2: {
            name: 'Harijs Potters',
            description: 'Harijs Potters ir pazīstams ar savu drosmi un lojalitāti. Viņš iedvesmo mūs stāties pretī izaicinājumiem un aizstāvēt savus draugus.',
            image: './Images/Photos/harry-potter.webp',
            backgroundClass: 'recommended-bee-board-cont-potter'
        },
        3: {
            name: 'Stičs',
            description: 'Stičs ir jautrs un enerģisks, vienmēr gatavs piedzīvojumiem. Viņš atgādina mums par draudzības un ģimenes nozīmi.',
            image: './Images/Photos/stitch.webp',
            backgroundClass: 'recommended-bee-board-cont-stitch'
        },
        4: {
            name: 'Laime',
            description: 'Laime ir prieka un pozitīvisma iemiesojums. Viņa palīdz mums saskatīt labo katrā dienā un izbaudīt dzīves mazās lietas.',
            image: './Images/Photos/joy.webp',
            backgroundClass: 'recommended-bee-board-cont-joy'
        }
    };

    const item = items[itemId];
    console.log('Retrieved item:', item);

    if (item) {
        const titleElement = document.querySelector('.product-title');
        const descriptionElement = document.querySelector('.product-description');
        const imageElement = document.querySelector('.product-image');
        const containerElement = document.querySelector('.recommended-bee-board-cont');

        if (titleElement && descriptionElement && imageElement && containerElement) {
            titleElement.textContent = item.name;
            descriptionElement.textContent = item.description;
            imageElement.src = item.image;
            imageElement.alt = item.name;
            containerElement.classList.add(item.backgroundClass);
        } else {
            console.error('One or more elements not found in the DOM.');
        }
    } else {
        console.error('Item not found for ID:', itemId);
    }
});