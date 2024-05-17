// Styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import 'src/Styles/fonts/font-face.css'


import React from 'react';

import { Route , BrowserRouter as Router , Routes } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';


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
      <div className="App">
      <Router>
        <Routes>
        
          {/* Home Routes */}
          <Route path='/' exact  Component={LandingPage} />

          <Route path='/articles'  Component={HomeArticles} />
          <Route path='/articles/:slug'  Component={HomeArticle} />

          <Route path='/podcasts' exact  Component={HomePodcasts} />
          <Route path='/podcasts/:slug'  Component={HomePodcast} />

          <Route path='/posts' exact  Component={HomePosts} />
          <Route path='/posts/:slug'  Component={HomePost} />

          <Route path='/tags' exact  Component={HomeTags} />
          <Route path='/tag/:slug' exact  Component={HomeTag} />

          <Route path='/user/dashboard/:id' exact Component={UserDashboard} />
          <Route path='/user/dashboard/:id/articles' Component={UserDashboardArticles} />
          <Route path='/user/dashboard/:id/posts' Component={UserDashboardPosts} />
          <Route path='/user/dashboard/:id/followed-tags' Component={UserDashboardTags} />

          <Route path='/user/panel' exact Component={UserPanel} />
          <Route path='/user/panel/profile'  Component={UserPanelProfile} />
          <Route path='/user/panel/articles'  Component={UserPanelArticles} />
          <Route path='/user/panel/podcasts'  Component={UserPanelPodcasts} />
          <Route path='/user/panel/posts'  Component={UserPanelPosts} />
          <Route path='/user/panel/answers'  Component={UserPanelAnswers} />
          <Route path='/user/panel/comments'  Component={UserPanelComments} />
          <Route path='/user/panel/saves'  Component={UserPanelSaves} />
          <Route path='/user/panel/likes'  Component={UserPanelLikes} />
          <Route path='/user/panel/followed'  Component={UserPanelFollowing} />

          {/* search Route */}
          <Route path='/search/:search' exact  Component={Search} />

          

          {/* Authentication Routes */}
          <Route path='/auth/register' exact  Component={Register} />
          <Route path='/auth/login' exact  Component={Login} />
          <Route path='/auth/forgotPassword' exact  Component={ForgotPassword} />
          <Route path='/auth/password/reset'   Component={ResetPassword} />


          {/* Admin Routes */}
          <Route path='/admin' exact  Component={Home} />

          <Route path='/admin/users' exact Component={Users} />
          <Route path='/admin/users/create' Component={UserCreate} />
          <Route path='/admin/users/edit/:id' Component={UserEdit}  />

          <Route path='/admin/categories' exact Component={Categories} />
          <Route path='/admin/categories/create' Component={CategoryCreate} />
          <Route path='/admin/categories/edit/:id' Component={CategoryEdit}  />

          <Route path='/admin/tags' exact Component={Tags} />
          <Route path='/admin/tags/create' Component={TagCreate} />
          <Route path='/admin/tags/edit/:id' Component={TagEdit}  />

          <Route path='/admin/reports' exact Component={Reports} />
          <Route path='/admin/reports/create' Component={ReportCreate} />
          <Route path='/admin/report/edit/:id' Component={ReportEdit}  />

          <Route path='/admin/posts' exact Component={Posts} />
          <Route path='/admin/posts/create'  Component={PostCreate} />
          <Route path='/admin/posts/edit/:id'  Component={PostEdit} />

          <Route path='/admin/articles' exact Component={Articles} />
          <Route path='/admin/articles/create'  Component={ArticleCreate} />
          <Route path='/admin/articles/edit/:id'  Component={ArticleEdit} />
          
          <Route path='/admin/podcasts' exact Component={Podcasts} />
          <Route path='/admin/podcasts/create'  Component={PodcastCreate} />
          <Route path='/admin/podcasts/edit/:id'  Component={PodcastEdit} />

          <Route path='/admin/permissions' exact Component={Permissions} />
          <Route path='/admin/permissions/create'  Component={PermissionCreate} />
          <Route path='/admin/permissions/edit/:id'  Component={PermissionEdit} />

          <Route path='/admin/roles' exact Component={Roles} />
          <Route path='/admin/roles/create'  Component={RoleCreate} />
          <Route path='/admin/roles/edit/:id'  Component={RoleEdit} />

          <Route path='/admin/comments' exact Component={Comments} />
          <Route path='/admin/answers' exact Component={Answers} />
          <Route path='/admin/likes' exact Component={Likes} />
          <Route path='/admin/saves' exact Component={Saves} />




          <Route path='' element={<NotFound />}/>
        </Routes>

        </Router>
        
        <ToastContainer style={{height : 'fit-content'}} />
        
      </div>

  );
}

export default App;