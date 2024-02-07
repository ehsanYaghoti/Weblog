import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableAnswerRow from  './tableAnswerRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableAnswer(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let answers = tableContext.answers
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
                        متن پاسخ 
                    </th>
                    <th className='clicked' > 
                        پست مربوطه  
                    </th>
                    <th className='clicked' > 
                        تعداد پاسخ  
                    </th>
                    <th className='clicked' > 
                    وضعیت   
                    </th>
                    <th className='clicked' > 
                    گزارش ها   
                    </th>       
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    answers.length === '0'  
                    ? <span>There is no Information</span> 
                    : answers.map(answer => {
                        return (
                            <TableAnswerRow key={answer._id}  answer={answer} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableAnswer;