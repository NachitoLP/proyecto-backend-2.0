const multer = require('multer');
const path = require('path')

const storage_profile = multer.diskStorage({
    destination: function( req , file, cb ){
        cb(null , path.resolve(__dirname, '../uploads/profiles'))
    },
    filename: function( req , file , cb ){
        cb(null , file.originalname)
    }
})

const profileMulter = multer({storage_profile})

module.exports = {
    profileMulter
}