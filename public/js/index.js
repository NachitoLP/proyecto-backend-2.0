const socket = io()

// CHAT

/* let user
Swal.fire({
    title: 'Registrarse',
    input: "text",
    text: 'Ingrese su nombre y apellido.',
    inputValidator: (value) => {
        return !value && 'Escriba su nombre y apellido para ingresar.'
    },
    allowOutsideClick:false
}).then (resp => {
    user = resp.value
    socket.emit('userAuthenticated' , user)
})

let inputChat = document.getElementById('chat_box')

inputChat.addEventListener('keyup' , evt => {
    if (evt.key === 'Enter') {
        if (inputChat.value.trim().length > 0) {
            socket.emit('message' , {user: user, message: inputChat.value})
            inputChat.value = ''
        }
    }
})

socket.on('messageLogs' , msgArray => {
    let logs = document.getElementById('message_logs')
    let messages = ''
    msgArray.forEach(message => {
        messages += `<b>${message.user}</b>: ${message.message} <br/><br/>` 
    })
    logs.innerHTML = messages
})


socket.on('newUser' , data => {
    if (!user) return 
    Swal.fire({
        title: `${data} joined`,
        toast: true,
        position: "top-right" 
    })
})
 */

// POST REALTIME

let formSubmit = document.getElementById('new_product_submit')
let inputName = document.getElementById('name')
let inputDes = document.getElementById('description')
let inputPrice = document.getElementById('price')
let inputCode = document.getElementById('code')
let inputStock = document.getElementById('stock')

formSubmit.addEventListener('click' , evt => {
    evt.preventDefault()
    if(!inputName.value || !inputDes.value || !inputPrice.value || !inputCode.value || !inputStock.value) {
        return alert("No se completaron todos los datos requeridos.")
    }
    else {
        socket.emit('newProduct' , {
            name: inputName.value,
            description: inputDes.value,
            price: inputPrice.value,
            code: inputCode.value,
            stock: inputStock.value
        })
        inputName.value = ''
        inputDes.value = ''
        inputPrice.value = ''
        inputCode.value = ''
        inputStock.value = ''
    }
    
})

socket.on('newArrayProducts' , data => {
    let divPadre = document.getElementById('div_products_added')
    let products = data.map(product=> `
    <div class="div_product">
        <div>
            <br>
            <h3>${product.name}</h3>
            <p><b>Description:</b> ${product.description}</p>
            <p><b>Price:</b> ${product.price}</p>
            <p><b>Code:</b> ${product.code}</p>
            <p><b>Stock:</b> ${product.stock}</p>
            <p><b>Id:</b> ${product.id}</p>
        </div>
    </div>
    `)

    divPadre.innerHTML = products
})