import React from 'react';

function ButtonTag(props) {
    
    //props
    let tag = props.tag


    return (
        // ButtonTag
        <a className='bg-cyan-600 px-4 py-2 rounded-lg text-white shadow-md shadow-cyan-600 hover:opacity-80' href={`/tag/${tag.slug}`}>
           <span key={tag._id} >#{tag.name}</span>
        </a>
    )
}

export default ButtonTag;