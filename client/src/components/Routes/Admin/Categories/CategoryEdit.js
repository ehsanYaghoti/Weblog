// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormCategory from 'src/components/Layouts/Admin/Category/FormCategory';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';

library.add(faTimes)


const CategoryEdit = (props) =>  {
    
    const [category , setCatrgory] = useState({ 
        name : '',
        parent : 'none',
    })

    const [prevParents , setPrevParents ] = useState([])
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [validation , setValidation] = useState(true)
    const [messages , setMessages ] = useState([])
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

        NodejsApi.get(`/admin/category/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                setSuccess({
                    state : response.data.success ,
                    message : response.data.data
                })
                setLoading(false)
            }

            setCatrgory({
                name : response.data.data.category.name
            })
            setPrevParents(response.data.data.categories)
            setSuccess({
                state : response.data.success ,
                message : ''
            })
            setLoading(false)
        
        })
        .catch(err =>  {
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
        
        NodejsApi.put(`/admin/category/${id}/update` , category)
        .then(response =>  {

            if(! response.data.success){
                setSuccess({
                    state : response.data.success ,
                    message : response.data.data
                })
                setValidation(false)
                toast.error('validation error')
                setLoading(false)
                setMessages(response.data.messages)
                return
            } 

            setValidation(true)
            setMessages([])
            toast.success('information update was successful')
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
        
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setCatrgory(prevState => {
            return {
                ...prevState,                
                [name] : value
            }
        })
    }


    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser}  />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser}  />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش دسته بندی</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading />}
                {! validation && <ValidationPanel messages={messages} />}                                 
                <FormCategory category={category} inputHandler={inputHandler} formHandler={formHandler} prevParents={prevParents} />
            </div>
        </div>
    )
    }


export default isAdmin(CategoryEdit);