import React , { useContext } from 'react';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableAnswerRow(props){

    const tableContext =  useContext(TableContext);
    

    let answer = props.answer
    let deleteHandler = tableContext.deleteHandler
    let approveHandler = tableContext.approveHandler


    let reportsNames = []
    answer.reports.forEach(report => {
        return reportsNames.push(report.title)
    })
    console.log(answer.post)

    // console.log(user)
    return (
        <tr>
            <td>{answer.user.username }</td>
            <td>{answer.statement }</td>
            <td>
                <a href={`http://localhost:3000/posts/${answer?.post?.slug}`}>
                    {answer?.post?.title }
                </a>
            </td>
            <td>{answer.answers.length }</td>
            <td>{answer.reported ? 'گزارش شده' : 'گزارش نشده'}</td>
            <td>{reportsNames.map(report => {
                return <span key={report} style={{margin : '0px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , color : 'white'}}>{report}</span>
            })}</td>

            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , answer._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <FontAwesomeIcon icon='sync' onClick={(e , cc) => approveHandler(e , answer._id ) }/><span>{answer.approved ? 'تائید کردن' : 'تائید نکردن'}</span>
                    </div>
                </div>
            </td>
        </tr>
    )
}

export default TableAnswerRow;