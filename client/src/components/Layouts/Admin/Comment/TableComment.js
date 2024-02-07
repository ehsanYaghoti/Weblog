import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableCmmentRow from  './tableCommentRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableComment(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let comments = tableContext.comments
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked' > 
                        نام کاربر  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortBookName' value={queries.sortBookName} onClick={sortHandler} />                        
                    </th>
                    <th className='clicked' > 
                    درمورد   
                    </th>
                    <th className='clicked' > 
                    عنوان مربوطه   
                    </th>
                    <th className='clicked' > 
                        کامنت  
                    </th>
                    <th className='clicked' > 
                    در پاسخ به   
                    </th>
                    <th className='clicked' > 
                    تعداد پاسخ ها   
                    </th>
                    <th className='clicked' > 
                    وضعیت   
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    comments.length === '0'  
                    ? <span>There is no Information</span> 
                    : comments.map(comment => {
                        return (
                            <TableCmmentRow key={comment._id}  comment={comment} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableComment;