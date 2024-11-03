// Modules
import React   from 'react';
import Axios from 'axios';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';
import { toast } from 'react-toastify';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
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
        this.setState(prevState => {
            return {
                ...prevState,
                authenticatedUser : {
                    isAuthenticated : true,
                    user : this.props.user
                }

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
            Axios.post(`${process.env.REACT_APP_API_URL}/admin/user/create` , user)
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
                        toast.success('اطلاعات با موفقیت ذخیره شد')
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
                <Navbar user={this.state.authenticatedUser} />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader user={this.state.authenticatedUser} />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن کاربر جدید</h2>
                        {   
                            this.state.loading 
                            ? <SpinnerLoading />
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
            </div>
            )
    }
}

export default isAdmin( createUser);