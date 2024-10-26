// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 



// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPost from 'src/components/Layouts/Admin/Post/FormPost';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Modules
import isAdmin from 'src/Logics/isAdmin';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';


const PostEdit = (props) => {
    
    const [post , setPost] = useState({ 
        title : '',
        statement  : '',
        language : 'en',
        tags : [] ,
    })
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [tags , setTags] = useState([])
    const [validation , setValidation] = useState(true)
    const [messages , setMessages] = useState([])
    const [loading , setLoading] = useState(true)
    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    })
   
    const {id} = useParams()

    useEffect(() => {
        setAuthenticatedUser({
            isAuthenticated : true,
            user : props?.user
        })
        setLoading(true)

        NodejsApi.get(`/admin/posts/edit/${id}`)
        .then(response => {

            if(! response.data.success){

                setSuccess({
                    state : response.data.success ,
                    message : response.data.messages
                })
                setLoading(false)
                return  

            }

            setPost(response.data.data)
            setTags(response.data.tags)
            setSuccess({
                state : response.data.success ,
                message : ''
            })
            setLoading(false)

        })
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false ,
                message : err.message
            })
            setLoading(false)   
        })


        
    } , [id , props.user])

    let formHandler = (e) => {

        e.preventDefault();
        setLoading(true)

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

        let formData = {
            title : post.title,
            statement : post.statement,
            language : post.language ,
            tags : tags
        }

        NodejsApi.put(`/admin/posts/${id}/update` , formData )
        .then(response =>  {
            if(! response.data.success){
                
                if(response.status === 403) toast.validation('validation data error')
                setValidation(false)
                setLoading(false)
                setMessages(response.data.messages)
                return 

            }
            
            setMessages([])
            setValidation(true)
            setLoading(false)
            toast.success('information update was successful')

        })
        .catch(err => { 
            console.log(err)
            setSuccess({
                state : false ,
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

    let radioInputHandler = (e) => {
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
                tags : selectedOption
            }
        })

    }

    let statementHandler = (e , data) => {

        setPost(prevState => {
            return {
                ...prevState,
                statement : data
            }
        })
        
    }

    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser} />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش پست</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}
                <FormPost editMode={true} tags={tags} post={post} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler}  tagSelectHandler={tagSelectHandler} statementHandler={statementHandler}  />
            </div>
        </div>
    )
    
}

export default isAdmin(PostEdit);