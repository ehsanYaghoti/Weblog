const express = require('express');
const router = express.Router();
const CORS = require('cors')

// Controllers
const landingPageController = require('app/http/controller/home/landingPageController');
const articleController = require('app/http/controller/home/articleController');
const podcastController = require('app/http/controller/home/podcastController');
const postController = require('app/http/controller/home/postController');
const commentController = require('app/http/controller/home/commentController');
const answerController = require('app/http/controller/home/answerController');
const likeController = require('app/http/controller/home/likeController');
const saveController = require('app/http/controller/home/saveController');
const tagController = require('app/http/controller/home/tagController');
const userController = require('../../http/controller/userController');
const searchController = require('app/http/controller/home/searchController');

// Validators
const postValidator = require('app/http/validator/postValidator');
const userValidator = require('app/http/validator/userValidator');

// Middlewares
const convertFileToFieldUser = require('app/http/middleware/convertFileToFieldUser');

// Helpers
const upload = require('app/helper/uploadImage')
const uploadSound = require('app/helper/uploadSound')



// CORS
let whitelist = ['http://localhost:3000' , 'http://localhost:5000']
let corsOptions = {
  origin: ['http://localhost:3000' , 'http://localhost:5000' , 'http://192.168.43.198:3000' , 'http://26.44.39.27:3000'] ,
  allowedHeaders : ['Content-Type' ,'Authorization' , 'Origin' , 'Access-Control-Allow-Origin'],
  credentials : true,
  methods : 'GET,PUT,POST,DELETE'
}


// Landing page
router.options('/' , CORS(corsOptions))
router.get('/' , CORS(corsOptions)  , landingPageController.index )


// likes vote Routes
router.post('/like' , CORS(corsOptions)  , likeController.likeProcess )
router.delete('/like/:id/:kind/:single/:moreData' , likeController.disLikeProcess);

// saves Routes
router.post('/save' , CORS(corsOptions)  , saveController.saveProcess )
router.delete('/save/:id/:kind/:single/:moreData' , saveController.unSaveProcess);

// articles routes
router.get('/articles' , CORS(corsOptions) , articleController.someArticle )
router.get('/articles/:slug' , CORS(corsOptions)  , articleController.singleArticle)

// podcasts routes
router.get('/podcasts' , CORS(corsOptions) , podcastController.somePodcast )
router.get('/podcasts/:slug' , CORS(corsOptions)  , podcastController.singlePodcast)

//  comments routes
router.post('/comment' , CORS(corsOptions) , commentController.create )

// posts routes
router.get('/posts' , CORS(corsOptions) , postController.somePost )
router.get('/posts/:slug' , CORS(corsOptions)  , postController.singlePost)
router.post('/posts/report' , CORS(corsOptions)  , postController.report)


//  answers routes
router.post('/answer/create' , CORS(corsOptions) , answerController.create )
router.post('/answer/report' , CORS(corsOptions)  , answerController.report)


// tags route
router.get('/tags' , CORS(corsOptions) , tagController.allTags);
router.get('/tag/:slug' , CORS(corsOptions) , tagController.singleTag);
router.put('/tags/follow/:id' , CORS(corsOptions) , tagController.followTag)
router.put('/tags/unfollow/:id' , CORS(corsOptions) , tagController.unFollowTag)

// user routeds
router.get('/user' , CORS(corsOptions) , userController.checkAuth )

router.get('/user/dashboard/:id' , CORS(corsOptions) , userController.dashboard )
router.get('/user/panel' , CORS(corsOptions) , userController.panel )
router.put('/user/panel/profile/:id/update' , CORS(corsOptions) , upload.single('avatar') , convertFileToFieldUser.handle , userValidator.handle()  , userController.updateInfo )

router.put('/user/follow/:id' , CORS(corsOptions) , userController.followUser)
router.put('/user/unfollow/:id' , CORS(corsOptions) , userController.unFollowUser)


// post routes
router.options('/posts/create' , CORS(corsOptions))
router.post('/posts/create' , CORS(corsOptions)  ,  postValidator.handle() , postController.create);


// search

router.get('/search/:search' , CORS(corsOptions)  , searchController.search )



module.exports = router;