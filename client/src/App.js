// Styles
// import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import 'src/Styles/fonts/font-face.css'
import React from 'react';

import { Route , BrowserRouter as Router , Switch } from 'react-router-dom';


// import Authentication Routes
import Register from 'src/components/Routes/Auth/Register';
import Login from 'src/components/Routes/Auth/Login';
import ForgotPassword from 'src/components/Routes/Auth/ForgotPassword';
import ResetPassword from 'src/components/Routes/Auth/ResetPassword';


// import Home Routes
import LandingPage from 'src/components/Routes/Home/LandingPage';

import HomeArticles from 'src/components/Routes/Home/Article/Articles';
import HomeArticle from 'src/components/Routes/Home/Article/Article';

import HomePodcasts from 'src/components/Routes/Home/Podcast/Podcasts';
import HomePodcast from 'src/components/Routes/Home/Podcast/Podcast';

import HomePosts from 'src/components/Routes/Home/Post/Posts';
import HomePost from 'src/components/Routes/Home/Post/Post';

import HomeTags from 'src/components/Routes/Home/Tag/Tags';
import HomeTag from 'src/components/Routes/Home/Tag/Tag';

//  import User dashboard and panel routes

import UserDashboard from 'src/components/Routes/Home/User/Dashboard/UserDashboard'
import UserDashboardArticles from 'src/components/Routes/Home/User/Dashboard/UserDashboardArticles'
import UserDashboardPosts from 'src/components/Routes/Home/User/Dashboard/UserDashboardPosts'
import UserDashboardTags from 'src/components/Routes/Home/User/Dashboard/UserDashboardTags'

import UserPanel from 'src/components/Routes/Home/User/Panel/UserPanel'
import UserPanelProfile from 'src/components/Routes/Home/User/Panel/UserPanelProfile'
import UserPanelArticles from 'src/components/Routes/Home/User/Panel/UserPanelArticles'
import UserPanelPodcasts from 'src/components/Routes/Home/User/Panel/UserPanelPodcasts'
import UserPanelPosts from 'src/components/Routes/Home/User/Panel/UserPanelPosts'
import UserPanelAnswers from 'src/components/Routes/Home/User/Panel/UserPanelAnswers'
import UserPanelComments from 'src/components/Routes/Home/User/Panel/UserPanelComments'
import UserPanelSaves from './components/Routes/Home/User/Panel/UserPanelSaves';
import UserPanelLikes from './components/Routes/Home/User/Panel/UserPanelLikes';
import UserPanelFollowing from './components/Routes/Home/User/Panel/UserPanelFollowing';

import Search from 'src/components/Routes/Home/Search/Search';




// import Admin Routes
import Home from 'src/components/Routes/Admin/Home';

import Users from 'src/components/Routes/Admin/Users/Users';
import UserCreate from 'src/components/Routes/Admin/Users/UserCreate';
import UserEdit from 'src/components/Routes/Admin/Users/UserEdit';

import Permissions from 'src/components/Routes/Admin/Permissions/Permissions';
import PermissionCreate from 'src/components/Routes/Admin/Permissions/PermissionCreate';
import PermissionEdit from 'src/components/Routes/Admin/Permissions/PermissionEdit';

import Roles from 'src/components/Routes/Admin/Roles/Roles';
import RoleCreate from 'src/components/Routes/Admin/Roles/RoleCreate';
import RoleEdit from 'src/components/Routes/Admin/Roles/RoleEdit';

import Articles from 'src/components/Routes/Admin/Articles/Articles';
import ArticleCreate from 'src/components/Routes/Admin/Articles/ArticleCreate';
import ArticleEdit from 'src/components/Routes/Admin/Articles/ArticleEdit';

import Podcasts from 'src/components/Routes/Admin/Podcasts/Podcasts';
import PodcastCreate from 'src/components/Routes/Admin/Podcasts/PodcastCreate';
import PodcastEdit from 'src/components/Routes/Admin/Podcasts/PodcastEdit';


import Comments from 'src/components/Routes/Admin/Comments/Comments';
import Answers from 'src/components/Routes/Admin/Answers/Answers';
import Likes from 'src/components/Routes/Admin/Likes/Likes';
import Saves from './components/Routes/Admin/Saves/Saves';


import Posts from 'src/components/Routes/Admin/Posts/Posts';
import PostCreate from 'src/components/Routes/Admin/Posts/PostCreate';
import PostEdit from 'src/components/Routes/Admin/Posts/PostEdit';

import Categories from 'src/components/Routes/Admin/Categories/Categories';
import CategoryCreate from 'src/components/Routes/Admin/Categories/CategoryCreate';
import CategoryEdit from 'src/components/Routes/Admin/Categories/CategoryEdit';

