const middleware = require('./middleware');

class convertFileToField extends middleware {
  
  async handle(req , res , next){
    // console.log(req.files['sound'] !== undefined  )
    if(! req.files){
      req.body.image = null;
      req.body.sound = null;

    }else if(req.files['image'] !== undefined &&  req.files['sound'] !== undefined ){
      
      req.body.image = req.files['image'][0].filename;
      req.body.imagepath = req.files['image'][0].path;

      req.body.sound = req.files['sound'][0].filename;
      req.body.soundpath = req.files['sound'][0].path;
    }
    // console.log(req.body)
    console.log('go next')

    next();
  }
}

module.exports = new convertFileToField;