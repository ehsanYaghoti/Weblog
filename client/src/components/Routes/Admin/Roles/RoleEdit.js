// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormRole from 'src/components/Layouts/Admin/Role/FormRole'
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Components
import isAdmin from 'src/Logics/isAdmin';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';



const RoleEdit = (props) => {
    
    const [role , setRole] = useState({ 
        name  : '',
        label  : '',
        permissions : []
    })
    const [permissions , setPermissions] = useState([])
    const [rolePermissions , setRolePermissions] = useState([])
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

        NodejsApi.get(`/admin/roles/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                setLoading(false)
                setSuccess({
                    state : response.data.success ,
                    message : response.data.data
                })
                return
            }
            
            const rolePermissions = []
            response.data.data.permissions.map(permission => {
                return rolePermissions.push({value : permission._id , label : permission.label})
            })

            setPermissions(response.data.permissions)
            setRolePermissions(rolePermissions)
            setRole(response.data.data )
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

        const data = {
            ...role,
            rolePermissions : rolePermissions
        }

        NodejsApi.put(`/admin/roles/${id}/update` , data)
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

        setRole(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })
    }

    let selectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
            return values.push(option.value)
        })

        setRolePermissions(selectedOption)
        setRole(prevState => {
            return {
                ...prevState,
                permissions : values
            }
        })
        
    }

 
    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser} />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش نقش</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}                                                                   
                <FormRole permissions={permissions} rolePermissions={rolePermissions} role={role} inputHandler={inputHandler} formHandler={formHandler} selectHandler={selectHandler} />
            </div>
        </div>
    )

}


export default isAdmin( RoleEdit);