import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablePostRow(props){

    const tableContext =  useContext(TableContext);
    let report = props.report

    let deleteHandler = tableContext.deleteHandler

    let userNames = []
    if(report.users !==  null &&  report.users !==  undefined){
        report.users.forEach(user => {
            return userNames.push(user.username)
        })
    }

    let authorNames = []
    if(report.authors !==  null &&  report.authors !==  undefined){
        report.authors.forEach(author => {
            return authorNames.push(author.username)
        })
    }

    return (
        <tr className='min-w-full' >
            <td>{report.title }</td>
            <td>{report.user.username }</td>
            <td>{report.posts.length !== null ? report.posts.length :  0}</td> 
            <td>{report.answers.length !== null ? report.answers.length : 0 }</td>

            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{userNames.map(username => {
                return <div key={username} style={{margin : '5px 0'}}><span key={username} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{username}</span></div>
            })}</td>

            <td>
                {authorNames.map(name => {
                    return <span>{name}</span>
                })}
            </td>
            


            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , report._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/report/edit/${report._id}`
                        }}>
                            <FontAwesomeIcon icon='sync' /><span>ویرایش</span>
                        </Link>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TablePostRow;