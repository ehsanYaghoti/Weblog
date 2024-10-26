export const inputHandler = (e , setState) => {
    e.preventDefault();
    let name = e.target.name
    let value = e.target.value

    setState(prevState => {
        return {
            ...prevState,
            [name] : value
        }
    })
    
}

export let radioInputHandler = (e , setState) => {
    let name = e.target.name
    let value = e.target.value

    setState(prevState => {
        return {
            ...prevState,
            [name] : value
        }
    })
    
}

export let tagSelectHandler = (selectedOption , setState ) => {
    const values = []
    selectedOption.map(option => {
        return values.push(option.value)
    })

    
    setState(prevState => {
        return {
            ...prevState,
            tags : selectedOption
        }
    })

}

export let statementHandler = (e , data , setState) => {

    setState(prevState => {
        return {
            ...prevState,
            statement : data
        }
    })
    
}