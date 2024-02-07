const middleware = require('./middleware');

class convertFileToField extends middleware {
  
  async handle(req , res , next){
   
    if(req.files['image'] !== undefined){
      req.body.image = req.files['image'][0].filename;
      req.body.imagepath = req.files['image'][0].path;
    }

    if(req.files['sound'] !== undefined ){
      req.body.sound = req.files['sound'][0].filename;
      req.body.soundpath = req.files['sound'][0].path;
    }

    // console.log(req.body)
    console.log('go next')

    next();
  }
}

module.exports = new convertFileToField;