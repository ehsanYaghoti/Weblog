import React from 'react';

const authenticatedUserContext = React.createContext({
    isAuthenticated : false,
    user : {}
})

export default authenticatedUserContext;