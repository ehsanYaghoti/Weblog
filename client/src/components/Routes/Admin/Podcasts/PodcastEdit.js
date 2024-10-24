// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 



// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormPodcast from '../../../Layouts/Admin/Podcast/FormPodcast'
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
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import isAdmin from 'src/Logics/isAdmin';

library.add(faTimes)

class PodcastEdit extends React.Component {
    
    state = { 
        podcast : { 
            title : '',
            statement  : '<p><strong>توضیح را در اینجا وارد کنید</strong></p>',
            image : '' ,
            sound : '',
            categories : [],
            tags : [] ,
            imagepath : '',
            soundpath : ''
        } ,
        success : { state : true ,  message : ''},
        imageInput : {
            file : '',
            previewUrl : ''
        },
        soundInput : {
            file : '',
            previewUrl : ''
        },
        podcastCategories : [],
        categories : [],
        podcastTags : [],
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
        let param =  this.props.match.params.id
        NodejsApi.get(`/admin/podcasts/edit/${param}`)
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
                podcast : response.data.data ,
                categories : response.data.categories,
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


            let categories = []
            if(this.state.podcast.categories.length !== 0){
                this.state.podcast.categories.forEach(category => {
                    if(category.name){
                        return categories.push(category.id)
                    } else if(category.label){
                        return categories.push(category.value)
                    }
                    
                })
            }

            let tags = []
            if(this.state.podcast.tags.length !== 0){
                this.state.podcast.tags.forEach(tag => {
                    if(tag.name){
                        return tags.push(tag.id)
                    } else if(tag.label){
                        return tags.push(tag.value)
                    }
                    
                })
            }

            let formData = new FormData()
            formData.append('image' , this.state.podcast.image)
            formData.append('sound' , this.state.podcast.sound)

            formData.append('title' , this.state.podcast.title)
            formData.append('statement' , this.state.podcast.statement)

            formData.append('categories' , categories)
            formData.append('tags' , tags)
            console.log( formData)




            NodejsApi.put(`/admin/podcasts/${this.state.param}/update` , formData  , {headers : {'content-type' : 'multipart/form-data' }  })
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
                    podcast : {
                        ...prevState.podcast,
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

        let categorySelectHandler = selectedOption => {
            const values = []
            selectedOption.map(option => {
               return values.push(option.value)
            })

            console.log(selectedOption)
            console.log(values)

            this.setState(prevState => {
                return {
                    ...prevState,
                    podcastCategories : selectedOption,
                    // postCategories : values,
                    podcast : {
                        ...prevState.podcast,
                        categories : selectedOption
                    }
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
                    podcastTags : selectedOption,
                    // postCategories : values,
                    podcast : {
                        ...prevState.podcast,
                        tags : selectedOption
                    }
                }
            })
        }

        let imageHandler = (e) => {
 

            if (e.target.files && e.target.files[0]) {

                let img = e.target.files[0];

                this.setState(prevState => {
                    return {
                        ...prevState,
                        podcast : {
                            ...prevState.podcast,
                            image:  img
                            
                        },
                        imageInput : {
                            file : '',
                            previewUrl : URL.createObjectURL(img)
                        },
                    }
                });
              }

        }

        let soundHandler = (e) => {
            e.preventDefault();

            if (e.target.files && e.target.files[0]) {

                let sound = e.target.files[0];

                this.setState(prevState => {
                    return {
                        ...prevState,
                        podcast : {
                            ...prevState.podcast,
                            sound:  sound
                            
                        },
                        soundInput : {
                            previewUrl  : URL.createObjectURL(sound)
                        }
                    }
                });
              }
        }

        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    podcast : {
                        ...prevState.podcast,
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
                    <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش پادکست</h2>
                        {   
                            this.state.loading 
                            ? <Spinner animation='grow' style={{alignSelf : 'center'}} />
                            :   ! this.state.success.state ?
                                (
                                    <span style={{margin : 'auto'}} >{this.state.success.message}</span>
                                )
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
                                    <FormPodcast editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} soundPreviewUrl={this.state.soundInput.previewUrl} categories={this.state.categories} tags={this.state.tags} podcast={this.state.podcast}  inputHandler={inputHandler} formHandler={formHandler}  categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} soundHandler={soundHandler} statementHandler={statementHandler} />
                                </>                                
                                :
                                this.state.result 
                                ?
                                <>
                                    <span style={{alignSelf : 'center' , padding : '10px' ,  backgroundColor : 'green' , color : 'white' , borderRadius : '5px' ,  marginBottom : '20px'}}>اطلاعات با موفقیت ذخیره شد</span>
                                    <FormPodcast editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} soundPreviewUrl={this.state.soundInput.previewUrl} categories={this.state.categories} tags={this.state.tags} podcast={this.state.podcast} inputHandler={inputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} soundHandler={soundHandler} statementHandler={statementHandler}  />
                                </>
                            :
                            <FormPodcast editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} soundPreviewUrl={this.state.soundInput.previewUrl} categories={this.state.categories} tags={this.state.tags} podcast={this.state.podcast} inputHandler={inputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} soundHandler={soundHandler} statementHandler={statementHandler}  />
                        }
                </div>
                <GoTopBtn />
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default isAdmin( PodcastEdit);