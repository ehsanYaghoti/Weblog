import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategoryRow(props){

    const tableContext =  useContext(TableContext);
    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext
    
    let category = props.category
    let deleteHandler = tableContext.deleteHandler

    let childrensNames = []
    category.childrens.forEach(category => {
        return childrensNames.push(category.name)
    })

    // console.log(user)
    return (
        <tr>
            <td> {category.name }</td>
            <td>
                {category.parent === null ? 'دسته اصلی' : category.parent.name}
            </td>
            <td>{childrensNames.map(name => {
                return <span key={name} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{name}</span>
            })}</td>
            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>                    
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , category._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/categories/edit/${category._id}`
                            , state : authenticatedUser
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