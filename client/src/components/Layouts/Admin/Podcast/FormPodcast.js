import React , { useRef } from 'react';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';

// import Apis
// import UploadAdapter from "src/Api/UploadImageAdaptor";


function FormPodcast(props){

    const hiddenFileInput = useRef(null)
    const hiddensoundFileInput = useRef(null)

    const editorRef = useRef(null);
    const log = (e) => {
        if (editorRef.current) {
            let data = editorRef.current.getContent()
            console.log(data);
            statementHandler(e , data )
        }
    };


    //
    // Props
    //

    // Functions
    let inputHandler = props.inputHandler
    let statementHandler = props.statementHandler
    let formHandler = props.formHandler
    let tagSelectHandler = props.tagSelectHandler
    let categorySelectHandler = props.categorySelectHandler

    // Properties
    let podcast = props.podcast
    let categories = props.categories
    let tags = props.tags

    // selctors initiate
    let categorySelectorValues = []
    if( podcast.categories !== null ){
        podcast.categories.map(category => {
            if(category.name){
                // console.log('0') 
                return categorySelectorValues.push({value : `${category.id}` , label : `${category.name}`})
            } else {
                // console.log('1')
                return categorySelectorValues.push({value : `${category.value}` , label : `${category.label}`})
            }
            
        })
    }

    let tagSelectorValues = []
    if( podcast.tags !== null ){
        podcast.tags.map(tag => {
            if(tag.name){
                // console.log('0') 
                return tagSelectorValues.push({value : `${tag.id}` , label : `${tag.name}`})
            } else {
                // console.log('1')
                return tagSelectorValues.push({value : `${tag.value}` , label : `${tag.label}`})
            }
            
        })
    }
    

    const categoriesOptions = []
    if( categories !== null){
        categories.map(category => {
            // console.log(category)
            return (
                categoriesOptions.push({value : `${category._id}` , label : `${category.name}`})
            )
        })
    } 

    const tagsOptions = []
    if( tags !== null){
        tags.map(tag => {
            // console.log(tag)
            return (
                tagsOptions.push({value : `${tag._id}` , label : `${tag.name}`})
            )
        })
    } 

    let handleFakeButton = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    }

    let handleFakeSoundButton = (e) => {
        e.preventDefault()
        hiddensoundFileInput.current.click()
    }



    // console.log(categories)
    // console.log(tags)


    return (
    <form onSubmit={formHandler}  className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
        <div className='form-row-1'>
            <label className='upload-label' >
                <span className='upload-label-title' >تصویر پادکست  :</span>
                <div className='upload-label-content'  >
                    <input  type='file' style={{display : 'none'}} ref={hiddenFileInput} onChange={props.imageHandler}  name='image' placeholder='تصویر  را در اینجا وارد کنید ...'/>
                    <button className='upload-button'  onClick={handleFakeButton} >upload image</button>
                
                { 
                    props.editMode ?
                    (
                        <div style={{display : 'flex'  , alignItems : 'center' , justifyContent : "space-between"}}>
                            <div style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                <span style={{ marginLeft : '10px'}} >عکس فعلی :</span>
                                <img src={`http://localhost:5000/${podcast.imagepath}`} alt='تصویر پادکست' />
                            </div>
                            <div style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                <span style={{ marginLeft : '10px'}} >عکس جدید :</span>
                                <img src={`${props.imagePreviewUrl}`} alt='تصویر پادکست' />
                            </div>
                        </div>
                    )
                    
                    :
                    
                    (
                        <div style={{display : 'flex'  , alignItems : 'center' , justifyContent : "space-between"}}>
                            <div style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                <span style={{ marginLeft : '10px'}} >عکس انتخابی :</span>
                                <img src={`${props.imagePreviewUrl}`} alt='تصویر پادکست' />
                            </div>
                        </div>
                    )
                }
                </div>
            </label>
        </div>
        <div className='form-row-1'>
            <label className='upload-label' >
                <span className='upload-label-title' >فایل صوت پادکست  :</span>
                <div className='upload-label-content'  >
                <input  type='file' style={{display : 'none'}}  ref={hiddensoundFileInput}   onChange={props.soundHandler} name='sound' placeholder='فایل صوت  را در اینجا وارد کنید ...'/>
                <button className='upload-button'  onClick={handleFakeSoundButton} >upload sound</button>
                { 
                    props.editMode ?
                        (
                            <div style={{display : 'flex'  , alignItems : 'center' , justifyContent : "space-between"}}>
                                <div style={{display : 'flex' , flexDirection : 'column'  , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >صوت فعلی :</span>
                                    <audio controls={true}   src={`http://localhost:5000/${podcast.soundpath}`} />   
                                </div>
                                <div style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >صوت جدید :</span>
                                    <audio controls={true}   src={`${props.soundPreviewUrl}`} />   
                                </div>
                            </div>
                        )
                    
                        :

                        (
                            <div style={{display : 'flex'  , alignItems : 'center' , justifyContent : "space-between"}}>
                                <div style={{display : 'flex' , flexDirection : 'column' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >صوت انتخابی :</span>
                                    <audio controls={true}   src={`${props.soundPreviewUrl}`} />   
                                </div>
                            </div>
                        )
                }
                </div>

            </label>
        </div>
        <div aria-multiselectable='true' className='form-row-1'>
            <label>عنوان پادکست  :
                <input type='text' className='dark:text-gray-800'  value={podcast.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
        </div>

        <div className='form-row-1 textArea-div'>
        <Editor
                apiKey='p94lynm12w29p4yw1evwl9bq1jij8cuxjeoawmsucxm0ia1p'
                onInit={(evt, editor) => editorRef.current = editor}
                onChange={log}
                init={{
                    // plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    plugins: ["advlist", "anchor", "autolink", "charmap", "code", 
                    "help", "image", "insertdatetime", "link", "lists", "media", 
                    "preview", "searchreplace", "table", "visualblocks"],
                    
                    toolbar: 'undo redo language | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    content_langs: [
                        { title: 'English', code: 'en' },
                        { title: 'Spanish', code: 'es' },
                        { title: 'French', code: 'fr' },
                        { title: 'German', code: 'de' },
                        { title: 'Portuguese', code: 'pt' },
                        { title: 'Chinese', code: 'zh' },
                        { title: 'Persian', code: 'fa' },
                    ],
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue={podcast.statement}
            />  
        </div>

        <div aria-multiselectable='true' className='form-row-2'>
            <label>دسته بندی پادکست :
            <Select className='categorySelector dark:!text-gray-800' value={categorySelectorValues} isMulti={true} options={categoriesOptions} onChange={categorySelectHandler}/>

            </label>
            <label>تگ های پادکست :
                <Select className='categorySelector dark:!text-gray-800' value={tagSelectorValues} isMulti={true} options={tagsOptions} onChange={tagSelectHandler}/>
            </label>
        </div>

        <button type='submit' className='button' >{ props.editMode ? 'ویرایش پادکست' : 'افزودن پادکست جدید '}</button>
    </form>
    )
}

export default FormPodcast;