// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';
library.add(faTimes)


class TagCreate extends React.Component {
    
    state = { 
        tag : { 
            name : '',
            explain : '',
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
            NodejsApi.post('/admin/tag/create' , tag)
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
                .catch(err => { 
                    return console.log(err)
                
                })
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
    
        console.log(this.state.authenticatedUser)
        return (

            <div className='home-dashboard'>
                <Navbar user={this.state.authenticatedUser} />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader user={this.state.authenticatedUser} />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن تگ جدید</h2>
                        {   
                            this.state.loading 
                            ? 

                                setTimeout(() => {
                                
                                    <Spinner animation='grow' style={{alignSelf : 'center'}} />
                                    
                                }, 5000)

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
                                    <button type='submit' className='button'>افزودن تگ جدید</button>
                                </form>
                                </>                                
                                :
                            this.state.result 
                            ?
                            
                            <>
                            <span className='succesSpan'>اطلاعات با موفقیت ذخیره شد</span>
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100' style={{alignItems : 'center' ,  whiteSpace: 'nowrap'}}>
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
                                <button type='submit' className='button'>افزودن تگ جدید</button>
                            </form>
                            </>
                            :
                            <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100' style={{alignItems : 'center' ,  whiteSpace: 'nowrap'}}>
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
                                <button type='submit' className='button'>{this.state.loading ? 
                                setTimeout(() => {
                                    <Spinner animation='grow' style={{alignSelf : 'center'}} />
                                    
                                }, 3000) :  'افزودن تگ جدید'} </button>
                            </form>
                        }
                </div>
            </div>
            )
    }
}

export default isAdmin( TagCreate);