import React from 'react';

const queryContext = React.createContext({
    queries : {} ,
    inputHandler : () => {}
})

export default queryContext;