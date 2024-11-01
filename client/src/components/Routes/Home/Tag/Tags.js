import React , { useState , useEffect  } from 'react';

// import Layouts
import Header from 'src/components/Layouts/Home/General/Header';
import Footer from 'src/components/Layouts/Home/General/Footer';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

import CardTag from 'src/components/Layouts/Home/Cards/CardTag';

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import Pagination from 'src/components/Layouts/Home/General/PaginationHome';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle , faSearch } from '@fortawesome/free-solid-svg-icons';

function Tags(props) {
    
    const [userstate , setUserState ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : '',
            likes : []
        }
    })
    const [tags , setTags] = useState([])    

    const [filterTags , setFilterTags] = useState({
        feed : false  ,
        search : '' 
    })

    const [ pagination , setPagination ] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [buttonLoading  , setButtonLoading] = useState(false)


    useEffect(() => {
        setLoading(true)

        NodejsApi.get('${process.env.REACT_APP_API_URL}/tags')
        .then(response => {
            if(! response.data.success){
                if(response.data.code === 204){
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.message
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })

            setNocontent({
                state : true,
                message : ''
            })
            
            console.log(response.data)
            let data = response.data
            let user = data.user
            let tags = data.tags.docs



            setTags([
                ...tags
            ])

            setPagination({
                page : data.tags.page ,
                hasNextPage : data.tags.hasNextPage ,
                hasPrevPage : data.tags.hasPrevPage ,
                limit : data.tags.limit ,
                nextPage : data.tags.nextPage ,
                prevPage : data.tags.prevPage ,
                totalDocs : data.tags.totalDocs,
                totalPages : data.tags.totalPages
            })

            setUserState({
                isAuthenticated : data.isAuthenticated ,
                user : {
                    ...user
                }
            });

            setLoading(false)


        } )
        .catch(err => {
            console.log(err)
            setLoading(false)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [])

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tags?feed=${filterTags.feed}&search=${filterTags.search}`)
        .then(response => {
            if(! response.data.success){
                if(response.data.code === 204){
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.message
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })

            setNocontent({
                state : true,
                message : ''
            })
            
            console.log(response.data)
            let data = response.data
            let tags = []
            if(data.tags.docs){
                tags = data.tags.docs

                setPagination({
                    page : data.tags.page ,
                    hasNextPage : data.tags.hasNextPage ,
                    hasPrevPage : data.tags.hasPrevPage ,
                    limit : data.tags.limit ,
                    nextPage : data.tags.nextPage ,
                    prevPage : data.tags.prevPage ,
                    totalDocs : data.tags.totalDocs,
                    totalPages : data.tags.totalPages
                })
            } else {
                tags = data.tags
            }

            setTags([
                ...tags
            ])


            

            setLoading(false)

        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
        })

    } , [filterTags])

    let paginationHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        NodejsApi.get(`${process.env.REACT_APP_API_URL}/tags?${name}=${value}`)
        .then(response => {
            if(! response.data.success){
                // setLoading(false)
                if(response.data.code === 204){
                    console.log(response.data.code)
                    return setNocontent({
                        state : response.data.success,
                        message : response.data.message
                    })
                }
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.message
                    }
                })
              
            }

            setNocontent({
                state : true,
                message : ''
            })

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })


            let data = response.data
            let tags = data.tags.docs
            setTags(tags);
            setPagination({
                page : data.tags.page ,
                hasNextPage : data.tags.hasNextPage ,
                hasPrevPage : data.tags.hasPrevPage ,
                limit : data.tags.limit ,
                nextPage : data.tags.nextPage ,
                prevPage : data.tags.prevPage ,
                totalDocs : data.tags.totalDocs,
                totalPages : data.tags.totalPages
            })

        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
        })

        

    }

    let filterHandler = (e) => {
        // e.preventDefault();
        setFilterTags(prevState=> {
            return {
                ...prevState,
                feed : !prevState.feed,
            }
        })
    }

    let followTagHandler = (e , id , followed) =>{
        e.preventDefault()

        setButtonLoading(false)

        let data ={
            id,
        }
        if(followed){
            console.log('unfollow')
            NodejsApi.put(`/tags/unfollow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){

                    let data = response.data
                    let tags = data.tags
                    console.log(tags)

                    
                    if(tags){
                        console.log('defined tags')

                        setTags([
                            ...tags
                        ])
                    }          
                      
                    setButtonLoading(false)
                }
            })
            .catch(err => {
                console.log(err)
                setButtonLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })


        } else if(! followed){
            NodejsApi.put(`/tags/follow/${id}` , data)
            .then(response =>{
                console.log(response.data)
                if(response.data.success){
                    let data = response.data  
                    let tags = data.tags
                    console.log(tags)
                    
                    if(tags){
                        console.log('defined tags')
                        setTags([
                            ...tags
                        ])
                    }

                    setButtonLoading(false)

                }
            })
            .catch(err => {
                console.log(err)
                setButtonLoading(false)
                setSuccess({
                    state : false,
                    message : err.message
                })
            })
        }

    }


    console.log(filterTags)

    return (
        <div className='flex flex-col w-full h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50'>
                    {
                        loading ? 
                        <SpinnerOnTop />
                        : ''
                    }
                    <Header user={userstate} />
                    {/* Main Content */}
                    <main className='flex flex-col self-center w-full  md:w-[90%] p-8 h-fit min-h-screen gap-10 font-["Nunito"] ' >
                        {/* heading and explain */}
                        <div className='flex flex-col items-start h-fit' >
                            <h3 className='text-gray-700 text-xl font-[600] h-fit'>Tags</h3>
                            <p className='text-gray-700 w-full leading-8 whitespace-normal text-lg font-[500] dark:text-gray-50' >tags are key words for Grouping posts and podcasts and articles in weblog and
                                you can with following each tag catch newst content of each media.
                            </p>
                        </div>
                        {/* filter and search tags */}
                        <div className='flex flex-col gap-6 md:flex-row items-center justify-between h-fit py-8 border-b border-solid border-b-gray-300' >
                            {/* Search Box */}
                            <div className='h-fit relative w-[70%] drop-shadow-md '  >
                                <input lang='en' onKeyDown={e => {
                                    if(e.key === 'Enter'){
                                        console.log('enter')
                                        setFilterTags(prevState => {
                                            return {
                                                ...prevState,
                                                search : e.target.value
                                            }
                                        })
                                    }
                                }}  type="text" name='search' className='w-full pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Nunito"]' placeholder='search here' style={{textAlign : 'left'}} />
                                {/* <input lang='fa' type="text" className='pl-8 pr-4 py-2 outline-none rounded-md bg-gray-200 text-gray-700 font-["Vazir"]' placeholder='search here' style={{textAlign : 'left'}} /> */}
                                <FontAwesomeIcon icon={faSearch} className='text-slate-500 absolute left-2 top-3 ' />
                            </div>             
                            {/* filter switch */}
                            <label className='h-fit inline-flex items-center gap-4 whitespace-nowrap  cursor-pointer ' >
                                
                                <span className='h-fit text-lg font-[600] text-gray-700 dark:text-gray-50' >All tags</span>

                                <input type="checkbox" name='tagFollow' className=' sr-only peer'  onClick={filterHandler} />
                                <div className='w-11 h-6 relative bg-gray-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:outline-blue-600  rounded-full peer peer-checked:after:translate-x-full  peer-checked:after:border-white after:content-[""] after:absolute after:top-[2px] after:start-[2px] after:rounded-full after:bg-white after:border after:border-gray-300 after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 ' ></div>
                            
                                <span className='h-fit text-lg font-[600] text-gray-700 dark:text-gray-50' >My tags</span>

                            </label>
                        </div>
                        {/* all tags cards */}
                        <div className='grid grid-cols-1 justify-items-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 grid-rows-2 gap-6 mb-8' >
                        {
                        ! noContent.state ? 
                        <span className='' >{noContent.message}</span>
                        : (
                            
                            tags.map(tag => {
                                return (
                                    // tag card
                                    <CardTag key={tag._id} buttonLoading={buttonLoading} tag={tag} followTagHandler={followTagHandler} singlePage={false} />
                                )
                            })
                        )
                        }
                        </div>
                        {/* pagination */}
                        {
                                        
                            ! (pagination.totalPages === 1) ?
                            (
                                <PaginationContext.Provider value={{ pagination  , paginationHandler }}>
                                    <Pagination  />
                                </PaginationContext.Provider>
                            )
                            : ''
                        }
                    </main>
                    <Footer />
                    <GoTopBtn />
                </div>
            ) : (

                <span className='flex items-center justify-center w-full h-full font-["Vazir"] text-8xl text-gray-500 ' >
                    { success.message }
                    <FontAwesomeIcon icon={faExclamationCircle} />    
                </span>
                
            )
        }
        </div>
    )
}

export default Tags;