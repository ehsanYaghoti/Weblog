import React , { useContext } from 'react';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCommentRow(props){

    const tableContext =  useContext(TableContext);
    

    let comment = props.comment
    let deleteHandler = tableContext.deleteHandler
    let approveHandler = tableContext.approveHandler

    comment.belongsTo = {
        _id : '',
        title : '',
        slug : '',
    }

    if(comment.article !== null){
        comment.belongsTo ={
            _id : comment.article._id,
            title : comment.article.title,
            slug : comment.article.slug,
        }
    } else if(comment.podcast !== null){
        comment.belongsTo ={
            _id : comment.podcast._id,
            title : comment.podcast.title,
            slug : comment.podcast.slug,
        }
    }


    // let categoriesNames = []
    // book.categories.forEach(category => {
    //     return categoriesNames.push(category.name)
    // })
    // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr>
            <td>{comment.user.username }</td>
            <td>{comment.article !== null ? 'مقاله' :'پادکست'  }</td>
            <td>
                {
                    comment.article !== null ?
                    <a href={`http://localhost:3000/articles/${comment.belongsTo.slug}`}>
                        {comment.belongsTo.title }
                    </a> 
                    :
                    <a href={`http://localhost:3000/podcasts/${comment.belongsTo.slug}`}>
                        {comment.belongsTo.title }
                    </a> 
                }
                
            </td>
            <td>{comment.statement }</td>
            <td>{comment.parent === null ? 'اصلی' : comment.parent.user.username }</td>
            <td>{comment.comments.length }</td>
            <td>{comment.approved ? 'تائید شده' : 'تائید نشده'}</td>
            

            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , comment._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <FontAwesomeIcon icon='sync' onClick={(e , cc) => approveHandler(e , comment._id ) }/><span>{comment.approved ? 'تائید کردن' : 'تائید نکردن'}</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableCommentRow;