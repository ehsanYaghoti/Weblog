import React , {useRef } from 'react';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';

// import Apis
// import UploadAdapter from "src/Api/UploadImageAdaptor";


function FormArticle(props){

    const hiddenFileInput = useRef(null)

    const editorRef = useRef(null);
    const log = (e) => {
        if (editorRef.current) {
            let data = editorRef.current.getContent()
            console.log(data);
            statementHandler(e , data )
        }
    };

    // Props

    let inputHandler = props.inputHandler
    let statementHandler = props.statementHandler
    let formHandler = props.formHandler
    let tagSelectHandler = props.tagSelectHandler
    let categorySelectHandler = props.categorySelectHandler
    let radioInputHandler = props.radioInputHandler
 
    let article = props.article
    let categories = props.categories
    let tags = props.tags

    // selctors initiate

    let categorySelectorValues = []
    if( article.categories !== null ){
        article.categories.map(category => {
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
    if( article.tags !== null ){
        article.tags.map(tag => {
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


    // console.log(categories)
    // console.log(tags)


    return (
    <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100 '>
        <div className='form-row-1'>
            <label className='upload-label' >
                <span className='upload-label-title' >تصویر مقاله  :</span>
                <div className='upload-label-content'  >
                    <input  type='file' style={{display : 'none'}}  ref={hiddenFileInput}  onChange={props.imageHandler} name='image' placeholder='تصویر  را در اینجا وارد کنید ...'/>
                    <button className='upload-button'  onClick={handleFakeButton} >upload image</button>
                    { 
                        props.editMode ?
                        (
                            <div style={{display : 'flex'  , alignItems : 'center' , gap : '10px' , justifyContent : "space-between"}}>
                                <div className='dark:!border-gray-50' style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >عکس فعلی :</span>
                                    <img src={`http://localhost:5000/${article.imagepath}`} alt='تصویر مقاله' />
                                </div>
                                <div className='dark:!border-gray-50' style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >عکس جدید :</span>
                                    <img src={`${props.imagePreviewUrl}`} alt='تصویر مقاله' />
                                </div>
                            </div>
                        )
                        
                        :
                        
                        (
                            <div className='flex items-center flex-col gap-8 md:flex-row md:justify-between'  >
                                <div className='dark:!border-gray-50' style={{display : 'flex' , alignItems : 'center' , border : '1px solid rgba(0 , 0 , 0 , .1 )' , borderRadius : '5px' , padding : '10px' }}>
                                    <span style={{ marginLeft : '10px'}} >عکس انتخابی :</span>
                                    <img src={`${props.imagePreviewUrl}`} alt='تصویر مقاله' />
                                </div>
                            </div>
                        )
                    }
                </div>
            </label>
        </div>
        <div aria-multiselectable='true' className='form-row-1'>
                <span className='label_radio_title' >زبان مقاله  :</span>
                <div className='label_radio_container' >
                    <label className='label_radio' >
                        <span className='w-fit' >فارسی</span>
                        <input type='radio' value='fa' checked={article.language === 'fa' ? true : false }  onChange={radioInputHandler} name='language' />
                    </label>
                    <label className='label_radio'  >
                        <span>انگلیسی</span>
                        <input type='radio' value='en' checked={article.language === 'en' ? true : false }  onChange={radioInputHandler} name='language' />
                    </label>
                </div>
        </div>
        <div aria-multiselectable='true' className='form-row-1 '>
            <label>
                <span>عنوان مقاله  :</span> 
                <input type='text' className='dark:text-gray-800' value={article.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
        </div>


        <div className='form-row-1 textArea-div'>
            <Editor
                apiKey='aklhw3rzqy6gr4r5nqi5m52lbud8gbop52s9o07cz6q0wmgy'
                onInit={(evt, editor) => editorRef.current = editor}
                onChange={log}
                init={{
                    plugins: ["advlist", "anchor", "autolink", "charmap", "code", 
                    "help", "image", "insertdatetime", "link", "lists", "media", 
                    "preview", "searchreplace", "table", "visualblocks"],
                    // 'tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    
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
                initialValue={article.statement}
            />  
        </div>
        <button type='button' onClick={log}>Log editor content</button>

        <div aria-multiselectable='true' className='form-row-2'>
            <label>دسته بندی مقاله :
            <Select className='categorySelector dark:text-gray-800' value={categorySelectorValues} isMulti={true} options={categoriesOptions} onChange={categorySelectHandler}/>

            </label>
            <label>تگ های مقاله :
                <Select className='categorySelector dark:text-gray-800' value={tagSelectorValues} isMulti={true} options={tagsOptions} onChange={tagSelectHandler}/>
            </label>
        </div>
        <div className='form-row-1'>
            <label>منبع مقاله  :
                <input type='text' className='dark:text-gray-800' value={article.source}  onChange={inputHandler} name='source' placeholder='منبع  را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-1'>
            <label>مدت زمان مطالعه مقاله  :
                <input type='text' className='dark:text-gray-800' value={article.readingtime}  onChange={inputHandler} name='readingtime' placeholder='مدت زمان مطالعه  را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-1'>
            <label>تعداد لایک :
                <input  disabled type='text' className='dark:text-gray-800' value={article.likeCount}  onChange={inputHandler} name='likeCount' placeholder='تعداد لایک را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <div className='form-row-1'>
            <label>تعداد ذخیره :
                <input  disabled type='text' className='dark:text-gray-800' value={article.saveCount}  onChange={inputHandler} name='saveCount' placeholder='تعداد ذخیره را در اینجا وارد کنید ...'/>
            </label>
        </div>
        <button type='submit' className='button' >{ props.editMode ? 'ویرایش مقاله' : 'افزودن مقاله جدید '}</button>
    </form>
    )
}

export default FormArticle;