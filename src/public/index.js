const socketClient = io();

const form = document.querySelector('#form');
const nameInput = document.querySelector('#name');
const priceInput = document.querySelector('#price');
const descriptionInput = document.querySelector('#description');
const newProductsList = document.querySelector('#new-products');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = nameInput.value;
    const price = priceInput.value;
    const description = descriptionInput.value;

    const product = {
        name,
        price,
        description
    };

    socketClient.emit('newProduct', product);
});

socketClient.on('arrayProducts', (products) => {
    newProductsList.innerHTML = '';
    for (const product of products) {
        const productElement = document.createElement('ul');
        productElement.innerHTML = `
            <li>${product.name}</li>
            <li>${product.price}</li>
            <li>${product.description}</li>
            <li><button data-id="${product.id}" class="delete-button">Delete</button></li>
        `;
        newProductsList.appendChild(productElement);

        const deleteButton = productElement.querySelector('.delete-button');
        deleteButton.addEventListener('click', (event) => {
            const productId = event.target.dataset.id;
            socketClient.emit('deleteProduct', productId);
        });
    }
});

socketClient.on('updateDeleteButton', (data) => {
    const productElement = newProductsList.querySelector(`[data-id="${data.id}"]`);
    const deleteButton = productElement.querySelector('.delete-button');
    deleteButton.setAttribute('data-id', data.id);
});

