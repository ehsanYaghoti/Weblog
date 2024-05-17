// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 



// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPost from 'src/components/Layouts/Admin/Post/FormPost';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// import contexts
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Modules
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import isAdmin from 'src/Logics/isAdmin';

library.add(faTimes)

class PostEdit extends React.Component {
    
    state = { 
        post : { 
            title : '',
            statement  : '',
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

    componentDidMount(){
        if(this.props.location.state === undefined){
            this.props.navigate('/admin/posts')
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
        NodejsApi.get(`/admin/posts/edit/${param}`)
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
                post : response.data.data ,
                tags : response.data.tags,
                param ,
                success : {
                    state : response.data.success ,
                    message : ''
                },
                loading : false
                }
            })

        })
        .catch(err => {
            console.log(err)
            return  this.setState(prevState => {
                return {
                    ...prevState,
                    success : {
                        state : false ,
                        message : err.message
                    },
                    loading : false
                }
             })
            
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

            let post = {
                title : this.state.post.title,
                statement : this.state.post.statement,
                language : this.state.post.language ,
                tags : tags
            }



            NodejsApi.put(`/admin/posts/${this.state.param}/update` , post )
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
                    return  this.setState(prevState => {
                        return {
                            ...prevState,
                            success : {
                                state : false ,
                                message : err.message
                            },
                            loading : false
                        }
                     })
                
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

        // let imageHandler = (e) => {
        //     e.preventDefault();
        //     // let reader = new FileReader()
        //     // let file = e.target.files[0]
        //     console.log(e.target.files[0])

        //     if (e.target.files && e.target.files[0]) {

        //         let img = e.target.files[0];

        //         this.setState(prevState => {
        //             return {
        //                 ...prevState,
        //                 post : {
        //                     ...prevState.post,
        //                     image:  img
                            
        //                 }
        //             }
        //         });
        //       }
        //     // reader.onloadend = () => {
        //     //     this.setState(prevState => {
        //     //         return {
        //     //             ...prevState,
        //     //             imageInput : {
        //     //                 file,
        //     //                 previewUrl : reader.result
        //     //             }
        //     //         }
        //     //     })
        //     //     console.log(this.state)
        //     // }
        //     // console.log(reader)

        // }

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
                <AuthenticatedUserContext.Provider  value={this.state.authenticatedUser}  >
                <Navbar />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader />
                    <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش پست</h2>
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
                                    <FormPost editMode={true} tags={this.state.tags} post={this.state.post}  inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler}   tagSelectHandler={tagSelectHandler} statementHandler={statementHandler} />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPost editMode={true} tags={this.state.tags} post={this.state.post} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler}  tagSelectHandler={tagSelectHandler} statementHandler={statementHandler}  />
                                </>
                            :
                            <FormPost editMode={true} tags={this.state.tags} post={this.state.post} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler}  tagSelectHandler={tagSelectHandler} statementHandler={statementHandler}  />
                        }
                </div>
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( PostEdit);