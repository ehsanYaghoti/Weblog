const multer = require('multer');
const {mkdirp} = require('mkdirp');
const fs = require('fs');
const  { diskStorage }  = require('multer');


const getDirSound = () => {
    let year = new Date().getFullYear();
    let month = new Date().getMonth() + 1;
    let day = new Date().getDate();

    return `./public/uploads/sounds/${year}/${month}/${day}`
}

// console.log(diskStorage.name)

const soundStorage = multer.diskStorage({
    destination :  (req , file  , cb)=>{
        mkdirp(getDirSound())
        .then(first => cb(null , getDirSound()))
        .catch(err => cb(err , null))

    }
    ,filename : (req , file , cb) => {
        let filePath = getDirSound()
        // console.log(file)
        if(! fs.existsSync(filePath)){
            cb(null , file.originalname)
        } else {
            cb(null , Date.now() + '-' + file.originalname )
        }
    }
})

const uploadSound =  multer({
    storage : soundStorage,

})


module.exports = uploadSound