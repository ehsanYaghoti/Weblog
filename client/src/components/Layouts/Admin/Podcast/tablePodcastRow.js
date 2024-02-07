import React , { useContext } from 'react';
import { Link  } from 'react-router-dom';

//import Contexts
import  TableContext from 'src/Contexts/tableContext';
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';


import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablePodcastRow(props){

    // contexts
    const tableContext =  useContext(TableContext);
    let deleteHandler = tableContext.deleteHandler
    const UserContext =  useContext(AuthenticatedUserContext);
    
    let authenticatedUser = UserContext
    
    // props
    let podcast = props.podcast

    let categoriesNames = []
    podcast.categories.forEach(category => {
        return categoriesNames.push(category.name)
    })

    let tagsNames = []
    podcast.tags.forEach(tag => {
        return tagsNames.push(tag.name)
    })

    // console.log(categoriesNames)

    console.log(podcast)
    return (
        <tr>
            <td>{podcast.title }</td>
            <td>{podcast.user.username }</td>
            <td>{podcast.commentCount }</td>
            <td>{podcast.viewCount }</td>
            <td>{podcast.likeCount }</td>
            <td>{podcast.saveCount }</td>          
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
                        <FontAwesomeIcon icon='trash-alt'  onClick={(e , cc) => deleteHandler(e , podcast._id ) }/><span >حذف</span>
                    </div>
                    <div className='edit-i' >
                        <Link to={{
                            pathname : `/admin/podcasts/edit/${podcast._id}`
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

export default TablePodcastRow;