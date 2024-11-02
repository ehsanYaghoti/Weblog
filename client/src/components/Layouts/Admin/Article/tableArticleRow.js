import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

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
    let article = props.article

    let categoriesNames = []
    article.categories.forEach(category => {
        return categoriesNames.push(category.name)
    })

    let tagsNames = []
    article.tags.forEach(tag => {
        return tagsNames.push(tag.name)
    })

    // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr>
            <td>{article.title }</td>
            <td>{article.author.username }</td>

            <td>{article.commentCount }</td>
            <td>{article.viewCount }</td>
            <td>{article.likeCount }</td>
            <td>{article.saveCount }</td>          
            <td>{categoriesNames.map(category => {
                return <span key={category} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{category}</span>
            })}</td>
            <td>{tagsNames.map(tag => {
                return <span key={tag} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{tag}</span>
            })}</td>


            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , article._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/articles/edit/${article._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableArticleRow;