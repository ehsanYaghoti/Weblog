import React from 'react';
import moment from 'jalali-moment';
// import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment , faHeart as faheartSolid ,faUserCircle , faBookmark as faBookmarkSolid   } from '@fortawesome/free-solid-svg-icons';
import {  faHeart , faBookmark , faFolderClosed , faCalendarAlt } from '@fortawesome/free-regular-svg-icons';


function CardArticle(props) {
    
    //props
    let article = props.article
    let userstate = props.userstate
    let saveHandler = props.saveHandler
    let likeHandler = props.likeHandler
    let buttonLoading = props.buttonLoading
    // const buttonSaveLoading = props.buttonSaveLoading
    // const buttonLikeLoading = props.buttonLikeLoading

    
    return (
        // CardArticle
        <div  key={article._id} className={`flex flex-col items-start gap-2 justify-center bg-white ltr:ml-3 rtl:mr-3  rounded-md w-full md:w-[400px] lg:w-full  h-fit p-4 dark:bg-slate-600/80 dark:text-white  ${ article.language === 'fa' ? 'font-["Vazir"]' : 'font-["Nunito"]'  } shadow-md shadow-slate-500/90 `} >
            <a href={`/articles/${article.slug}`} className='flex items-center justify-center w-full' >
                <img src={`${process.env.REACT_APP_API_URL}/${article.imagepath}`} alt={`${article.title}`} className='w-fit h-64 bg-white object-cover self-center  rounded-md shadow-sm hover:scale-105 transition-all' />
            </a>                                                    
            <h3 lang='fa' className='text-xl  h-16 w-full text-ellipsis overflow-clip  dark:text-gray-50 hover:opacity-85  font-[300] ltr:text-left rtl:text-right'  dir={`${article.language === 'fa' ?'rtl' :'ltr'}`}  >
                <a href={`/articles/${article.slug}`} >
                    {article.title}
                </a>
            </h3>                              
            <div className='self-start flex items-center gap-2'  >
                <FontAwesomeIcon icon={faCalendarAlt} />
                <span className='h-fit' >
                    {moment(article.createdAt, 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                </span>
            </div>
            {/* Card row 1 */}
            <div className='flex items-center gap-2 justify-between w-full py-2 ' >
                <a href={`/user/dashboard/${article.author._id}`} className='flex items-center gap-2' >
                    {
                        article.author.avatar !== null ?
                        <img src={`${process.env.REACT_APP_API_URL}/${article.author.avatarpath}`} alt="author" className='h-10 w-10 rounded-full ring-1 ring-green-200  object-cover self-center shadow-md hover:scale-105 transition-all' />
                        : <FontAwesomeIcon icon={faUserCircle} />
                    }
                    <span className='dark:text-gray-50 hover:text-opacity-80' >{article.author.username}</span>
                </a>
                <a href={`/articles?category=${article.categories[0].slug}`} className='flex items-center gap-2 text-gray-800 dark:text-gray-50 hover:text-opacity-80' >
                    <FontAwesomeIcon icon={faFolderClosed} />
                    <span className='h-fit font-[400]' >{article.categories[0].name}</span>
                </a>
            </div>
            {/* Card row 2 */}
            <div className='flex items-center justify-between gap-3 w-full py-2 ' >
                {/* Time to read */}
                <div className='dark:text-gray-400 whitespace-nowrap text-xs md:text-sm flex items-center gap-1 md:gap-1 h-fit' >
                    <div className='hidden lg:flex' >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                        </svg>
                    </div>
                    
                    <span className='' >time to read :</span>  
                    <span className='font-[600]' >{article.readingtime} <span >minutes</span> </span>
                </div>
                {/* reactions */}
                <div className='flex items-center justify-end gap-1  md:gap-2 text-xs md:text-xs h-6 ' >
                    
                    {/* Save Button */}
                    <button disabled={userstate.isAuthenticated || !buttonLoading  ? false : true} className={`flex items-center justify-center h-full w-fit gap-1 py-1 px-1 rounded-md  border border-solid border-blue-50  hover:bg-opacity-90 hover:text-blue-400  dark:hover:text-white dark:border-none cursor-pointer
                        ${ userstate.isAuthenticated ?
                            article.savedByThisUser ? 'bg-blue-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-blue-500/50' : 'bg-blue-50 text-blue-200 dark:bg-blue-700 dark:bg-opacity-40 dark:text-blue-400  ' 
                            : ''
                        }`} onClick={e => saveHandler(e, article._id , article.savedByThisUser , 'article')} >
                            <FontAwesomeIcon  className='h-3'  icon={ 
                                userstate.isAuthenticated ?
                                article.savedByThisUser ? faBookmarkSolid : faBookmark  
                                : faBookmark
                            }  />
                            <span className='hidden md:flex h-3 items-center justify-center  ' >{article.saveCount}</span>
                    </button>
                    {/* Like Button */}
                    <button id={`likeOf-${article._id}`} disabled={userstate.isAuthenticated || !buttonLoading ? false : true} className={`flex items-center h-full w-1/3 gap-1  py-1 px-1 rounded-md  border border-solid border-red-50 hover:bg-opacity-90 hover:text-red-400   dark:hover:text-white dark:border-none cursor-pointer 
                        ${ userstate.isAuthenticated ?
                            article.likedByThisUser ? 'bg-red-500 text-white hover:bg-opacity-30 dark:shadow-md dark:shadow-red-400/50' : 'bg-red-50 text-red-200 dark:bg-red-600 dark:bg-opacity-30 dark:text-red-400 ' 
                            : ''
                        } `} onClick={e => likeHandler(e, article._id , article.likedByThisUser , 'article')} >
                            <FontAwesomeIcon className='h-3' icon={ 
                                userstate.isAuthenticated ?
                                article.likedByThisUser ? faheartSolid : faHeart  
                                : faHeart
                            }  />
                            <span className='h-3  flex items-center justify-center  ' >{article.likeCount}</span>
                    </button>
                    {/* Comments link */}
                    <a href={`/articles/${article.slug}#comments`} target='#comments' className='flex items-center justify-center h-full w-1/3 gap-1 py-1 px-1 rounded-md border border-solid border-gray-100 bg-gray-100  text-gray-500 hover:bg-gray-500  hover:text-white dark:bg-gray-700 dark:bg-opacity-50  dark:border-none dark:shadow-md dark:shadow-gray-500/50  dark:text-gray-300 cursor-pointer ' > 
                        <FontAwesomeIcon className='h-3' icon={faComment} />
                        <span className='h-3  flex items-center justify-center  ' >{article.commentCount}</span>
                        
                    </a >
                </div>
            </div>            

            <div id={article._id} className='font-[200]  text-gray-800 line-clamp-2 leading-6 ltr:text-left rtl:text-right'  dir={`${article.language === 'fa' ?'rtl' :'ltr'}`}  ></div>
        </div>
    )
}

export default CardArticle;