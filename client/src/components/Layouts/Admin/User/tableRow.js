import React , { useContext } from 'react';
import moment from 'jalali-moment';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync , faUser} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync , faUser)

function TableRow(props){

    const tableContext =  useContext(TableContext);
    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext

    let user = props.user
    let deleteHandler = tableContext.deleteHandler
    let setAdminHandler = tableContext.setAdminHandler

    let rolesNames = []
    user.roles.forEach(role => {
        return rolesNames.push(role.label)
    })
    
    // console.log(user)
    return (
        <tr>
            <td> 
                <div className='user-info'>
                    {
                        user.avatar === null 
                        ?
                        
                        <FontAwesomeIcon icon='user-circle'  style={{margin:'0 20px' , height:'30px' , width:'30px'}} />
                        :
                        <div className='avatar'>
                            <img src={`http://localhost:5000/${user.avatarpath}`} alt={user.username} className='object-cover' />

                            {/* <img src={`localhost:5000/${user.avatarpath}`}   />  */}
                        </div>
                    }

                    {user.username }
                </div>
            </td>
            <td >
                <div className='table-cell'>
                    {user.email}
                </div>
            </td>
            <td className='premission'>
                <div className={user.admin ? 'admin' : 'viewer'}>
                    {user.admin ? 'admin' : 'viewer'}
                </div>  
            </td>
            <td>{rolesNames.map(role => {
                return <span key={role} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{role}</span>
            })}</td>
            <td >
                <div className='table-cell'>
                    {moment(user.createdAt , 'YYYY/MM/DD').locale('fa').format('YYYY/MM/DD')}
                </div>
            </td>
            <td className='edit-div'>
                <div className='table-cell'>
                    <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                    <div className='edit-piece'>
                        <div className='edit-i'  >
                            <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , user._id ) }/><span >حذف</span>
                        </div>
                        <div className='edit-i' >
                            <Link to={{
                                pathname : `/admin/users/edit/${user._id}`
                                , state : authenticatedUser
                            }}>
                                <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                            </Link>
                        </div>
                        <div className='edit-i' onClick={e => setAdminHandler(e, user._id)}  >
                            <FontAwesomeIcon icon={faUser} /><span>ادمین</span>
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableRow;