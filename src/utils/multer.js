const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination: function( req , file, cb ){
        cb(null , path.dirname(__dirname) + '/public/uploads')
    },
    filename: function( req , file , cb ){
        cb(null , file.originalname)
    }
});

const uploaders = multer({storage})
module.exports = {
    uploaders
}