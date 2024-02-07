import React from 'react';

const paginationContext = React.createContext({
    pagination : {} ,
    inputHandler : () => {},
    paginationHandler : () => {},
})

export default paginationContext;