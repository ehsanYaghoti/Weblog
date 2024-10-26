// Modules
import React , {useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Components
import isAdmin from 'src/Logics/isAdmin';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';
import FormTag from 'src/components/Layouts/Admin/Tag/formTag';


const TagEdit = (props) => {

    const [tag , setTag] = useState({ 
        name : '',
        explain : ''
    })
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [validation , setValidation] = useState(true)
    const [ messages , setMessages] = useState([])
    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    })

    const {id} = useParams()

    useEffect(() => { 
        setAuthenticatedUser({
            isAuthenticated : true,
            user : props.user
        })
        setLoading(true)

        NodejsApi.get(`/admin/tag/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                setLoading(false)
                setSuccess({
                    state : response.data.success ,
                    message : response.data.data
                })
                return
            }

            setTag(response.data.data.tag)
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

        NodejsApi.put(`/admin/tag/${id}/update` , tag)
        .then(response =>  {

            if(! response.data.success){
                setValidation(false)
                setLoading(false)
                setMessages(response.data.messages)
                return  
            }

            setValidation(true)
            setMessages([])
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

        setTag(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
        
    }

    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser} />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش تگ</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}                                                  
                <FormTag ediMode={true} tag={tag} inputHandler={inputHandler} formHandler={formHandler} />
            </div>
        </div>
    )
    
}

export default isAdmin( TagEdit);