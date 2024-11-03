// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormRole from 'src/components/Layouts/Admin/Role/FormRole'
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

class RoleCreate extends React.Component {
    constructor(props){
        super(props)
        this.selectInput =  React.createRef('')
    }
    state = { 
        role : { 
            name : '',
            label  : '',
            permissions : []
        } ,
        success : { state : true ,  message : ''},
        rolePermissions : [],
        postPermissions : [],
        permissions : [],
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
        NodejsApi.get(`/admin/permissions`)
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
                permissions : response.data.data.docs ,
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
            // const role = this.state.role
            const data = {
                ...this.state.role,
                postPermissions : this.state.postPermissions
            }


            // let b = {a : 'a' , b : 'b' , some : ['c' , 'd' , 'e']}
            console.log(data)
            NodejsApi.post('/admin/roles/create' , data  ,{withCredentials : true})
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
                    role : {
                        ...prevState.role,
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

        let selectHandler = selectedOption => {
            const values = []
            selectedOption.map(option => {
               return values.push(option.value)
            })
            console.log(values)

            this.setState(prevState => {
                return {
                    ...prevState,
                    rolePermissions : selectedOption,
                    postPermissions : values,
                    role : {
                        ...prevState.role,
                        permissions : values
                    }
                }
            })
        }
    

        // let selectHandler = (e) => {
        //     e.preventDefault();
        //     // console.log(e)
        //     let value = e.target.value
        //     // let name = e.target.name
        //     // let key = e.target.key


        //     this.setState(prevState => {
        //         return {
        //             ...prevState,
        //             role : {
        //                 ...prevState.role,
        //                 permissions : [
        //                     ...prevState.role.permissions,
        //                     value
        //                 ]
        //             }
        //         }
        //     })
        // }
    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <Navbar user={this.state.authenticatedUser} />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader user={this.state.authenticatedUser} />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن نقش جدید</h2>
                        {   
                            this.state.loading 
                            ? <SpinnerLoading />
                            : 
                                ! this.state.validation 
                                ?   
                                <>
                                    <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                        {   this.state.messages.map((error)=>{
                                            return (<span key={error}>{error}</span>)   
                                            })
                                        }
                                    </div>                                                 
                                    <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions}  role={this.state.role} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions}  role={this.state.role} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                                </>
                            :
                            <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions}  role={this.state.role} inputHandler={inputHandler} selectHandler={selectHandler} formHandler={formHandler}  />
                        }
                </div>
            </div>
            )
    }
}

export default isAdmin( RoleCreate);