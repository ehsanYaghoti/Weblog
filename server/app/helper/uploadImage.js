const multer = require('multer');
const {mkdirp} = require('mkdirp');
const fs = require('fs');
const  { diskStorage }  = require('multer');

const getDirImage = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return `./public/uploads/media/${year}/${month}/${day}`
}

const imageStorage = multer.diskStorage({
    destination :  (req , file  , cb)=>{
         mkdirp(getDirImage())
            .then(first => cb(null , getDirImage()))
            .catch(err => cb(err , null))

    }
    ,filename : (req , file , cb) => {
        let filePath = getDirImage()
        // console.log(file)
        if(! fs.existsSync(filePath)){
            cb(null , file.originalname)
        } else {
            cb(null , Date.now() + '-' + file.originalname )
        }
    }
})


const uploadImage = multer({
    storage : imageStorage,
    // limits : {
    //     fileSize : 1024 * 1024 * 10
    // }
})

module.exports = uploadImage