// Modules
const router = require('express').Router()
const CORS = require('cors')


// Controllers
const adminController = require('app/http/controller/admin/adminController');
const userController = require('app/http/controller/admin/userController');
const permissionController = require('app/http/controller/admin/permissionController');
const roleController = require('app/http/controller/admin/roleController');
const articleController = require('app/http/controller/admin/articleController');
const podcastController = require('app/http/controller/admin/podcastController');
const commentController = require('app/http/controller/admin/commentController');
const postController = require('app/http/controller/admin/postController');
const answerController = require('app/http/controller/admin/answerController');
const likeController = require('app/http/controller/admin/likeController');
const saveController = require('app/http/controller/admin/saveController');
const categoryController = require('app/http/controller/admin/categoryController');
const tagController = require('app/http/controller/admin/tagController');
const reportController = require('app/http/controller/admin/reportController');




// Validators
const registerValidator = require('app/http/validator/registerValidator');
const editUserValidator = require('app/http/validator/editUserValidator');
const permissionValidator = require('app/http/validator/permissionValidator');
const roleValidator = require('app/http/validator/roleValidator');
const articleValidator = require('app/http/validator/articleValidator');
const podcastValidator = require('app/http/validator/podcastValidator');

const postValidator = require('app/http/validator/postValidator');

const reportValidator = require('app/http/validator/reportValidator');
const categoryValidator = require('app/http/validator/categoryValidator');
const tagValidator = require('app/http/validator/tagValidator');
const tagValidatorCreatejs = require('../../http/validator/tagValidatorCreatejs');







// Middlewares
const apiAuthJWT = require('app/http/middleware/apiAuthJWT');
const convertFileToField = require('app/http/middleware/convertFileToField');
const convertFileToFieldUpdate = require('app/http/middleware/convertFileToFieldUpdate');
const convertFileToFieldArticle = require('app/http/middleware/convertFileToFieldArticle');


// Helpers
const upload = require('app/helper/uploadImage')
const uploadSound = require('app/helper/uploadSound');
const checkUserRole = require('../../http/middleware/redirectIfNotHaveTheRole');

// 
//  Routes
// 

// CORS Configuration
let whitelist = [ 'http://weblogg.ir' , 'https://weblog-client.onrender.com' , 'http://localhost:3000' , 'http://localhost:5000']
let corsOptions = {
  origin:  whitelist ,
  allowedHeaders : ['Content-Type' ,'Authorization' , 'Referer' , 'Origin' , 'Access-Control-Allow-Origin'],
  credentials : true,
  methods : 'GET,PUT,POST,DELETE'

}


// main Route

router.get('/dashboard' , CORS(corsOptions)   ,  adminController.maindashboard )

router.get('/'   ,(req , res)=>{ 
  // console.log('admin page')
  // return res.json(req.user)
  res.redirect('http://localhost:3000/admin')
})

//  
// Upload Image
// 

router.post('/upload' , CORS(corsOptions)  , upload.single('image') , convertFileToField.handle , adminController.uploaded)

// 
// Article Routes
// 



router.get('/articles'   , CORS(corsOptions) , checkUserRole(['writer' , 'article writer' , 'manager']) , articleController.index);

router.options('/articles/create' , CORS());
router.post('/articles/create' , CORS(corsOptions) , upload.single('image') , convertFileToFieldArticle.handle , articleValidator.handle() , articleController.create);

router.options('/articles/edit' , CORS());
router.get('/articles/edit/:id' , CORS(corsOptions) , articleController.updateForm);

router.options('/articles/:id/update' , CORS(corsOptions) );
router.put('/articles/:id/update'  , CORS(corsOptions)  , upload.single('image') , convertFileToFieldArticle.handle , articleValidator.handle() , articleController.update);

router.options('/articles/:id' , CORS());
router.delete('/articles/:id' , CORS(corsOptions) , articleController.delete);



// 
// Podcasts Routes
// 

// router.get('/books'   , CORS(corsOptions) , bookController.index);
router.get('/podcasts'   , CORS(corsOptions) , checkUserRole(['podcastWriter' , 'manager' ,'writer' ])  , podcastController.index);

// upload.single('image') , convertFileToField.handle ,
// router.post('/podcasts/create' , CORS(corsOptions) , uploadSound.single('sound') , convertFileToFieldSound.handle  , upload.single('image') , convertFileToField.handle ,   podcastValidator.handle() , podcastController.create);
router.post('/podcasts/create' , CORS(corsOptions)   , upload.fields([{ name: 'sound', maxCount: 1 }, { name: 'image', maxCount: 1 }]) , convertFileToField.handle ,   podcastValidator.handle() , podcastController.create);

// .fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
router.get('/podcasts/edit/:id' , CORS(corsOptions) , podcastController.updateForm);

router.options('/podcasts/:id/update' , CORS(corsOptions) );
router.put('/podcasts/:id/update'  , CORS(corsOptions) , upload.fields([{ name: 'sound', maxCount: 1 }, { name: 'image', maxCount: 1 }]) , convertFileToFieldUpdate.handle , podcastValidator.handle() , podcastController.update);

router.options('/podcasts/:id' , CORS());
router.delete('/podcasts/:id' , CORS(corsOptions) , podcastController.delete);


// 
// Comments Routes
// 

