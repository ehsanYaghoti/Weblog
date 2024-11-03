// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPermission from 'src/components/Layouts/Admin/Permission/FormPermission'
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

class PermissionCreate extends React.Component {
    
    state = { 
        permission : { 
            name : '',
            label  : '',
        } ,
        success : { state : true ,  message : ''},
        loading : false ,
        validation : true ,
        messages : [],
        formData : [],
        close : false,
        result : false,
        editMode : false,
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
            let permission = this.state.permission
            NodejsApi.post('/admin/permissions/create' , permission)
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
                    permission : {
                        ...prevState.permission,
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
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن مجوز جدید</h2>
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
                                    <FormPermission editMode={this.state.editMode} permission={this.state.permission} inputHandler={inputHandler}  formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPermission editMode={this.state.editMode}   permission={this.state.permission} inputHandler={inputHandler}  formHandler={formHandler}  />
                                </>
                            :
                            <FormPermission editMode={this.state.editMode}  permission={this.state.permission} inputHandler={inputHandler}  formHandler={formHandler}  />
                        }
                </div>
            </div>
            )
    }
}

export default isAdmin( PermissionCreate);