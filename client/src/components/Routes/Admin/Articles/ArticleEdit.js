// Modules
import React    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormArticle from '../../../Layouts/Admin/Article/FormArticle'
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
import {faClose, faTimes } from "@fortawesome/free-solid-svg-icons";
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';

library.add(faTimes)

class ArticleEdit extends React.Component {
    
    state = { 
        article : { 
            title : '',
            statement  : '',
            language : 'en',
            image : '' ,
            author : '',
            readingtime : '',
            likeCount : '',
            saveCount : '',
            source : '', 
            categories : [],
            tags : [] ,
        } ,
        success : { state : true ,  message : ''},
        imageInput : {
            file : '',
            previewUrl : ''
        },
        articleCategories : [],
        categories : [],
        articleTags : [],
        tags : [],
        loading : false ,
        validation : true ,
        messages : [],
        formData : [],
        close : false,
        result : false,
        resultClose : false,
        authenticatedUser : {
            isAuthenticated : false,
            user : {}
        }
        
    }

    componentDidMount(){
        if(this.props.location.state === undefined){
            this.props.history.push('/admin/articles')
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
        NodejsApi.get(`/admin/articles/edit/${param}`)
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
                article : response.data.data ,
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
            if(this.state.article.categories.length !== 0){
                this.state.article.categories.forEach(category => {
                    if(category.name){
                        return categories.push(category.id)
                    } else if(category.label){
                        return categories.push(category.value)
                    }
                    
                })
            }

            let tags = []
            if(this.state.article.tags.length !== 0){
                this.state.article.tags.forEach(tag => {
                    if(tag.name){
                        return tags.push(tag.id)
                    } else if(tag.label){
                        return tags.push(tag.value)
                    }
                    
                })
            }

            let formData = new FormData()
            formData.append('image' , this.state.article.image)
            formData.append('title' , this.state.article.title)
            formData.append('statement' , this.state.article.statement)
            formData.append('language' , this.state.article.language)
            formData.append('readingtime' , this.state.article.readingtime)
            formData.append('likeCount' , this.state.article.likeCount)
            formData.append('saveCount' , this.state.article.saveCount)
            formData.append('source' , this.state.article.source)
            formData.append('categories' , categories)
            formData.append('tags' , tags)
            console.log( formData)




            NodejsApi.put(`/admin/articles/${this.state.param}/update` , formData  , {headers : {'content-type' : 'multipart/form-data' }  })
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
                                result : true,
                                resultClose : true
                                
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
                    article : {
                        ...prevState.article,
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
                    article : {
                        ...prevState.article,
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
                    articleCategories : selectedOption,
                    // postCategories : values,
                    article : {
                        ...prevState.article,
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
                    articleTags : selectedOption,
                    // postCategories : values,
                    article : {
                        ...prevState.article,
                        tags : selectedOption
                    }
                }
            })
        }

        let imageHandler = (e) => {
            e.preventDefault();

            if (e.target.files && e.target.files[0]) {

                let img = e.target.files[0];

                this.setState(prevState => {
                    return {
                        ...prevState,
                        article : {
                            ...prevState.article,
                            image:  img
                            
                        },
                        imageInput : {
                            previewUrl : URL.createObjectURL(img)
                        },
                    }
                });
            }
        }

        let statementHandler = (e , data) => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    article : {
                        ...prevState.article,
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
                    <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش مقاله</h2>
                        {   
                            this.state.loading 
                            ?  <div className='fixed h-screen w-screen bg-gray-500 bg-opacity-30 flex items-center justify-center z-50' ><Spinner animation='grow' style={{alignSelf : 'center'}} /></div>
                            :   ! this.state.success.state ?
                                    (
                                        <span>{this.state.success.message}</span>
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
                                    <FormArticle editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags} article={this.state.article}  inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler}  categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} statementHandler={statementHandler} />
                                </>                                
                                :
                                this.state.result 
                                ? 
                                <>
                                    {this.state.resultClose ?
                                    <div id='overlay' className='fixed h-screen w-screen bg-gray-500 bg-opacity-30 flex items-center justify-center z-50' onClick={e => this.setState(prevState => { return { ...prevState , resultClose :false } }) } >
                                        <div className='h-fit flex items-start gap-6 p-6  bg-green-600 text-white rounded-lg'>
                                            <FontAwesomeIcon icon={faClose} className='text-lg hover:opacity-50 cursor-pointer' />
                                            <span className='mt-6 text-xl' >اطلاعات با موفقیت ذخیره شد</span>
                                        </div>
                                    </div>
                                    : ''}
                                    <FormArticle editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags} article={this.state.article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} statementHandler={statementHandler}  />
                                </> 
                            :
                            <FormArticle editMode={true} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags} article={this.state.article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} formHandler={formHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} imageHandler={imageHandler} statementHandler={statementHandler}  />
                        }
                </div>
                <GoTopBtn />
                </AuthenticatedUserContext.Provider>
            </div>
            )
    }
}

export default ArticleEdit;