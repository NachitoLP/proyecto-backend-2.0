const { Schema , model } = require('mongoose')

const collection = 'jwtTokens';

const jwtSchema = new Schema({
    resetToken: String    
});

const jwtModel = model(collection , jwtSchema)

module.exports = {
    jwtModel
}