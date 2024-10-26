// Modules
import React    from 'react';

// import api
import NodejsApi from 'src/Api/NodejsApi'; 


// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormArticle from 'src/components/Layouts/Admin/Article/FormArticle';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'
import Spinner from 'react-bootstrap/Spinner'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {faTimes } from "@fortawesome/free-solid-svg-icons";
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import isAdmin from 'src/Logics/isAdmin';
import { toast } from 'react-toastify';


library.add(faTimes)

class ArticleCreate extends React.Component {
    
    // states

    state = { 
        article : { 
            title : '',
            statement  : '<p><strong>توضیح را در اینجا وارد کنید</strong></p>',
            language : 'en',
            image : '' ,
            author : '',
            readingtime : '',
            source : '', 
            categories : [],
            tags : [] ,
        } ,
        success : { state : true ,  message : ''},
        imageInput : {
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
            formData.append('source' , this.state.article.source)
            formData.append('categories' , categories)
            formData.append('tags' , tags)
            // console.log( formData)


            NodejsApi.post('/admin/articles/create' , formData  , {headers : {'content-type' : 'multipart/form-data' }  })
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
                        toast.success('اطلاعات با موفقیت ذخیره شد')
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
            console.log(data)
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
    
        console.log(this.state.article)

        return (
            <div className='home-dashboard'>
                <Navbar user={this.state.authenticatedUser} />
                <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                    <AdminrPanelHeader  user={this.state.authenticatedUser} />
                    <h2 className='dashborad-body-title dark:text-gray-50'>افزودن مقاله جدید</h2>
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
                                    <FormArticle editMode={false} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags} statementHandler={statementHandler} imageHandler={imageHandler} article={this.state.article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                                </>                                
                                :
                                this.state.result 
                                ? 
                                <>
                                    <span className='success-true-messaeg' >اطلاعات با موفقیت ذخیره شد</span>
                                    <FormArticle editMode={false} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags}statementHandler={statementHandler} imageHandler={imageHandler} article={this.state.article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                                </>
                            :
                            <FormArticle editMode={false} imagePreviewUrl={this.state.imageInput.previewUrl} categories={this.state.categories} tags={this.state.tags} statementHandler={statementHandler} imageHandler={imageHandler} article={this.state.article} inputHandler={inputHandler} radioInputHandler={radioInputHandler} categorySelectHandler={categorySelectHandler} tagSelectHandler={tagSelectHandler} formHandler={formHandler}  />
                        }
                </div>
                <GoTopBtn />
            </div>
            )
    }
}

export default isAdmin( ArticleCreate);