// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormReport from 'src/components/Layouts/Admin/Report/FormReport';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// import contexts
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';
library.add(faTimes)



class ReportCreate extends React.Component {
    
    state = { 
        report : { 
            title : '',
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
        if(this.props.location.state === undefined){
            this.props.navigate('/admin/reports')
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
            let report = this.state.report
            NodejsApi.post('/admin/report/create' , report)
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
                    report : {
                        ...prevState.report,
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
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن گزارش جدید</h2>
                        {   
                            this.state.loading 
                            ? 
                                <Spinner animation='grow' style={{alignSelf : 'center'}} />                                    

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
                                <FormReport   report={this.state.report} inputHandler={inputHandler} formHandler={formHandler}  />

                    
                                </>                                
                                :
                            this.state.result 
                            ?
                            
                            <>
                            <span className='succesSpan'  >اطلاعات با موفقیت ذخیره شد</span>

                            {
                                setTimeout(() => {
                                                ''                
                                }, 3000)
                            }
                            
                            <FormReport   report={this.state.report} inputHandler={inputHandler} formHandler={formHandler}  />

                            </>
                            :
                            <FormReport   report={this.state.report} inputHandler={inputHandler} formHandler={formHandler}  />

                        }
                </div>
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( ReportCreate);