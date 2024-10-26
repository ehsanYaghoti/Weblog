// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';



// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPodcast from '../../../Layouts/Admin/Podcast/FormPodcast'
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

const PodcastEdit = (props) => {
    
    const [podcast , setPodcast] = useState({ 
        title : '',
        statement  : '<p><strong>توضیح را در اینجا وارد کنید</strong></p>',
        image : '' ,
        sound : '',
        categories : [],
        tags : [] ,
        imagepath : '',
        soundpath : ''
    })
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [imageInput , setImageInput] = useState({
        file : '',
        previewUrl : ''
    })
    const [soundInput , setSoundInput] = useState({
        file : '',
        previewUrl : ''
    })
    const [categories , setCategories] = useState([])
    const [tags , setTags] = useState([])
    const [loading , setLoading] = useState(false)
    const [validation , setValidation] = useState(true)
    const [messages , setMessages] = useState([])
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

        NodejsApi.get(`/admin/podcasts/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                setLoading(false)
                setSuccess({
                    state : response.data.success ,
                    message : response.data.messages
                })
                return  
            }

            setPodcast(response.data.data)
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


    } , [id , props.user])
    

    let formHandler = (e) => {
       
        e.preventDefault();
        setLoading(true)

        let categories = []
        if(podcast.categories.length !== 0){
            podcast.categories.forEach(category => {
                if(category.name){
                    return categories.push(category.id)
                } else if(category.label){
                    return categories.push(category.value)
                }
            })
        }

        let tags = []
        if(podcast.tags.length !== 0){
            podcast.tags.forEach(tag => {
                if(tag.name){
                    return tags.push(tag.id)
                } else if(tag.label){
                    return tags.push(tag.value)
                }
            })
        }

        let formData = new FormData()
        formData.append('image' , podcast.image)
        formData.append('sound' , podcast.sound)

        formData.append('title' , podcast.title)
        formData.append('statement' , podcast.statement)

        formData.append('categories' , categories)
        formData.append('tags' , tags)

        NodejsApi.put(`/admin/podcasts/${id}/update` , formData  , {headers : {'content-type' : 'multipart/form-data' }  })
        .then(response =>  {
            if(! response.data.success){
                setValidation(false)
                setMessages(response.data.messages)
                setLoading(false)

                return
            } 

            setMessages([])
            setValidation(true)
            setLoading(false)
            toast.success('information update was succesful')            

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

        setPodcast(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
        
    }

    let categorySelectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
            return values.push(option.value)
        })

        setPodcast(prevState => {
            return {
                ...prevState,
                categories : selectedOption
            }
        })

    }

    let tagSelectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
            return values.push(option.value)
        })

        setPodcast(prevState => {
            return {
                ...prevState,
                tags : selectedOption
            }
        })
    }

    let imageHandler = (e) => {

        if (e.target.files && e.target.files[0]) {

            let img = e.target.files[0];

            setPodcast(prevState => {
                return {
                    ...prevState,
                    image:  img,
                }
            });
            setImageInput({
                previewUrl : URL.createObjectURL(img)
            })

        }

        toast.error('there is no image chosen')

    }

    let soundHandler = (e) => {
        e.preventDefault();

        if (e.target.files && e.target.files[0]) {

            let sound = e.target.files[0];

            setPodcast(prevState => {
                return {
                    ...prevState,
                    sound:  sound,
                }
            });
            setSoundInput({
                previewUrl : URL.createObjectURL(sound)
            })

        }

        toast.error('there is no sound chosen')
    }

    let statementHandler = (e , data) => {
        setPodcast(prevState => {
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
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش پادکست</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}  
                <FormPodcast editMode={true} imagePreviewUrl={imageInput.previewUrl} soundPreviewUrl={soundInput.previewUrl} categories={categories} tags={tags} podcast={podcast} inputHandler={inputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} soundHandler={soundHandler} statementHandler={statementHandler}  />
            </div>
            <GoTopBtn />
        </div>
    )

}

export default isAdmin( PodcastEdit);