import React from 'react';
import ButtonSpinner from 'src/components/Layouts/Home/Loadings/ButtonSpinner';

function CardTag(props) {
    
    //props
    const tag = props.tag
    const followTagHandler = props.followTagHandler
    const buttonLoading = props.buttonLoading

    

    return (
        // Tag
        <div key={tag._id} className='flex flex-col p-4 min-w-fit w-full max-h-fit md:w-[400px] lg:w-full  border border-solid border-gray-300 rounded-md shadow-md bg-white dark:bg-slate-600/80 dark:text-gray-50' >
            {/* tag title  */}
            <div className="flex items-center w-full h-fit md:h-16 justify-between  border-b border-solid border-gray-300  " >
                <span key={tag._id} className='text-blue-600 flex items-center justify-center  dark:text-blue-500 hover:text-blue-900 dark:hover:text-blue-400 h-full py-4 border-b border-solid border-blue-600 dark:border-blue-800 dark:border-b-2  ' >
                    <a href={`/tag/${tag.slug}`} className='h-fit' >
                        <span className='mr-2' >#</span>
                        {tag.name}
                    </a>
                </span>
                {/* tag count info */}
                <div className='text-gray-600 dark:text-gray-50 py-4 text-sm h-full flex flex-col gap-2 md:flex-row items-center'  >
                    <span className='flex  items-center gap-1 px-2 h-fit border-none md:border-r md:border-solid border-gray-300' >
                        {
                            tag.articlesCount
                        }
                        <span>Articles</span>
                    </span>
                    <span className='flex items-center gap-1 h-fit px-2 border-none md:border-r md:border-solid border-gray-300' >
                        {
                            tag.podcastsCount
                        }
                        <span>Podcast</span>
                    </span>
                    <span className='flex items-center gap-1 h-fit px-2'>
                        {
                            tag.postsCount
                        }
                        <span>Post</span>
                    </span>
                </div>
            </div>
            {/* tag body */}
            <div className='flex flex-col pt-5 pb-3 h-fit  '>
                <div className='h-20' >
                {tag.explain !== null ? 
                    <p className='text-lg font-[600]' >{tag.explain}</p>
                : ''}
                </div>
                <div className='flex items-center w-full h-fit align-bottom justify-between' >
                    <div className='text-blue-600 dark:text-blue-400/90 w-fit h-fit box-border text-base hover:text-white hover:bg-blue-600 focus:opacity-60  border border-solid border-blue-600 dark:border-blue-400 rounded-md' >
                        {
                            tag.followedByThisUser ?
                            <button className='h-full w-full px-4 py-2' onClick={e => followTagHandler(e , tag._id , tag.followedByThisUser)}  disabled={buttonLoading ? true : false} >
                                {
                                    buttonLoading ? <ButtonSpinner /> : 
                                    <span>unfollow</span>
                                }
                            </button>
                            : <button className='h-full w-full px-4 py-2' onClick={e => followTagHandler(e , tag._id , tag.followedByThisUser)}  disabled={buttonLoading ? true : false} >
                                {
                                    buttonLoading ? <ButtonSpinner /> : 
                                    <span>follow</span>
                                }
                            </button>
                        }
                    </div>
                    <span className='flex items-center justify-center text-center h-fit gap-1 text-lg'>
                        <span className=' text-gray-900 dark:text-gray-300 font-[700]' >
                            {
                                tag.followersCount
                            }
                        </span>
                        <span className='text-gray-600 dark:text-gray-50' >follower</span>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default CardTag;