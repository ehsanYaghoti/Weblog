import React from 'react';

const queryContext = React.createContext({
    sortQueries : {},
    queries : {} ,
    inputHandler : () => {}
})

export default queryContext;