import React from 'react';

function FormCategory(props){

    // Props

    let inputHandler = props.inputHandler
    let category = props.category
    let prevParents = props.prevParents
    let formHandler = props.formHandler



    return (
        <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100 w-full '>
            <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                <span>نام دسته :</span>
                <input type='text' className='dark:text-gray-800' value={category.name}  onChange={inputHandler} name='name' placeholder='نام دسته را در اینجا وارد کنید ...'/>
            </label>
            <label className='w-full flex flex-col md:flex-row md:items-center  items-start ' >
                <span>دسته والد :</span>
                <select  className='selector dark:text-gray-800' value={category.parent} onChange={inputHandler} name='parent'>
                    <option value='none' defaultValue>دسته اصلی</option>
                    {
                        prevParents.map(parent => {
                            // console.log(parent)
                            return (
                                <option key={`${parent._id}`} value={`${parent._id}`}>{parent.name}</option>
                            )
                        })
                    }
                </select>
            </label>
            <button type='submit' className='button'>ویرایش دسته</button>
        </form>
    )
}

export default FormCategory;