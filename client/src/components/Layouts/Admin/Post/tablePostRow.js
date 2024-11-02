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
    let post = props.post
    let deleteHandler = tableContext.deleteHandler

    let tagsNames = []
    if(post.tags !==  null){
        post.tags.forEach(tag => {
            return tagsNames.push(tag.name)
        })
    }

    let reportsNames = []
    post.reports.forEach(report => {
        return reportsNames.push(report.title)
    })


    return (
        <tr >
            <td>
                <a href={`http://localhost:3000/posts/${post.slug}`}>
                    {post.title }
                </a>
            </td>
            <td>{post.user.username }</td>
            <td>{post.answerCount }</td>
            <td>{post.viewCount }</td>
            <td>{post.saveCount }</td>

            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{tagsNames.map(tag => {
                return <div key={tag} style={{margin : '5px 0'}}><span key={tag} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{tag}</span></div>
            })}</td>
            <td>{post.reported ? 'گزارش شده' : 'گزارش نشده'}</td>
            <td>{post.reports.length}</td>
            <td style={{display : 'flex' , flexWrap : 'wrap'  , height : 'fit-content'}}>{reportsNames.map(report => {
                return <div key={report} style={{margin : '5px 0'}}><span key={report} style={{margin : '5px 3px' , padding : '0px 3px' , borderRadius : '3px' 
                 , backgroundColor : '#8ec0e6' , whiteSpace : 'nowrap' , color : 'white'}}>{report}</span></div>
            })}</td>
            {/* <td  className='w-[600px]' >
                {reportsNames.map((report) => {
                    return <span key={report._id} className='flex flex-row whitespace-nowrap items-start text-sm w-fit h-fit px-3 py-1 my-2 bg-blue-gray-500 rounded-md text-white' >{report}</span>
                })}
            </td> */}




            <td className='edit-div'>
                <FontAwesomeIcon icon='ellipsis-v' className='edit-icon' tabIndex='1'/>
                <div className='edit-piece'>
                    <div className='edit-i'  >
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , post._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/posts/edit/${post._id}`
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