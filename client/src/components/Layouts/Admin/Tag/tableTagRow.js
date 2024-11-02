import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategoryRow(props){

    const tableContext =  useContext(TableContext);

    let tag = props.tag
    let deleteHandler = tableContext.deleteHandler

    // console.log(user)
    return (
        <tr>
            <td>{tag.name}#</td>
            <td>{tag.explain}</td>
            <td>{tag.articles.length}</td>
            <td>{tag.podcasts.length}</td>
            <td>{tag.posts.length}</td>
            <td>{tag.followers.length}</td>



            <td className='edit-div'>
                
                    <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>                    
                    <div className='edit-piece'>
                        <div className='edit-i'  >
                            <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , tag._id ) }/><span >حذف</span>
                        </div>
                        <div className='edit-i' >
                            <Link to={{
                                pathname : `/admin/tags/edit/${tag._id}`
                            }}>
                                <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                            </Link>
                        </div>
                    </div>
               
            </td>
        </tr>
    )
}

export default TableCategoryRow;