const socket = io()
let user
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
