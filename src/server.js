const { initServer } = require("./app");
const cluster = require('cluster');
const { logger } = require("./utils/logger");
const { cpus } = require('os');
const { Server } = require("socket.io");
const initChatSocket = require("./utils/sockets/chatSocket");

let numProcesadores = cpus().length

if (cluster.isPrimary) {
    logger.info('Proceso primario generando un trabajador.');
    /* for(let i = 0; i < numProcesadores; i++){
        cluster.fork()
    } */
    cluster.on('message' , worker => {
        logger.info(`El worker ${worker.process.pid} dice ${worker.message}.`)
    })
} else {
    logger.info('No cuento como primario, isPrimary = false.')
}

const ioChat = new Server(initServer)
initChatSocket(ioChat)
