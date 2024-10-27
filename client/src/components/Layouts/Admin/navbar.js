import React , { memo } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faExclamationTriangle ,faBookmark  , faHeart , faDollarSign , faFile ,faNewspaper , faPlay, faBlog, faHome } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight  , faDollarSign , faFile , faNewspaper )


const Navbar = memo(function Navbar(props){

    // let userState = UserContext
    let userState = props?.user

    // console.log(userState)
    
    let userRolesNames = []
    if(userState?.isAuthenticated && userState?.user?.roles.length !== 0 && userState?.user?.roles !== undefined ){
        userState?.user?.roles.forEach(role => {
            return userRolesNames.push(role.name) 
        })
    }

    console.log(userRolesNames )
    // return <h2>navbar</h2>
    return (
    <div className='navbar !hidden lg:!flex overflow-x-hidden dark:!border-none dark:bg-[conic-gradient(at_bottom_right,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black dark:text-gray-50'>
        <NavLink to='/'  className='nav-icon' >
            <div className='flex items-center w-fit text-gray-400 dark:text-gray-50 text-4xl' dir='ltr' >
                <FontAwesomeIcon icon={faBlog} className=' '  />
                <span className='h-fit ml-2 font-["PT_Sans"] font-semibold ' >Weblog</span>
            </div>
        </NavLink>
        <NavLink to='/admin'  className='nav-link ' activeClassName='active-link'><FontAwesomeIcon icon={faHome} /><span>Admin Home</span></NavLink>
        {
            userRolesNames.includes('manager') &&
            <>
                <NavLink to='/admin/users' className='dark:text-gray-50 nav-link ' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت کاربران </span></NavLink>
                <NavLink to='/admin/permissions' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت مجوز ها </span></NavLink>
                <NavLink to='/admin/roles' className='nav-link' activeClassName='active-link'><FontAwesomeIcon icon='users' /><span> مدیریت نقش ها </span></NavLink>
                </> 
        }
        {
            userRolesNames.includes('article writer') || userRolesNames.includes('writer') || userRolesNames.includes('manager') ?
            <NavLink to='/admin/articles' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='newspaper' /> <span>مدیریت مقاله ها </span></NavLink>
            : ''
        }
        {
            userRolesNames.includes("podcastWriter") || userRolesNames.includes('writer') || userRolesNames.includes('manager') ?
            <NavLink to='/admin/podcasts' className='nav-link'  activeClassName='active-link'>
                <FontAwesomeIcon icon={faPlay} />
                <span>مدیریت پادکست ها </span>
            </NavLink>
            : ''
        }
        
        <NavLink to='/admin/comments' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='quote-right' /><span>مدیریت دیدگاه ها </span></NavLink>
        <NavLink to='/admin/posts' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='book' /> <span>مدیریت پست ها </span></NavLink>
        <NavLink to='/admin/answers' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='book' /> <span>مدیریت پاسخ ها </span></NavLink>
        <NavLink to='/admin/likes' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faHeart} /> <span>مدیریت لایک ها </span></NavLink>
        <NavLink to='/admin/saves' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faBookmark} /> <span>مدیریت ذخیره ها </span></NavLink>
        <NavLink to='/admin/categories' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='file' /><span>مدیریت دسته بندی ها </span></NavLink>
        <NavLink to='/admin/tags' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon='file' /><span>مدیریت تگ ها </span></NavLink>
        <NavLink to='/admin/reports' className='nav-link'  activeClassName='active-link'><FontAwesomeIcon icon={faExclamationTriangle} /><span>مدیریت گزارش ها </span></NavLink>
    </div>
    )
});

export default Navbar;