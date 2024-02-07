// Modules
import React ,{  useEffect  , useState , }   from 'react';
import { useParams , useHistory } from 'react-router-dom';
import NodejsApi from 'src/Api/NodejsApi';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// import contexts
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";

import FormUser from 'src/components/Layouts/Admin/User/FormUser';
library.add(faTimes)


function UserEdit(props) {
    
    const [userState , setUserState] = useState({
        username : '',
        email : '',
        roles : [],
        password : ''
    });

    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    });

    const [roles , setRoles] = useState([]);

    const [loading , setLoading] = useState(false);
    const [validation , setValidation] = useState(true);
    const [close , setClose] = useState(false);
    const [successMessage , setSuccessMessage ]= useState(false);

    const [messages , setMessages] = useState([])
    // const [formData , setFormData] = useState([])

    let params = useParams();
    const history = useHistory()

    useEffect(function() {
        console.log(props)

        if(props.location.state === undefined){
            history.push('/admin/users')
        } else {
            setAuthenticatedUser(props.location.state)
        }

    } , [history , props])

    useEffect(function(){
        console.log('edit')
        NodejsApi.get(`/admin/user/edit/${params.id}`)
            .then(response => { 
                console.log(response.data.data)
                let user = response.data.data
                setUserState(user)

                setRoles(response.data.roles)
            })
            .catch(err => console.log(err))
    },[params.id])

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

        console.log(roles)

        let user = {
            username : userState.username,
            email : userState.email,
            roles : roles,
        }



        NodejsApi.put(`/admin/user/edit/${params.id}` , user)
            .then(response =>  {
                console.log(response)

                if(! response.data.success){
                    console.log('notsuccess')

                    setValidation(false);
                    setClose(false);
                    setLoading(false);
                    setMessages(response.data.messages);

                    // const user = response.data.data
                    // setUserState({
                    //     username : user.username,
                    //     email : user.email,
                    //     roles : user.roles
                    // })

                    return;
                } else if(response.data.success){
                        console.log('success')
                        // const user = response.data.data
                        // setUserState(prevState => {
                        //     return {
                        //     ...prevState ,
                        //     username : user.username,
                        //     email : user.email
                        // }})
                        setValidation(true);
                        setSuccessMessage(true);
                        
                }
                setLoading(false);
            })
            .catch(err => { return console.log(err)})

        console.log('submit')
    }

    console.log(userState)
    
    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value
        setUserState(prevState => {
            return {
            ...prevState ,
            [name] : value
        }})
        // return setUserState({
        //     [name] : value
        // })
    }

    let closeController = (e) => {
        setClose(true);
    }

    let roleSelectHandler = selectedOption => {
        const values = []
        selectedOption.map(option => {
           return values.push(option.value)
        })

        console.log(selectedOption)
        console.log(values)

        setUserState(prevState => {
            return {
                ...prevState,
                roles : selectedOption
            }
        })
    }
    
    console.log(userState)

    return (
        <div className='home-dashboard'>
            <AuthenticatedUserContext.Provider  value={authenticatedUser}  >
            <Navbar />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش کاربر</h2>
                    {   
                        loading 
                        ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                        : 
                        ! validation 
                        ?   <>
                                <div className={ close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                    {   messages.map((error)=>{
                                        return (<span>{error}</span>)   
                                        })
                                    }
                                </div>                                                  
                                <FormUser userState={userState} roleSelectHandler={roleSelectHandler} inputHandler={inputHandler} roles={roles} formHandler={formHandler} />
                            </>                                
                        : successMessage ?
                        <>
                            <div className='successMessage'>
                                <span>عملیات با موفقیت انجام شد</span>
                            </div>
                            <FormUser userState={userState} roleSelectHandler={roleSelectHandler} inputHandler={inputHandler} roles={roles} formHandler={formHandler} />
                        </>
                        :
                        (
                            <FormUser userState={userState} roleSelectHandler={roleSelectHandler} inputHandler={inputHandler} roles={roles} formHandler={formHandler} />
                        )
                    }
            </div>
            </AuthenticatedUserContext.Provider>
        </div>
    )
}

export default UserEdit;