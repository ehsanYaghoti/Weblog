const Controller = require('../controller')
const User = require('app/models/user');
const Permission = require('app/models/permission');
const Role = require('app/models/role');
const Article = require('app/models/article');
const Podcast = require('app/models/podcast');
const Comment = require('app/models/comment');
const Post = require('app/models/post');
const Answer = require('app/models/answer');
const Category = require('app/models/category');
const Tag = require('app/models/tag');



class adminController extends Controller {
    async maindashboard(req , res){
        try {
            
            const usersCount = await User.countDocuments({})
            const usersAdminCount = await User.countDocuments({admin : true})
            const permissionsCount = await Permission.countDocuments({})
            const rolesCount = await Role.countDocuments({})
            const articlesCount = await Article.countDocuments({})
            const podcastsCount = await Podcast.countDocuments({})
            const commentsCount = await Comment.countDocuments({})
            const postsCount = await Post.countDocuments({})
            const answersCount = await Answer.countDocuments({})
            const categorysCount = await Category.countDocuments({})
            const tagsCount = await Tag.countDocuments({})





            res.json({
                data : {
                    usersCount,
                    usersAdminCount,
                    permissionsCount,
                    rolesCount,
                    articlesCount,
                    podcastsCount,
                    commentsCount,
                    postsCount,
                    answersCount,
                    categorysCount,
                    tagsCount,
                    user : {
                        isAuthenticated : req.isAuthenticated(),
                        user : req.user      
                    }
                },
                success: true
            })
          } catch(err){
            res.json({
              messages : err,
              success: false
            })
        }
    }


    uploaded(req , res , next){
        try {
            return res.json({
                data : req.body,
                success  : true
              })
        } catch (err) {
            console.log(err);
            this.apiError(500 , 'server err')
            next(err);
        }
    }
}

module.exports = new adminController();