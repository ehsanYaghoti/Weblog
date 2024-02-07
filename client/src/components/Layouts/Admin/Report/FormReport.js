import React from 'react';

function FormReport(props){

    // Props

    let inputHandler = props.inputHandler
    let formHandler = props.formHandler

    let report = props.report



    return (
    <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100'>
        <div aria-multiselectable='true' className='form-row-1'>
            <label>عنوان گزارش  :
                <input type='text' className='dark:text-gray-800' value={report.title}  onChange={inputHandler} name='title' placeholder='نام  را در اینجا وارد کنید ...'/>
            </label>
        </div>

        <button type='submit' className='button' >{ props.editMode ? 'ویرایش گزارش' : 'افزودن گزارش جدید '}</button>
    </form>
    )
}

export default FormReport;