// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 


// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPost from 'src/components/Layouts/Admin/Post/FormPost';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';

library.add(faTimes)

class Create extends React.Component {
    

    // states

    state = { 
        post : { 
            title : '',
            statement  : '<p><strong>توضیح را در اینجا وارد کنید</strong></p>',
            language : 'en',
            tags : [] ,
        } ,
        success : { state : true ,  message : ''},
        imageInput : {
            file : '',
            previewUrl : ''
        },
        postTags : [],
        tags : [],
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

    // lifecycle  functions

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
        NodejsApi.get(`/admin/category`)
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
                categories : response.data.data.docs ,
                success : {
                    state : response.data.success ,
                    message : ''
                },
                loading : false
                }
            })

        })
        .catch(err =>  console.log(err))


        NodejsApi.get(`/admin/tags`)
        .then(response => {
            console.log(response.data)
            if(! response.data.success){
                return  this.setState(prevState => {
                   return {
                    ...prevState,
                    success : {
                        state : response.data.success ,
                        message : response.data.messages
                    },
                    loading : false
                    }
                })
              
            }

            this.setState(prevState => {
                return {
                ...prevState,
                tags : response.data.data.docs ,
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

        //
        // Handlers functions 
        //


        let formHandler = (e) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    loading : true
                }
            })
            e.preventDefault();

            let tags = []
            if(this.state.post.tags.length !== 0){
                this.state.post.tags.forEach(tag => {
                    if(tag.name){
                        return tags.push(tag.id)
                    } else if(tag.label){
                        return tags.push(tag.value)
                    }
                    
                })
            }
            console.log('tags' +  tags)
            let formData = new FormData()
            // formData.append('image' , this.state.post.image)
            formData.append('title' , this.state.post.title)
            formData.append('statement' , this.state.post.statement)
            formData.append('tags' , tags)
            // console.log( formData)

            let post = {
                title : this.state.post.title,
                statement : this.state.post.statement,
                language : this.state.post.language ,
                tags : tags
            }




            // let post = this.state.post

            NodejsApi.post('/admin/posts/create' , post )
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
                    console.log(err)
                    return this.setState(prevState => {
                        return {
                            ...prevState,
                            validation : false ,
                            close : false,
                            loading : false ,
                            messages : err.message,
                        }
                    })
                })
                this.setState(prevState => {
                    return {
                        ...prevState,
                        loading : false,
                        
                    }
                })
            // console.log('submit')
        }
    
        let inputHandler = (e) => {
            e.preventDefault();
            let name = e.target.name
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    post : {
                        ...prevState.post,
                        [name] : value
                    }
                }
            })
        }

        let radioInputHandler = (e) => {
            let name = e.target.name
            let value = e.target.value

            this.setState(prevState => {
                return {
                    ...prevState,
                    post : {
                        ...prevState.post,
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

        let tagSelectHandler = selectedOption => {
            const values = []
            selectedOption.map(option => {
               return values.push(option.value)
            })

            console.log(selectedOption)
            console.log(values)

            this.setState(prevState => {
                return {
                    ...prevState,
                    postTags : selectedOption,
                    // postCategories : values,
                    post : {
                        ...prevState.post,
                        tags : selectedOption
                    }
                }
            })
        }
        

        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    post : {
                        ...prevState.post,
                        statement : data
                    }
                }
            })
        }
    
        console.log(this.state)

        return (
            <div className='home-dashboard'>
                <Navbar user={this.state.authenticatedUser} />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader user={this.state.authenticatedUser} />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن پست جدید</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            : 
                                ! this.state.validation 
                                ?   
                                <>
                                    <div className={ this.state.close ? 'closed' : "validErrors" }   >
                                    <button type="button" id="close" onClick={closeController} className="close"><FontAwesomeIcon icon='times'  /> </button>
                                        {   
                                            Array.isArray(this.state.messages) ?
                                                
                                            this.state.messages.map((error)=>{
                                                return (<span key={error}>{error}</span>)   
                                            })
                                            
                                            : ''
                                        
                                        }
                                    </div>                                                 
                                    <FormPost  tags={this.state.tags} statementHandler={statementHandler}  post={this.state.post} inputHandler={inputHandler} radioInputHandler={radioInputHandler}  tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span className='success-true-messaeg' >اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPost  tags={this.state.tags} statementHandler={statementHandler}  post={this.state.post} inputHandler={inputHandler} radioInputHandler={radioInputHandler}  tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                                </>
                            :
                            <FormPost  tags={this.state.tags} statementHandler={statementHandler}  post={this.state.post} inputHandler={inputHandler} radioInputHandler={radioInputHandler}  tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                        }
                </div>
            </div>
            )
    }
}

export default isAdmin( Create);