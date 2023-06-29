const winston = require('winston')
const { objConfig } = require('../config/config')

// let enviroment = objConfig.enviroment // No lo acepta
let enviroment = "development"

const customLevelOptions = {
    levels: {
        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        debug: 4
    },
    colors: {
        fatal: 'red',
        error: 'green',
        warning: 'yellow',
        info: 'blue',
        debug: 'white'
    }
}

if (enviroment == "development") {
    exports.logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'debug',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            })
        ]
    })
}
else {
    exports.logger = winston.createLogger({
        levels: customLevelOptions.levels,
        transports: [
            new winston.transports.Console({
                level: 'info',
                format: winston.format.combine(
                    winston.format.colorize({colors: customLevelOptions.colors}),
                    winston.format.simple()
                )
            }),
            new winston.transports.File({
                filename: './errors.log',
                level: 'warning',
                format: winston.format.simple()
            })
        ]
    })
}