router.get('/comments' , CORS(corsOptions) , commentController.index);
// router.get('/comments/approve' , commentController.approved);
router.put('/comments/:id/approve' , commentController.update);
router.delete('/comments/:id' , commentController.delete);



// 
// Posts Routes
// 
router.get('/posts'   , CORS(corsOptions) , postController.index);


router.post('/posts/create' , CORS(corsOptions)  ,  postValidator.handle() , postController.create);

router.get('/posts/edit/:id' , CORS(corsOptions) , postController.updateForm);

router.options('/posts/:id/update' , CORS(corsOptions) );
router.put('/posts/:id/update'  , CORS(corsOptions)  , postValidator.handle() , postController.update);

router.options('/posts/:id' , CORS());
router.delete('/posts/:id' , CORS(corsOptions) , postController.delete);


// 
// Answers Routes
// 

router.get('/answers' , CORS(corsOptions) , answerController.index);
// router.get('/comments/approve' , answerController.approved);
router.put('/answers/:id/approve' , answerController.update);
router.delete('/answers/:id' , answerController.delete);

// 
// likes Routes
// 

router.get('/likes' , CORS(corsOptions) , likeController.index);
router.delete('/likes/:id' , likeController.delete);

// 
// saves Routes
// 

router.get('/saves' , CORS(corsOptions) , saveController.index);
router.delete('/saves/:id' , saveController.delete);

// 
// Reprts Routes
// 
router.get('/reports' , CORS(corsOptions) , reportController.index);

router.post('/report/create' , CORS(corsOptions) , reportValidator.handle() , reportController.create);

router.get('/report/edit/:id' , CORS(corsOptions) , reportController.updateForm);

router.options('/report/:id/update' , CORS(corsOptions) );
router.put('/report/:id/update'  , CORS(corsOptions) , reportValidator.handle()  , reportController.update);

router.options('/reports/:id' , CORS());
router.delete('/reports/:id' , CORS(corsOptions) , reportController.delete);



// router.get('/comments/approve' , reportController.approved);



// 
// Categories Routes
// 

router.get('/category'   , CORS(corsOptions) , categoryController.index);

router.options('/category/create' , CORS())
router.post('/category/create' , CORS(corsOptions) , categoryValidator.handle()  , categoryController.create);

router.get('/category/edit/:id' , CORS(corsOptions)   , categoryController.updateForm);

router.options('/category/:id/update' , CORS() )
router.put('/category/:id/update', CORS(corsOptions) , categoryValidator.handle() , categoryController.update);

router.options('/category/:id', CORS())
router.delete('/category/:id' , CORS(corsOptions) , categoryValidator.handle()  , categoryController.delete);

// 
// Tags Routes
// 

router.get('/tags'   , CORS(corsOptions) , tagController.index);

router.options('/tag/create' , CORS())
router.post('/tag/create' , CORS(corsOptions) , tagValidatorCreatejs.handle()  , tagController.create);

router.get('/tag/edit/:id' , CORS(corsOptions)   , tagController.updateForm);

router.options('/tag/:id/update' , CORS() )
router.put('/tag/:id/update', CORS(corsOptions) , tagValidator.handle() , tagController.update);

router.options('/tag/:id', CORS())
router.delete('/tag/:id' , CORS(corsOptions) , tagValidator.handle()  , tagController.delete);



// 
// Users Routes
//  

router.get('/user'  , CORS(corsOptions) , checkUserRole(['manager'])  , userController.index);

router.options('/user/create', CORS())
router.post('/user/create'  , CORS(corsOptions) , registerValidator.handle() , userController.createProcess)

router.options('/user/:id', CORS())
router.delete('/user/:id' , CORS(corsOptions) ,  userController.delete)

router.get('/user/edit/:id' , CORS(corsOptions) , userController.editForm)

router.options('/user/edit/:id', CORS())
router.put('/user/edit/:id' , CORS(corsOptions), editUserValidator.handle() , userController.editProcess)

router.options('/user/admin', CORS())
router.put('/user/admin' , CORS(corsOptions) , userController.setAdmin)


// 
// Permission Routes
// 


router.get('/permissions'   , CORS(corsOptions) , checkUserRole(['manager'])  , permissionController.index);

router.options('/permissions/create' , CORS());
router.post('/permissions/create' , CORS(corsOptions)  , permissionValidator.handle() , permissionController.create);

router.get('/permissions/edit/:id' , CORS(corsOptions) , permissionController.updateForm);

router.options('/permissions/:id/update' , CORS(corsOptions) );
router.put('/permissions/:id/update'  , CORS(corsOptions) , permissionValidator.handle() , permissionController.update);

router.options('/permissions/:id' , CORS());
router.delete('/permissions/:id' , CORS(corsOptions) , permissionController.delete);

// 
// Role Routes
// 


router.get('/roles'   , CORS(corsOptions)  , checkUserRole(['manager'])  , roleController.index);

router.options('/roles/create' , CORS());
router.post('/roles/create' , CORS(corsOptions)  , roleValidator.handle() , roleController.create);

router.get('/roles/edit/:id' , CORS(corsOptions) , roleController.updateForm);

router.options('/roles/:id/update' , CORS(corsOptions) );
router.put('/roles/:id/update'  , CORS(corsOptions) , roleValidator.handle() , roleController.update);

router.options('/roles/:id' , CORS());
router.delete('/roles/:id' , CORS(corsOptions) , roleController.delete);

module.exports = router;