const Controller = require("../controller");
const Post = require("app/models/post");
const Category = require("app/models/category");
const Tag = require("app/models/tag");
const Report = require("app/models/report");
const User = require("app/models/user");

class postController extends Controller {
  async create(req, res) {
    try {
      const result = this.validationData(req, res);
      if (!result) {
        return res.json({
          success: result,
          messages: req.flash("validationMessage"),
        });
      }

      const input = {
        ...req.body,
        slug: this.slug(req.body.title),
        user: req.user._id,
      };

      console.log(req.body.tags);

      // let tagsArray = req.body.tags.split(',')

      // let images = this.imageResize(req.file)
      const newpost = new Post({
        ...input,
        summary: req.body.statement.substring(0, 30),
        tags: req.body.tags,
      });

      await newpost.save();

      const post = await Post.findById(newpost._id).populate({
        path: "tags",
        select: "_id name",
      });

      return res.json({
        data: post,
        success: true,
      });
    } catch (err) {
      console.log(err);
      return res.json({
        messages: err,
        success: false,
      });
    }
  }

  async somePost(req, res, next) {
    try {
      let query = req.query;

      let sort = this.sortManager(query);

      const options = {
        page: query.page || 1,
        limit: query.limit || 6,
        sort: sort,
        // select :  '_id title  categories user' ,
        populate: [
          { path: "user", select: "_id username avatar avatarpath" },
          { path: "tags", select: "_id name slug" },
        ],
      };

      let createdAt = this.timeMaker(req);

      let posts = await Post.paginate(
        { createdAt: { $gte: createdAt } },
        options
      );

      let aWeekAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
      const weekFavouritePosts = await Post.find({
        createdAt: { $gte: aWeekAgo },
      })
        .select("-statement -summary -images")
        .sort({ likeCount: "desc" })
        .limit(3)
        .populate({ path: "user", select: "_id username avatar avatarpath" });

      const tags = await Tag.find({})
        .sort({ followersCount: "desc" })
        .limit(10);
      let userTags = [];
      if (req.user) {
        const user = await User.findById(req.user._id)
          .populate({ path: "tags", select: "name slug" })
          .select("tags");
        userTags = user.tags;
      }

      const categories = await Category.find({});

      if (posts.docs.length === 0) {
        return res.json({
          message: " پست جهت نمایش وجود ندارد",
          code: 204,
          success: false,
        });
      }

      this.checkUserSavedPosts(req, posts);

      return res.json({
        posts,
        weekFavouritePosts,
        tags,
        userTags,
        categories,
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.json({
        data: err,
        success: false,
      });
      next();
    }
  }

  async singlePost(req, res, next) {
    try {
      // console.log(req.params.slug)

      const post = await Post.findOne({ slug: req.params.slug })
        .select("-summary")
        .populate({ path: "tags", select: "name slug" })
        .populate({ path: "user", select: "username avatar avatarpath" })
        .populate({
          path: "answers",
          match: { parent: null },
          options: { sort: { createdAt: "desc" } },
          populate: [
            { path: "user", select: "username avatar avatarpath" },
            {
              path: "parent",
              select: "title user",
              populate: { path: "user", select: "username" },
            },
            {
              path: "answers",
              populate: [
                { path: "user", select: "username avatar avatarpath" },
                {
                  path: "parent",
                  select: "title user",
                  populate: { path: "user", select: "username" },
                },
                {
                  path: "answers",
                  populate: [
                    { path: "user", select: "username avatar avatarpath" },
                    {
                      path: "parent",
                      select: "title user",
                      populate: { path: "user", select: "username" },
                    },
                  ],
                },
              ],
            },
          ],
        });

      await Post.findOneAndUpdate(
        { slug: req.params.slug },
        {
          $set: {
            viewCount: post.viewCount + 1,
          },
        }
      );

      const similarPosts = await Tag.find({ name: post.tags[0].name }).populate(
        { path: "posts", select: "title slug createdAt", limit: 6 }
      );

      this.checkUserSavedPosts(req, null, post);
      // this.checkUserLikdedAnswers(req , post.answers)
      // this.checkUserLikdedAnswers(req , post.answers)

      const reports = await Report.find({}).select("title slug");

      // console.log(similarPosts)

      if (!post) {
        return res.json({
          message: " پست جهت نمایش وجود ندارد",
          code: 204,
          success: false,
        });
      }

      return res.json({
        post,
        similarPosts,
        isAuthenticated: req.isAuthenticated(),
        user: req.user,
        reports,
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: err,
        success: false,
      });
      next();
    }
  }

  async report(req, res, next) {
    try {
      let reports = req.body.reports;
      let postId = req.body.postId;

      console.log(req.body);
      let post = await Post.findById(postId).select(
        "title user reports reported"
      );

      let user = await User.findByIdAndUpdate(req.user._id, {
        reports: reports,
      });

      if (Array.isArray(reports)) {
        reports.forEach(async (report) => {
          await Report.findByIdAndUpdate(report, {
            $set: {
              posts: [postId],
              users: [user._id],
              authors: [post.user],
            },
          });
        });
      }

      await Post.findByIdAndUpdate(req.body.postId, {
        $set: {
          reports: [...post.reports, ...reports],
          reported: true,
        },
      });
      // console.log(post)
      // console.log(user)

      return res.json({
        success: true,
      });
    } catch (err) {
      console.log(err);
      res.json({
        message: err,
        success: false,
      });
      next();
    }
  }
}

module.exports = new postController();
