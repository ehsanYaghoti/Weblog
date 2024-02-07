function ArticleReducer(state , action) {
    console.log(state , action);
    switch (action.type) {
        case 'input-handler':
            
            break;
    
        default:
            break;
    }
}

export default UsersReducer;

let deleteHandler = (e , bb) =>{
        
    NodejsApi.delete(`/admin/user/${bb}`)
    .then(response => { 
            setUsersState(prevState => {
            return [
                ...prevState.filter(item => item._id !== bb)
            ]
        })  
    })
    .catch(err => console.log(err))
}

let inputHandler = (e) => {
    e.preventDefault();
    let name = e.target.name
    let value = e.target.value

    setUserState(prevState => {
        return {
            ...prevState,
            [name] : value
        }
    })

}

let sortHandler = (e) => {
    e.preventDefault();
    let name = e.target.name
    let value = e.target.value

    setQueries(prevState => {
        return {
            ...prevState,
            [name] : -value
        }
    })
}