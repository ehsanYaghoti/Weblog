import React from 'react';
import Select from 'react-select'

function FormUser(props){

    let inputHandler = props.inputHandler
    let formHandler = props.formHandler
    let roleSelectHandler = props.roleSelectHandler
    let roles = props.roles
    let userState = props.userState

    
    

    // let permissions = props.permissions

    // const options = []
    // permissions.map(permission => {
    //     // console.log(permission)
    //     return (
    //         options.push({value : `${permission._id}` , label : `${permission.label}`})
    //     )
    // })

    let roleSelectorValues = []
    if( userState.roles !== null && userState.roles !== undefined ){
        userState.roles.map(role => {
            if(role.name){
                // console.log('0') 
                return roleSelectorValues.push({value : `${role._id}` , label : `${role.name}`})
            } else {
                // console.log('1')
                return roleSelectorValues.push({value : `${role.value}` , label : `${role.label}`})
            }
            
        })
    }

    const rolesOptions = []
    if( roles !== null){ 
        roles.map(role => {
            // console.log(role)
            return (
                rolesOptions.push({value : `${role._id}` , label : `${role.label}`})
            )
        })
    } 


    console.log(roleSelectorValues)
    console.log(rolesOptions) 

    return (
        <form onSubmit={formHandler} className='formContainer dark:!bg-slate-600/80  dark:!text-gray-100 !flex !items-center !gap-8'>
            <label  className='!flex !flex-col !items-start !gap-3' >نام کاربری :
                <input type='text' disabled className='dark:text-gray-800 !w-full !mr-0' value={userState.username} onChange={inputHandler} name='username' placeholder='نام کاربری را در اینجا وارد کنید ...'/>
            </label>
            <label  className='!flex !flex-col !items-start !gap-3'>ایمیل :
                <input type='text' disabled className='dark:text-gray-800 !w-full !mr-0' value={userState.email} onChange={inputHandler} name='email' placeholder='ایمیل  را در اینجا وارد کنید ...'/>
            </label>
            {
                userState.admin ? 
                    <label className='!flex !flex-col !items-start !gap-3'  >
                        <span>نقش های کاربر :</span>
                        <Select  className='categorySelector dark:text-gray-800 !w-full !mr-0' value={roleSelectorValues} isMulti={true} options={rolesOptions} onChange={roleSelectHandler}/>
                    </label>
                :''
            }
            <button type='submit'  className='button'>ویرایش کاربر</button>
        </form>
    )
}

export default FormUser;