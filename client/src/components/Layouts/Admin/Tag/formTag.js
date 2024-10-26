


const FormTag =  (props) => {

    let formHandler = props.formHandler
    let inputHandler = props.inputHandler
    let tag = props.tag
    let editMode = props.editMode

    return (
        <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100 '>
            <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
            <label className='w-full flex flex-col  md:flex-row md:items-center  !items-start ' >
                <span>نام تگ :</span>
                <input type='text' className='dark:text-gray-800' value={tag.name}  onChange={inputHandler} name='name' placeholder='نام تگ را در اینجا وارد کنید ...'/>
            </label>
            </div>
            <div aria-multiselectable='true' className='form-row-1 md:!flex-col xl:!flex-row'>
            <label className='w-full flex flex-col md:flex-row md:items-center  !items-start ' >
                <span>توضیح تگ :</span>
                <input type='text' className='dark:text-gray-800' value={tag.explain}  onChange={inputHandler} name='explain' placeholder='توضیح تگ را در اینجا وارد کنید ...'/>
            </label>
            </div>
            <button type='submit' className='button'>{editMode ? 'ویرایش تگ' : 'ایجاد تگ'}</button>
        </form>
    )
    
}
export default FormTag;