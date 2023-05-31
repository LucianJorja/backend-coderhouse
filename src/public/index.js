const socketClient = io();

// const form = document.querySelector('#form');
// const nameInput = document.querySelector('#name');
// const priceInput = document.querySelector('#price');
// const descriptionInput = document.querySelector('#description');
// const newProductsList = document.querySelector('#new-products');

// form.addEventListener('submit', (event) => {
//     event.preventDefault();

//     const name = nameInput.value;
//     const price = priceInput.value;
//     const description = descriptionInput.value;

//     const product = {
//         name,
//         price,
//         description
//     };

//     socketClient.emit('newProduct', product);
// });

// socketClient.on('arrayProducts', (products) => {
//     newProductsList.innerHTML = '';
//     for (const product of products) {
//         const productElement = document.createElement('ul');
//         productElement.innerHTML = `
//             <li>${product.name}</li>
//             <li>${product.price}</li>
//             <li>${product.description}</li>
//             <li><button data-id="${product.id}" class="delete-button">Delete</button></li>
//         `;
//         newProductsList.appendChild(productElement);

//         const deleteButton = productElement.querySelector('.delete-button');
//         deleteButton.addEventListener('click', (event) => {
//             const productId = event.target.dataset.id;
//             socketClient.emit('deleteProduct', productId);
//         });
//     }
// });

// socketClient.on('updateDeleteButton', (data) => {
//     const productElement = newProductsList.querySelector(`[data-id="${data.id}"]`);
//     const deleteButton = productElement.querySelector('.delete-button');
//     deleteButton.setAttribute('data-id', data.id);
// });



let username = null;

if(!username){
    Swal.fire({
        title: '¡Welcome to chat!',
        text: 'Insert your username here',
        input: 'text',
        inputValidator: (value)=>{
            if(!value){
                return 'Your username is required'
            }
        }
    }).then((input)=>{
        username = input.value;
        socket.emit('newUser', username);
    });
};

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () =>{
    socket.emit('chat:message', {
        username,
        message: message.value
    });
    message.value = '';
});

socket.on('messages', (data)=>{
    actions.innerHTML = '';
    const chatRender = data.map((msg)=>{
        return `<p><strong>${msg.username}: ${msg.message}<strong></p>`
    }).join(' ')
    output.innerHTML = chatRender
});

socket.on('newUser', (username)=>{
    Toastify({
        text: `🟢 ${username} is logged in`,
        duration: 3000,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true,
    }).showToast();
});

message.addEventListener('keypress', ()=>{
    socket.emit('chat:typing', username);
});

socket.on('chat:typing', (data)=>{
    actions.innerHTML = `<p> ${data} is writting a message... </p>`
})