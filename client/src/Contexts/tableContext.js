import React from 'react';

const tableContext = React.createContext({
    posts : [] ,
    articles : [] ,
    podcasts : [] ,
    categories : [] ,
    tags : [] ,
    answers : [],
    comments : [],
    users : [] ,
    likes : [] ,
    saves : [] ,
    sortHandler : () => {},
    deleteHandler : () => {},
    approveHandler : () => {},
    setAdminHandler : () => {}
})

export default tableContext;