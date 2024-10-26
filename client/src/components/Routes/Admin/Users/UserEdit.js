// Modules
import React ,{  useEffect  , useState }   from 'react';
import { useParams } from 'react-router-dom';
import NodejsApi from 'src/Api/NodejsApi';
import { toast } from 'react-toastify';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';
import FormUser from 'src/components/Layouts/Admin/User/FormUser';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Components
import isAdmin from 'src/Logics/isAdmin';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';




const UserEdit = (props) => {
    
    const [userState , setUserState] = useState({
        username : '',
        email : '',
        roles : [],
        password : ''
    });
    const [roles , setRoles] = useState([]);
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [loading , setLoading] = useState(false)
    const [validation , setValidation] = useState(true)
    const [ messages , setMessages] = useState([])
    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    })

    let {id} = useParams();

    useEffect(function(){

        setAuthenticatedUser({
            isAuthenticated : true,
            user : props?.user
        })
        setLoading(true)

        NodejsApi.get(`/admin/user/edit/${id}`)
        .then(response => { 

            if(! response.data.success){
                setLoading(false)
                setSuccess({
                    state : response.data.success ,
                    message : response.data.data
                })
                return
            }

            setUserState(response.data.data)
            setRoles(response.data.roles)
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
        
    },[id , props.user])

    let formHandler = (e) => {
        e.preventDefault();
        setLoading(true);

        let roles = []
        if(userState.roles.length !== 0){
            userState.roles.forEach(role => {
                if(role.name){
                    return roles.push(role.id)
                } else if(role.label){
                    return roles.push(role.value)
                }
                
            })
        }

        let user = {
            username : userState.username,
            email : userState.email,
            roles : roles,
        }

        NodejsApi.put(`/admin/user/edit/${id}` , user)
        .then(response =>  {
            console.log(response)

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
        setUserState(prevState => {
            return {
            ...prevState ,
            [name] : value
        }})
        
    }

    let roleSelectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
           return values.push(option.value)
        })

        setUserState(prevState => {
            return {
                ...prevState,
                roles : selectedOption
            }
        })
    }
    
    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser} />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش کاربر</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}    
                <FormUser userState={userState} roleSelectHandler={roleSelectHandler} inputHandler={inputHandler} roles={roles} formHandler={formHandler} />    
            </div>
        </div>
    )
}

export default isAdmin( UserEdit);