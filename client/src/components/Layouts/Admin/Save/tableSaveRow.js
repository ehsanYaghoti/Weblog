import React , { useContext } from 'react';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableSaveRow(props){

    // contexts
    const tableContext =  useContext(TableContext);
    let deleteHandler = tableContext.deleteHandler
    
    // props
    let save = props.save

    save.belongsTo = {
        kind : '',
        _id : '',
        title : '',
        slug : '',
        saveCount : 0
    }

    if(save.article !== null){
        save.belongsTo ={
            kind : 'article',
            _id : save.article._id,
            title : save.article.title,
            slug : save.article.slug,
            saveCount : save.article.saveCount
        }
    } else if(save.podcast !== null){
        save.belongsTo ={
            kind : 'podcast',
            _id : save.podcast._id,
            title : save.podcast.title,
            slug : save.podcast.slug,
            saveCount : save.podcast.saveCount
        }
    } else if(save.post !== null){
        save.belongsTo ={
            kind : 'post',
            _id : save.post._id,
            title : save.post.title,
            slug : save.post.slug,
            saveCount : save.post.saveCount
        }
    }


    return (
        <tr>
            <td>{save.user.username }</td>

            <td>{save.belongsTo.kind }</td>
            <td>
                <a href={`http://localhost:3000/${save.belongsTo.kind}s/${save.belongsTo.slug}`}>
                    {save.belongsTo.title }
                </a>    
            </td>
            <td>{save.belongsTo.saveCount }</td>



            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <div className='flex items-center gap-1 hover:opacity-80 focus:text-gray-500 ' onClick={(e , cc) => deleteHandler(e , save._id ) }>
                            <FontAwesomeIcon icon='trash-alt'  />
                            <span className='h-fit' >حذف</span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableSaveRow;