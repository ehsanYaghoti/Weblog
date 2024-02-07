const middleware = require('./middleware');

class convertFileToField extends middleware {
  
  async handle(req , res , next){
    // console.log(req.files['sound'] !== undefined  )
    // console.log(req.body)
    if( req.file === undefined || req.file == null){
      // req.body.avatar = null;
      if(req.body.avatar){
        // console.log(req.body)
        next()
        return
      } else {
        req.body.avatar = null;
      }
    }else if(req.file !== undefined){
      
      req.body.avatar = req.file.filename;
      req.body.avatarpath = req.file.path;

    }
    // console.log(req.body)
    console.log('go next')

    next();
  }
}

module.exports = new convertFileToField;