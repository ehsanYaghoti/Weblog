// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormRole from 'src/components/Layouts/Admin/Role/FormRole'
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

class RoleEdit extends React.Component {
    
    state = { 
        role : { 
            name : '',
            label  : '',
            permissions : []
        } ,
        success : { state : true ,  message : ''},
        rolePermissions : [],
        permissions : [],
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
        if(this.props.location.state === undefined){
            this.props.navigate('/admin/roles')
        }
        this.setState(prevState => {
            return {
                ...prevState,
                authenticatedUser : this.props.location.state
            }
        })

        this.setState(prevState => {
            return {
                ...prevState,
                loading : true,
                
            }
        })
        let param =  this.props.match.params.id
        NodejsApi.get(`/admin/roles/edit/${param}`)
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
            const rolePermissions = [
                
            ]
            response.data.data.permissions.map(permission => {
                return rolePermissions.push({value : permission._id , label : permission.label})
            })
            this.setState(prevState => {
                return {
                ...prevState,
                role : response.data.data ,
                rolePermissions : rolePermissions  ,
                permissions : response.data.permissions,
                param ,
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
            const data = {
                ...this.state.role,
                postPermissions : this.state.postPermissions
            }
            NodejsApi.put(`/admin/roles/${this.state.param}/update` , data)
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
        //     let value = e.target.value

        //     this.setState(prevState => {
        //         return {
        //             ...prevState,
        //             role : {
        //                 ...prevState.role,
        //                 permissions : [
        //                     ...prevState.role.permissions,
        //                     value
        //                 ]
        //             },
        //         }
        //     })
        // }
    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <AuthenticatedUserContext.Provider  value={this.state.authenticatedUser}  >
                <Navbar />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader />
                    <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش نقش</h2>
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
                                            return (<span key={error}>{error}</span>)   
                                            })
                                        }
                                    </div>                                                 
                                    <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions} role={this.state.role}  inputHandler={inputHandler} formHandler={formHandler}  selectHandler={selectHandler}/>
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions} role={this.state.role} inputHandler={inputHandler} formHandler={formHandler} selectHandler={selectHandler} />
                                </>
                            :
                            <FormRole permissions={this.state.permissions} rolePermissions={this.state.rolePermissions} role={this.state.role} inputHandler={inputHandler} formHandler={formHandler} selectHandler={selectHandler} />
                        }
                </div>
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( RoleEdit);