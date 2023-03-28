const { Router } = require('express');

const viewSocket = Router();

viewSocket.get('/' , ( req , res ) => {
    res.render('chat' , {})
})

module.exports = {
    viewSocket
}