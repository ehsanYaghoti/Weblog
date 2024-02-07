const autoBind = require('auto-bind');
const path = require('path');
const config = require('./../config')

module.exports = class Helper {
    constructor(req , res){
        autoBind(this)
        this.req = req;
        this.res = res;
        this.formData = req.flash('formData')[0]
    }

    getObject() {
        return {
            req : this.req ,
            ...this.getGlobalVaribales(),
            old : this.old,
            viewPath : this.viewPath

        }
    }


    getGlobalVaribales(){
        // console.log(this.req.flash('validationMessage'))
        return {
            validErrors : this.req.flash('validationMessage')
        }
    }

    // viewPath(dir) {
    //     return path.resolve(config.layout.view_dir + '/' + dir)
    // }

    // Path(dir) {
    //     return path.resolve(config.layout.view_dir + '/' + dir)
    // }

    old(fieldName){
      if(this.formData && this.formData.hasOwnProperty(fieldName)){
            return this.formData[fieldName] 
        }
    }
}