import Tags from 'src/components/Routes/Admin/Tags/Tags';
import TagCreate from 'src/components/Routes/Admin/Tags/TagCreate';
import TagEdit from 'src/components/Routes/Admin/Tags/TagEdit';

import Reports from 'src/components/Routes/Admin/Reports/Reports';
import ReportCreate from 'src/components/Routes/Admin/Reports/ReportCreate';
import ReportEdit from 'src/components/Routes/Admin/Reports/ReportEdit';


import NotFound from 'src/components/Routes/NotFound';




function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          {/* Home Routes */}
          <Route path='/' exact  component={LandingPage} />

          <Route path='/articles' exact  component={HomeArticles} />
          <Route path='/articles/:slug'  component={HomeArticle} />

          <Route path='/podcasts' exact  component={HomePodcasts} />
          <Route path='/podcasts/:slug'  component={HomePodcast} />

          <Route path='/posts' exact  component={HomePosts} />
          <Route path='/posts/:slug'  component={HomePost} />

          <Route path='/tags' exact  component={HomeTags} />
          <Route path='/tag/:slug' exact  component={HomeTag} />

          <Route path='/user/dashboard/:id' exact component={UserDashboard} />
          <Route path='/user/dashboard/:id/articles' component={UserDashboardArticles} />
          <Route path='/user/dashboard/:id/posts' component={UserDashboardPosts} />
          <Route path='/user/dashboard/:id/followed-tags' component={UserDashboardTags} />

          <Route path='/user/panel' exact component={UserPanel} />
          <Route path='/user/panel/profile'  component={UserPanelProfile} />
          <Route path='/user/panel/articles'  component={UserPanelArticles} />
          <Route path='/user/panel/podcasts'  component={UserPanelPodcasts} />
          <Route path='/user/panel/posts'  component={UserPanelPosts} />
          <Route path='/user/panel/answers'  component={UserPanelAnswers} />
          <Route path='/user/panel/comments'  component={UserPanelComments} />
          <Route path='/user/panel/saves'  component={UserPanelSaves} />
          <Route path='/user/panel/likes'  component={UserPanelLikes} />
          <Route path='/user/panel/followed'  component={UserPanelFollowing} />


          <Route path='/search/:search' exact  component={Search} />

          

          {/* Authentication Routes */}
          <Route path='/auth/register' exact  component={Register} />
          <Route path='/auth/login' exact  component={Login} />
          <Route path='/auth/forgotPassword' exact  component={ForgotPassword} />
          <Route path='/auth/password/reset'   component={ResetPassword} />


          {/* Admin Routes */}
          <Route path='/admin' exact  component={Home} />

          <Route path='/admin/users' exact component={Users} />
          <Route path='/admin/users/create' component={UserCreate} />
          <Route path='/admin/users/edit/:id' component={UserEdit}  />

          <Route path='/admin/categories' exact component={Categories} />
          <Route path='/admin/categories/create' component={CategoryCreate} />
          <Route path='/admin/categories/edit/:id' component={CategoryEdit}  />

          <Route path='/admin/tags' exact component={Tags} />
          <Route path='/admin/tags/create' component={TagCreate} />
          <Route path='/admin/tags/edit/:id' component={TagEdit}  />

          <Route path='/admin/reports' exact component={Reports} />
          <Route path='/admin/reports/create' component={ReportCreate} />
          <Route path='/admin/report/edit/:id' component={ReportEdit}  />

          <Route path='/admin/posts' exact component={Posts} />
          <Route path='/admin/posts/create'  component={PostCreate} />
          <Route path='/admin/posts/edit/:id'  component={PostEdit} />

          <Route path='/admin/articles' exact component={Articles} />
          <Route path='/admin/articles/create'  component={ArticleCreate} />
          <Route path='/admin/articles/edit/:id'  component={ArticleEdit} />
          
          <Route path='/admin/podcasts' exact component={Podcasts} />
          <Route path='/admin/podcasts/create'  component={PodcastCreate} />
          <Route path='/admin/podcasts/edit/:id'  component={PodcastEdit} />

          <Route path='/admin/permissions' exact component={Permissions} />
          <Route path='/admin/permissions/create'  component={PermissionCreate} />
          <Route path='/admin/permissions/edit/:id'  component={PermissionEdit} />

          <Route path='/admin/roles' exact component={Roles} />
          <Route path='/admin/roles/create'  component={RoleCreate} />
          <Route path='/admin/roles/edit/:id'  component={RoleEdit} />

          <Route path='/admin/comments' exact component={Comments} />
          <Route path='/admin/answers' exact component={Answers} />
          <Route path='/admin/likes' exact component={Likes} />
          <Route path='/admin/saves' exact component={Saves} />




          <Route path='' component={NotFound}/>
        </Switch>
      </div>
    </Router>
  );
}

export default App;