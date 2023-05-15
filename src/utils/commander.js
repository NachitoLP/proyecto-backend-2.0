const { Command } = require("commander")
const commander = new Command()

commander
    /* .option('-d' , 'Variable de debugs.' , false)
    .option( '-p, --port <port>' , 'Puerto del servidor.' , 8080 ) */
    .option('--mode <mode>' , 'Modo de trabajo.' , 'production')
    /* .requiredOption('-u <user>' , 'Usuario trabajando en el proyecto.' , 'No se ha aclarado el usuario.')
    .option('-l' , '--letters [letters...]' , 'Falta especificar las notas/letras.') */
    .parse()


