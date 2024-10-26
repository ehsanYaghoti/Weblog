// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormArticle from '../../../Layouts/Admin/Article/FormArticle'
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Components
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import isAdmin from 'src/Logics/isAdmin';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';

const ArticleEdit  = (props) => {

    const [article , setArticle] = useState({ 
        title : '',
        statement  : '',
        language : 'en',
        image : '' ,
        author : '',
        readingtime : '',
        likeCount : '',
        saveCount : '',
        source : '', 
        categories : [],
        tags : [] ,
    })
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [imageInput , setImageInput] = useState({
        file : '',
        previewUrl : ''
    })
    const [categories , setCategories] = useState([])
    const [tags , setTags] = useState([])

    const [loading , setLoading] = useState(false)
    const [messages , setMessages] = useState([])
    const [validation , setValidation] = useState(true)
    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    })

    const { id } = useParams()

    useEffect(() => {

        setAuthenticatedUser({
            isAuthenticated : true,
            user : props.user
        })
        setLoading(true)

        NodejsApi.get(`/admin/articles/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                setLoading(false)
                setSuccess({
                    state : response.data.success ,
                    message : response.data.messages
                })
                return  
            }

            setArticle(response.data.data)
            setCategories(response.data.categories)
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


    } , [id , props.user ])

    let formHandler = (e) => {

        e.preventDefault();

        setLoading(true)

        let categories = []
        if(article.categories.length !== 0){
            article.categories.forEach(category => {
                if(category.name){
                    return categories.push(category.id)
                } else if(category.label){
                    return categories.push(category.value)
                }
                
            })
        }

        let tags = []
        if(article.tags.length !== 0){
            article.tags.forEach(tag => {
                if(tag.name){
                    return tags.push(tag.id)
                } else if(tag.label){
                    return tags.push(tag.value)
                }
                
            })
        }

        let formData = new FormData()
        formData.append('image' , article.image)
        formData.append('title' , article.title)
        formData.append('statement' , article.statement)
        formData.append('language' , article.language)
        formData.append('readingtime' , article.readingtime)
        formData.append('likeCount' , article.likeCount)
        formData.append('saveCount' , article.saveCount)
        formData.append('source' , article.source)
        formData.append('categories' , categories)
        formData.append('tags' , tags)

        NodejsApi.put(`/admin/articles/${id}/update` , formData  , {headers : {'content-type' : 'multipart/form-data' }  })
        .then(response =>  {

            if(! response.data.success){
                setLoading(false)
                setValidation(false)
                setMessages(response.data.messages)
                return toast.error('validation is not successful')

            }
            
            setMessages([])
            setValidation(true)
            setLoading(false)
            toast.success('اطلاعات با موفقیت ذخیره شد')

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

        setArticle(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
        
    }

    let radioInputHandler = (e) => {
        let name = e.target.name
        let value = e.target.value

        setArticle(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

    }

    let categorySelectHandler = selectedOption => {
        // const values = []
        // selectedOption.map(option => {
        //     return values.push(option.value)
        // })

        setArticle(prevState => {
            return {
                ...prevState,
                categories : selectedOption
            }
        })

    }

    let tagSelectHandler = selectedOption => {
        // const values = []
        // selectedOption.map(option => {
        //     return values.push(option.value)
        // })

        setArticle(prevState => {
            return {
                ...prevState,
                tags : selectedOption
            }
        })
    }

    let imageHandler = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {

            let img = e.target.files[0];

            setArticle(prevState => {
                return {
                    ...prevState ,
                    image : img
                }
            })

            setImageInput({
                previewUrl : URL.createObjectURL(img)
            })

        }
    }

    let statementHandler = (e , data) => {
        setArticle(prevState => {
            return {
                ...prevState,
                statement : data
            }
        })
        
    }

    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser}  />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser}  />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش مقاله</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading />}
                {! validation && <ValidationPanel messages={messages} />}                                                     
                <FormArticle editMode={true} imagePreviewUrl={imageInput.previewUrl} categories={categories} tags={tags} article={article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} statementHandler={statementHandler}  />
            </div>
            <GoTopBtn />
        </div>
    )
    
}

export default isAdmin( ArticleEdit);