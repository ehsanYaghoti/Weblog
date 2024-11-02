import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableRoleRow(props){

    const tableContext =  useContext(TableContext);

    let role = props.role
    let deleteHandler = tableContext.deleteHandler

    let permissionsNames = []
    role.permissions.forEach(permission => {
        return permissionsNames.push(permission.label)
    })
    // console.log(categoriesNames)

    // console.log(user)
    return (
        <tr>
            <td>{role.name }</td>
            <td>{role.label }</td>
            <td style={{display : 'flex'}}>{permissionsNames.map(permission => {
                return <div><span key={permission} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{permission}</span></div>
            })}</td>


            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , role._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/roles/edit/${role._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableRoleRow;