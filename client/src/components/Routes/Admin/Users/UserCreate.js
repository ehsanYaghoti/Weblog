// Modules
import React   from 'react';
import Axios from 'axios';

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
import isAdmin from 'src/Logics/isAdmin';
library.add(faTimes)


class createUser extends React.Component {
    
    state = { 
        text : { 
            username : '',
            email : '',
            password : ''
        } ,
        loading : false ,
        validation : true ,
        messages : [],
        formData : [],
        close : false,
        authenticatedUser : {
            isAuthenticated : false,
            user : {}
        }
    }

    componentDidMount(){
        if(this.props.location.state === undefined){
            this.props.navigate('/admin/users')
        }
 
        this.setState(prevState => {
            return {
                ...prevState,
                authenticatedUser : this.props.location.state
            }
        })

    }



    render(){

        let formHandler = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading : true
                }
            })
            e.preventDefault();
            let user = this.state.text
            Axios.post('http://localhost:4000/admin/user/create' , user)
                .then(response =>  {
                    console.log(response)
                    if(! response.data.result){
                        return this.setState(prevState => {
                            return {
                                ...prevState,
                                validation : false ,
                                close : false,
                                loading : false ,
                                messages : response.data.messages,
                                formData : response.data.formData
                            }
                        })
                    } else if(response.data.result){
                        console.log('result = true')
                         this.setState((prevState) => {
                            return{
                                ...prevState,
                                messages : [],
                                formData : [],
                                validation : true,
                                
                            }
                        })
                    }
                    this.setState(prevState => {
                        return {
                            ...prevState,
                            loading : false,
                            
                        }
                    })
                })
                .catch(err => { return console.log(err)})

            console.log('submit')
        }
    
        let inputHandler = (e) => {
            e.preventDefault();
            let name = e.target.name
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    text : {
                        ...prevState.text,
                        [name] : value
                    }
                }
            })
        }

        let closeController = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    close : true
                }
            })
        }


    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <AuthenticatedUserContext.Provider  value={this.state.authenticatedUser}  >
                <Navbar />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن کاربر جدید</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                            ! this.state.validation 
                            ?   <>
                                <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                    {   this.state.messages.map((error)=>{
                                        return (<span>{error}</span>)   
                                        })
                                    }
                                </div>                                                 
                                <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
                                    <label>نام کاربری :
                                        <input type='text' className='dark:text-gray-800'  value={ this.state.text.username}  onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
                                    </label>
                                    <label>ایمیل :
                                        <input type='text' className='dark:text-gray-800'    value={this.state.text.email} onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
                                    </label>
                                    <label>رمز عبور :
                                        <input type='text' className='dark:text-gray-800'  onChange={inputHandler} name='password' placeholder='رمز عبور را در اینجا وارد کنید ...'/>
                                    </label>
                                    <button type='submit' className='button'>افزودن کاربر جدید</button>
                                </form>
                                </>                                
                            :
                            (
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
                                <label>نام کاربری :
                                    <input type='text' className='dark:text-gray-800'  onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
                                </label>
                                <label>ایمیل :
                                    <input type='text' className='dark:text-gray-800'  onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
                                </label>
                                <label>رمز عبور :
                                    <input type='text' className='dark:text-gray-800'  onChange={inputHandler} name='password' placeholder='رمز عبور را در اینجا وارد کنید ...'/>
                                </label>
                                <button type='submit' className='button'>افزودن کاربر جدید</button>
                            </form>
                            )
                        }
                </div>
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( createUser);