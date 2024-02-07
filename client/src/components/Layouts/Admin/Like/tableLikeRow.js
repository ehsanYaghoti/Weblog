import React , { useContext } from 'react';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableArticleRow(props){

    // contexts
    const tableContext =  useContext(TableContext);
    let deleteHandler = tableContext.deleteHandler
    
    // props
    let like = props.like

    like.belongsTo = {
        kind : '',
        _id : '',
        title : '',
        slug : '',
        statement : ''
    }

    if(like.article !== null){
        like.belongsTo ={
            kind : 'article',
            _id : like.article._id,
            title : like.article.title,
            slug : like.article.slug,
        }
    } else if(like.podcast !== null){
        like.belongsTo ={
            kind : 'podcast',
            _id : like.podcast._id,
            title : like.podcast.title,
            slug : like.podcast.slug,
        }
    } else if(like.comment !== null){
        like.belongsTo ={
            kind : 'comment',
            _id : like.comment._id,
            title : like.comment.media.title,
            statement : like.comment.statement,
            slug : like.comment.media.slug,
            mediaModel : like.comment.mediaModel
        }
    }


    return (
        <tr>
            <td>{like.user.username }</td>

            <td>{like.belongsTo.kind }</td>

            <td>
                {
                    like.belongsTo.kind === 'comment' ?
                    <a href={`http://localhost:3000/${like.belongsTo.mediaModel}s/${like.belongsTo.slug}`}>
                        {like.belongsTo.title }
                    </a>  
                    :
                    <a href={`http://localhost:3000/${like.belongsTo.kind}s/${like.belongsTo.slug}`}>
                        {like.belongsTo.title }
                    </a>    
                }
                
            </td>



            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , like._id ) }/><span >حذف</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableArticleRow;