// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

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


class CategoryCreate extends React.Component {
    
    state = { 
        category : { 
            name : '',
            parent : 'none',
        } ,
        success : { state : true ,  message : ''},
        prevParents : [],
        loading : false ,
        validation : true ,
        messages : [],
        formData : [],
        close : false,
        result : false,
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

        this.setState(prevState => {
            return {
                ...prevState,
                loading : true,
                
            }
        })
        NodejsApi.get(`/admin/category?parent=none`)
        .then(response => {
            console.log(response.data)
            if(! response.data.success){
                return  this.setState(prevState => {
                   return {
                    ...prevState,
                    success : {
                        state : response.data.success ,
                        message : response.data.data
                    },
                    loading : false
                    }
                })
              
            }

            this.setState(prevState => {
                return {
                ...prevState,
                prevParents : response.data.data.docs,
                success : {
                    state : response.data.success ,
                    message : ''
                },
                loading : false
                }
            })

        })
        .catch(err =>  console.log(err))
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
            let category = this.state.category
            NodejsApi.post('/admin/category/create' , category)
                .then(response =>  {
                    console.log(response.data)
                    if(! response.data.success){
                        return this.setState(prevState => {
                            return {
                                ...prevState,
                                validation : false ,
                                close : false,
                                loading : false ,
                                messages : response.data.messages,
                            }
                        })
                    } else if(response.data.success){
                        console.log('result = true')
                        
                        toast.success('اطلاعات با موفقیت ذخیره شد')
                         this.setState((prevState) => {
                            return{
                                ...prevState,
                                messages : [],
                                formData : [],
                                validation : true,
                                loading : false,
                                result : true
                                
                            }
                        })
                    }

                })
                .catch(err => { return console.log(err)})
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loading : false,
                        
                    }
                })
            console.log('submit')
        }
    
        let inputHandler = (e) => {
            e.preventDefault();
            let name = e.target.name
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    category : {
                        ...prevState.category,
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
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن دسته بندی جدید</h2>
                        {   
                            this.state.loading 
                            ? <SpinnerLoading />
                            : 
                                ! this.state.validation 
                                ?   <>
                                <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                    {  
                                        this.state.messages !== undefined ?
                                            this.state.messages.map((error)=>{
                                                return (<span>{error}</span>)   
                                            })
                                        : 'undefined problem'
                                    }
                                </div>                                                 
                                <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100' style={{alignItems : 'center' ,  whiteSpace: 'nowrap'}}>
                                    <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                        <span>نام دسته :</span>
                                        <input type='text' className='dark:text-gray-800' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                    </label>
                                    <label className='w-full flex flex-col md:flex-row md:items-center items-start ' >
                                        <span>دسته والد :</span>
                                        <select className='selector dark:text-gray-800' value={this.state.category.parent} onChange={inputHandler} name='parent' style={{ width: '250px'}} >
                                            <option value='none' defaultValue>دسته اصلی</option>
                                            {
                                                this.state.prevParents.map(parent => {
                                                    console.log(parent)
                                                    return (
                                                        <option value={`${parent._id}`}>{parent.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
                                    </label>
                                    <button type='submit' className='button'>افزودن کاربر جدید</button>
                                </form>
                                </>                                
                                :
                            this.state.result 
                            ?
                            
                            <>
                            <span className='succesSpan'>اطلاعات با موفقیت ذخیره شد</span>
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100' style={{alignItems : 'center' ,  whiteSpace: 'nowrap'}}>
                            <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                    <span>نام دسته :</span>
                                    <input type='text' className='dark:text-gray-800' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                </label>
                                <label className='w-full flex flex-col md:flex-row md:items-center items-start ' >
                                    <span>دسته والد :</span>
                                    <select className='selector dark:text-gray-800' value={this.state.category.parent} onChange={inputHandler} name='parent' style={{ width: '250px'}} >
                                        <option value='none' defaultValue>دسته اصلی</option>
                                        {
                                            this.state.prevParents.map(parent => {
                                                console.log(parent)
                                                return (
                                                    <option value={`${parent._id}`}>{parent.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>
                                <button type='submit' className='button'>افزودن دسته جدید</button>
                            </form>
                            </>
                            :
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100' style={{alignItems : 'center' ,  whiteSpace: 'nowrap'}}>

                                <label className='w-full flex flex-col md:flex-row md:items-center items-start ' >
                                    <span>نام دسته :</span>
                                    <input type='text' className='dark:text-gray-800 ' value={ this.state.category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
                                </label>

                                <label className='w-full flex flex-col md:flex-row md:items-center items-start ' >
                                    <span>دسته والد :</span>  
                                    <select className='selector dark:text-gray-800' value={this.state.category.parent} onChange={inputHandler} name='parent' style={{ width: '250px'}}>
                                        <option value='none' defaultValue>دسته اصلی</option>
                                        {
                                            this.state.prevParents.map(parent => {
                                                console.log(parent)
                                                return (
                                                    <option key={`${parent._id}`} value={`${parent._id}`}>{parent.name}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </label>

                                <button type='submit' className='button'>{this.state.loading ? 
                                setTimeout(() => {
                                    // <Spinner animation='grow' style={{alignSelf : 'center'}} />
                                    
                                }, 3000) :  'افزودن دسته جدید'} </button>
                            </form>
                        }
                </div>
            </div>
            )
    }
}

export default isAdmin( CategoryCreate);