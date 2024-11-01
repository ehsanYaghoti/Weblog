import React , {useState , useEffect , useRef }  from 'react';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';

// import Contexts
// import authenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Layouts
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';
import UserPanelHeader from 'src/components/Layouts/Home/User/UserPanelHeader';
import UserPanelNavbar from 'src/components/Layouts/Home/User/UserPanelNavbar';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

// import icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faClose } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle  } from '@fortawesome/free-regular-svg-icons';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import isAuthenticated from 'src/Logics/isAuthenticated';

function User(props){
    
    const [authenticatedUser , setAuthenticatedUser ]  = useState({
        isAuthenticated : false,
        user : {
            username : '',
            avatar : null,
        }
    })

    const [user , setUser ]  = useState({
        username : '',
        avatar : null,
        likes : [],
        followers : [],
        followings : [],
        roles : [],
        createdAt : '',
    })

    const [post , setPost] = useState({
        title : '',
        statement : '', 
        tags : []
    })

    const [tags , setTags] = useState([])

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [noContent , setNocontent] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)

    const [validation , setValidation] = useState({
        close : true,
        success : false,
        messages : [],
        result : false
    })

    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`${process.env.REACT_APP_API_URL}/user/panel`)
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
            let tags = data.tags


            setAuthenticatedUser({
                isAuthenticated : data.isAuthenticated,
                user : data.authenticatedUser,
            })

            
            setUser({
                ...user
            });

            setTags(tags)

            setLoading(false)



        } )
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false,
                message : err.message
            })
            setLoading(false)
        })

    } , [])

    const tagsOptions = []
    if( tags !== null || tags.length !== 0 ){
        tags.map(tag => {
            // console.log(tag)
            return (
                tagsOptions.push({value : `${tag._id}` , label : `${tag.name}`})
            )
        })
    } 

    let statementHandler = (e , data) => {
        console.log(data)
        setPost(prevState => {
            return {
                ...prevState,
                statement : data,
                
            }
        })
    }

    const editorRef = useRef(null);
    const log = (e) => {
        if (editorRef.current) {
            let data = editorRef.current.getContent()
            console.log(data);
            statementHandler(e , data )
        }
    };

    let formHandler = (e) => {

        setLoading(true)
        e.preventDefault();

        let tags = []
        if(post.tags.length !== 0){
            post.tags.forEach(tag => {
                if(tag.name){
                    return tags.push(tag.id)
                } else if(tag.label){
                    return tags.push(tag.value)
                }
                
            })
        }
        console.log('tags' +  tags)


        let SendPost = {
            title : post.title,
            statement : post.statement,
            tags : tags
        }




        // let post = this.state.post

        NodejsApi.post('/posts/create' , SendPost )
            .then(response =>  {
                
                if(! response.data.success){
                    setLoading(false)
                    return setValidation(prevState => {
                        return {
                            ...prevState,
                            success : false ,
                            close : false,
                            messages : response.data.messages,
                        }
                    })
                } 

                
                setSuccess(prevState => {
                    return {
                        state : response.data.success ,
                        message : ''
                    }
                })

                setValidation({
                    success : true,
                    result : true,
                    close : false,
                    messages : []
                })

                let data = response.data
                console.log(data)
                setPost(data.data)

                setLoading(false)

            })
            .catch(err => {  
                console.log(err)
                setSuccess({
                    state : false,
                    message : err.message
                })
                setLoading(false)
            })
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setPost(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    let tagSelectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
           return values.push(option.value)
        })



        setPost(prevState => {
            return {
                ...prevState,
                // postCategories : values,
                tags : selectedOption
            }
        })
    }
    
    let tagSelectorValues = []
    if( post.tags !== null ){
        post.tags.map(tag => {
            if(tag.name){
                // console.log('0') 
                return tagSelectorValues.push({value : `${tag.id}` , label : `${tag.name}`})
            } else {
                // console.log('1')
                return tagSelectorValues.push({value : `${tag.value}` , label : `${tag.label}`})
            }
            
        })
    }


    return (
        <div className='flex flex-col w-full min-h-screen'  >
        {
            success.state ? (
                <div className='flex flex-col w-full h-fit'>
                    {
                        loading ? 
                        <SpinnerOnTop />
                        : ''
                    }
                    {
                        !validation.close ?
                        !validation.success ?
                        ( 
                            <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed top-1/2 left-1/4 p-4 bg-red-600  border border-solid border-red-300 rounded-md" id="validation" >
                                <FontAwesomeIcon icon={faClose} className="hover:text-white text-lg self-end cursor-pointer peer-active/validation:hidden parent  " onClick={e => setValidation( prevState => {
                                    return {
                                        ...prevState,
                                        close : true
                                    }
                                }) } /> 
                                {
                                    Array.isArray(validation.messages) ?
                                    
                                    validation.messages.map((message , number = 0) => {
                                        return (
                                            <span className="text-md rtl text-white flex flex-row items-center" style={{direction : "rtl"}} key={number} >{number+=1} - {message}</span>
                                        )
                                    })
                                    : ( <span className="text-md rtl text-white flex flex-row items-center" >{validation.messages}</span> )

                                }
                            </div>
                        )  :
                        (
                            validation.result ? 
                            (
                                <div className="w-fit h-fit flex font-[Vazir] peer/validation leading-8   flex-col self-center m-auto items-center z-50 fixed top-1/2 left-1/4 p-4 bg-green-600  border border-solid border-green-300 rounded-md" id="validation" >
                                    <FontAwesomeIcon icon={faClose} className="hover:text-white text-lg self-end cursor-pointer peer-active/validation:hidden parent  " onClick={e => 
                                    setValidation( prevState => {
                                        return {
                                            ...prevState,
                                            close : true
                                        }
                                    }) } /> 
                                    <span className="text-md rtl text-white" >
                                        Creating post has been successful check the forum link in navbar menu <br/>
                                        Or this is post link
                                        <a href={`/posts/${post.slug}`}  className='w-fit underline text-blue-500 ml-2'>{post.title}</a>
                                    </span>
                                </div>
                            )
                            : ''
                        ) : 
                        (
                            ''
                        )
                        
                    }
                    <UserPanelHeader user={authenticatedUser} userNavbar={user} />
                    <main className='flex flex-row items-center w-full h-fit min-h-screen gap-10 pl-0 font-["Nunito"]  bg-gradient-to-br from-30% from-slate-100 to-70% to-slate-300 dark:bg-gradient-to-t dark:from-10% dark:from-slate-600 dark:to-90% dark:to-slate-800 dark:text-gray-50' >

                        <UserPanelNavbar user={user} />
                        
                        { ! noContent.state ? <span className='' >{noContent.message}</span> :
                        (
                            <div className='w-full px-4 py-8 lg:w-[80%] lg:pl-8 lg:ml-[25%] xl:ml-[20%] lg:mx-4 ' >
                            
                            <form onSubmit={formHandler} className='flex flex-col w-full gap-8 p-6 my-4 mr-6  border border-solid border-gray-300 rounded-md shadow-md shadow-slate-50/90 bg-white dark:bg-slate-600/80' >
                                {/* post author */}
                                <div className='flex items-start md:items-center md:gap-4' >

                                    <div className='flex items-center justify-center text-gray-600 w-16 h-16 overflow-hidden ring-4 ring-green-300 rounded-full' >
                                        <a href={`/user/dashboard/${user._id}`}>
                                        {
                                            user.avatar === null ?
                                            <FontAwesomeIcon icon={faUserCircle} className='text-gray-300 text-2xl font-[400] h-full w-full '   /> :
                                            <img src={`${process.env.REACT_APP_API_URL}/${user.avatarpath}`} alt={`${user.username}`} className=' scale-105 hover:scale-125 transition-all duration-500 ' />
                                        }
                                        </a>
                                    </div>

                                    <div className='h-fit w-fit flex flex-col md:items-start items-center  gap-4 md:gap-1' >
                                        
                                        <span className='h-fit w-fit text-lg font-[600] dark:text-gray-50' >
                                            <a href={`/user/dashboard/${user._id}`}>
                                                {
                                                    user.fullname === null ?
                                                    user.username :
                                                    user.fullname
                                                }
                                            </a>
                                        </span>

                                        <div className='flex flex-col md:flex-row gap-2 items-center md:divide-x divide-gray-300 text-base w-fit font-[500] text-gray-700 dark:text-gray-50' >
                                            <button className='h-fit w-fit cursor-text md:px-2' >
                                                <a href={`/user/dashboard/${user._id}`}>
                                                    @{
                                                        user.username
                                                    }
                                                </a>
                                            </button>
                                            {
                                                user.profossional === null ? ''
                                                : 
                                                <button className='h-fit w-fit md:px-2  ' >
                                                    profossional : {user.profossional}
                                                </button>
                                            }
                                        </div>
                                    </div>
                                </div>
                                {/* create post explain */}
                                <div className='flex flex-col items-start bg-blue-100 p-4 border border-solid border-blue-300 rounded-md shadow-sm shadow-blue-200' >
                                    <span className='text-blue-800 text-lg font-[700] mb-4 lg:whitespace-nowrap ' >attention before publishing post !</span>
                                    <p className='text-blue-700 font-[600] text-base leading-8 ' >
                                        Thank you for choosing Weblog for publishing your post.first please attention to hints below:<br/>
                                        1 - avoid send repetitious post. <br/>
                                        2 - title or statement should not be empty and should be at least 10 charachter. <br/>
                                        3 - tags should be at least 1 and maximum 4.
                                    </p>
                                </div>
                                    
                                <h2 className='h-fit font-[700] self-center text-lg text-gray-800 dark:text-gray-50 ' >New Post</h2>
                            
                                <label className='flex flex-col items-start gap-4' >
                                    <span className='h-fit whitespace-nowrap font-[700] text-lg text-gray-800 dark:text-gray-50' >title of the post : </span>
                                    <input value={post.title}  onChange={inputHandler} name='title' className='w-full px-6 py-3 border border-solid border-gray-300 rounded-md shadow-md outline-none text-gray-800 text-base font-[600]'  type="text" placeholder='type title here...' />
                                </label>
                                <label className='flex flex-col items-start gap-4 w-full' >
                                    <span className='h-fit whitespace-nowrap font-[700] text-lg text-gray-800 dark:text-gray-50' >statement of post : </span>
                                    <Editor
                                    apiKey='aklhw3rzqy6gr4r5nqi5m52lbud8gbop52s9o07cz6q0wmgy'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onChange={log}
                                    init={{
                                        plugins: ["advlist", "anchor", "autolink", "charmap", "code", 
                                        "help", "image", "insertdatetime", "link", "lists", "media", 
                                        "preview", "searchreplace", "table", "visualblocks"],
                                        // 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                                        
                                        toolbar: 'undo redo language | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                        content_langs: [
                                            { title: 'English', code: 'en' },
                                            { title: 'Spanish', code: 'es' },
                                            { title: 'French', code: 'fr' },
                                            { title: 'German', code: 'de' },
                                            { title: 'Portuguese', code: 'pt' },
                                            { title: 'Chinese', code: 'zh' },
                                            { title: 'Persian', code: 'fa' },
                                        ],
                                        tinycomments_mode: 'embedded',
                                        tinycomments_author: 'Author name',
                                        selector: 'textarea',
                                        width : '100%',
                                        placeholder: "insert the statement of post here...",
                                        mergetags_list: [
                                        { value: 'First.Name', title: 'First Name' },
                                        { value: 'Email', title: 'Email' },
                                        ],
                                        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                                    }}
                                    // initialValue={''}
                                />  
                                </label>
                                
                                <label className='flex flex-col items-center gap-4' >
                                    <div className='flex flex-col items-start w-full ' > 
                                        <span className='h-fit whitespace-nowrap font-[700] text-lg text-gray-800 dark:text-gray-50' >tags of the post (maximum 4) : </span>
                                        <Select className='w-full h-16  mt-6 dark:text-gray-500' value={tagSelectorValues}  isMulti={true} options={tagsOptions}  onChange={tagSelectHandler} />
                                    </div>
                                    {/* <Select className='categorySelector' value={tagSelectorValues} isMulti={true} options={tagsOptions} onChange={tagSelectHandler}/> */}
                                </label>
                                <div className='flex items-center justify-center w-full gap-4 mt-8' >
                                    <button type='submit' className='px-5 py-2 bg-cyan-400 text-white hover:opacity-80 text-lg font-[600] border border-solid border-gray-300 rounded-md drop-shadow-sm ' >publish</button>
                                    <button type='reset'  className='px-5 py-2 bg-red-400 text-white hover:opacity-80 text-lg font-[600] border border-solid border-gray-300 rounded-md drop-shadow-sm '  >cancel</button>
                                </div>
                                

                            </form>
                        </div>)}

                    </main>
                    <GoTopBtn />
                </div>
            ) : (
                <span className='flex items-center justify-center w-full h-full font-["Nunito"] text-8xl text-gray-500 ' >
                    <FontAwesomeIcon icon={faExclamationCircle} />  
                    <span className='h-fit' >
                        { success.message }
                    </span>
                </span>
            )
        }
        </div>
    )
}

export default isAuthenticated(User , 'panel'); 