import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableArticleRow(props){

    const tableContext =  useContext(TableContext);

    let permission = props.permission
    let deleteHandler = tableContext.deleteHandler

    // let categoriesNames = []
    // article.categories.forEach(category => {
    //     return categoriesNames.push(category.name)
    // })
    // // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr>
            <td>{permission.name }</td>
            <td>{permission.label}</td>

            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , permission._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/permissions/edit/${permission._id}`
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