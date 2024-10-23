// Modules
import React    from 'react';
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
import isAdmin from 'src/Logics/isAdmin';

library.add(faTimes)


class CategoryCreate extends React.Component {
    
    state = { 
        tag : { 
            name : '',
        } ,
        success : { state : true ,  message : ''},
        param : '',
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
                param : this.props.match.params.id
            }
        })
        NodejsApi.get(`/admin/tag/edit/${this.props.match.params.id}`)
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
                tag : {
                    name : response.data.data.tag.name
                },
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
            let tag = this.state.tag
            NodejsApi.put(`/admin/tag/${this.state.param}/update` , tag)
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
                    tag : {
                        ...prevState.tag,
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
    
        // console.log(this.state)

        return (
            <div className='home-dashboard'>
                <AuthenticatedUserContext.Provider  value={this.state.authenticatedUser}  >
                <Navbar />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader />
                    <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش تگ</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                                ! this.state.validation 
                                ?   
                                <>
                                    <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                        <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                        {   this.state.messages.map((error)=>{
                                            return (<span>{error}</span>)   
                                            })
                                        }
                                    </div>                                                 
                                    <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
                                        <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                        <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                            <span>نام تگ :</span>
                                            <input type='text' className='dark:text-gray-800' value={ this.state.tag.name}  onChange={inputHandler} name='name' placeholder='نام تگ را در اینجا وارد کنید ...'/>
                                        </label>
                                        </div>
                                        <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                        <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                            <span>توضیح تگ :</span>
                                            <input type='text' className='dark:text-gray-800' value={ this.state.tag.explain}  onChange={inputHandler} name='explain' placeholder='توضیح تگ را در اینجا وارد کنید ...'/>
                                        </label>
                                        </div>
                                        <button type='submit' className='button'>ویرایش تگ</button>
                                    </form>
                                </>                                
                                :
                            this.state.result 
                            ?
                            
                            <>
                                <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
                                    <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                    <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                        <span>نام تگ :</span>
                                        <input type='text' className='dark:text-gray-800' value={ this.state.tag.name}  onChange={inputHandler} name='name' placeholder='نام تگ را در اینجا وارد کنید ...'/>
                                    </label>
                                    </div>
                                    <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                    <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                        <span>توضیح تگ :</span>
                                        <input type='text' className='dark:text-gray-800' value={ this.state.tag.explain}  onChange={inputHandler} name='explain' placeholder='توضیح تگ را در اینجا وارد کنید ...'/>
                                    </label>
                                    </div>
                                    <button type='submit' className='button'>ویرایش تگ</button>
                                </form>
                            </>
                            :
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
                                <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                    <span>نام تگ :</span>
                                    <input type='text' className='dark:text-gray-800' value={ this.state.tag.name}  onChange={inputHandler} name='name' placeholder='نام تگ را در اینجا وارد کنید ...'/>
                                </label>
                                </div>
                                <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
                                <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                                    <span>توضیح تگ :</span>
                                    <input type='text' className='dark:text-gray-800' value={ this.state.tag.explain}  onChange={inputHandler} name='explain' placeholder='توضیح تگ را در اینجا وارد کنید ...'/>
                                </label>
                                </div>
                                <button type='submit' className='button'>ویرایش تگ</button>
                            </form>
                        }
                </div>
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( CategoryCreate);