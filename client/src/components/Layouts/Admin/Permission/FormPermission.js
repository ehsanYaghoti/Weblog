import React from 'react';

function FormPermission(props){
 
    let inputHandler = props.inputHandler
    let formHandler = props.formHandler
    let permission = props.permission
    let editMode = props.editMode

    return (
    <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
        <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
            <label>عنوان مجوز  :
                <input dir='ltr' type='text' className='dark:text-gray-800' value={permission.name}  onChange={inputHandler} name='name' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            </div>
        <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
            <label>برچسب مجوز  :
                <input dir='ltr' type='text' className='dark:text-gray-800' value={permission.label}  onChange={inputHandler} name='label' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
            </div>
        <button type='submit' className='button'>{ editMode ? 'ویرایش مجوز' : 'افزودن مجوز جدید '}</button>
    </form>
    )
}

export default FormPermission;