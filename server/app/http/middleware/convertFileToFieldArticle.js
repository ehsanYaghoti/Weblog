const middleware = require('./middleware');

class convertFileToFieldArticle extends middleware {
  
  handle(req , res , next){

    // console.log(req.file)

    if( req.file === undefined || req.file == null){
      if(req.body.image){
        // console.log(req.body)
        next()
        return
      } else {
        req.body.image = null;
      }
    } else if(req.file !== undefined){
      req.body.image = req.file.filename;
      req.body.imagepath = req.file.path;
    }
    // console.log(req.body)

    next();
  }
}

module.exports = new convertFileToFieldArticle;