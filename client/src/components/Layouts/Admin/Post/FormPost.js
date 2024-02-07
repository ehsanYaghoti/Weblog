import React , { useRef } from 'react';
import Select from 'react-select';
import { Editor } from '@tinymce/tinymce-react';

// import Apis
// import UploadAdapter from "src/Api/UploadImageAdaptor";
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import '@ckeditor/ckeditor5-build-classic/build/translations/fa';


function FormPost(props){

    //
    //  CK editor configuration
    // 

        // Custom Upload Adapter Plugin function
        // function CustomUploadAdapterPlugin(editor) {
        //     editor.plugins.get("FileRepository").createUploadAdapter = loader => {

        //         // Create new object and pass server url
        //         return new UploadAdapter(loader);
        //     };
        // }
        // // ClassicEditor.builtinPlugins.map( plugin => console.log(plugin.pluginName) );
        // const config = {
        //     language: 'fa',
        //     extraPlugins : [CustomUploadAdapterPlugin] ,
        // }

    // Props

    let inputHandler = props.inputHandler
    let statementHandler = props.statementHandler
    let formHandler = props.formHandler
    let tagSelectHandler = props.tagSelectHandler
    let radioInputHandler = props.radioInputHandler

    let post = props.post
    let tags = props.tags

    // Editor initiate

    const editorRef = useRef(null);
    const log = (e) => {
        if (editorRef.current) {
            let data = editorRef.current.getContent()
            console.log(data);
            statementHandler(e , data )
        }
    };

    // selctors initiate

    let tagSelectorValues = []
    if( post.tags !== null ){
        post.tags.map(tag => {
            if(tag.name){
                // console.log('0') 
                return tagSelectorValues.push({value : `${tag.id}` , label : `${tag.name}`})
            } else {
                // console.log('1')
                return tagSelectorValues.push({value : `${tag.value}` , label : `${tag.label}`})
            }
            
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


    // console.log(tags)


    return (
    <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
        <div aria-multiselectable='true' className='form-row-1'>
            <label>عنوان پست  :
                <input type='text' className='dark:text-gray-800' value={post.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
        </div>
        
        <div aria-multiselectable='true' className='form-row-1'>
                <span className='label_radio_title' >زبان پست  :</span>
                <div className='label_radio_container' >
                    <label className='label_radio' >
                        <span className='w-fit' >فارسی</span>
                        <input type='radio' value='fa' checked={post.language === 'fa' ? true : false }  onChange={radioInputHandler} name='language' />
                    </label>
                    <label className='label_radio'  >
                        <span>انگلیسی</span>
                        <input type='radio' value='en' checked={post.language === 'en' ? true : false }  onChange={radioInputHandler} name='language' />
                    </label>
                </div>
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
                initialValue={post.statement}
            />  
        </div>

        {/* <div className='form-row-1 textArea-div'>
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
                initialValue={post.statement}
            />  
        </div> */}

        {/* <div className='form-row-1 textArea-div'>
        <CKEditor
                editor={ClassicEditor}
                config={config}
                data={post.statement}
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onChange={ ( event, editor ) => {
                    const data = editor.getData();
                    console.log( { event, editor, data } );
                    statementHandler(event , data)

                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
            />
                
                {/* <textarea className='textArea' type='text' value={ post.statement}  onChange={inputHandler} name='statement' placeholder='توضیح  را در اینجا وارد کنید ...'/> */}
            
        {/* </div> */} 

        <div aria-multiselectable='true' className='form-row-1'>
            <label>تگ های پست :
                <Select className='categorySelector dark:text-gray-800' value={tagSelectorValues} isMulti={true} options={tagsOptions} onChange={tagSelectHandler}/>
            </label>
        </div>

        <button type='submit' className='button' >{ props.editMode ? 'ویرایش پست' : 'افزودن پست جدید '}</button>
    </form>
    )
}

export default FormPost;