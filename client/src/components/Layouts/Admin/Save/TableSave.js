import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableSaveRow from  './tableSaveRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableSave(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let Saves = tableContext.saves
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked' > 
                        توسط کاربر 
                        <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortArticleName' value={queries.sortArticleName} onClick={sortHandler} />                        
                    </th>
                    <th className='head-center clicked' > 
                        نوع مدیا مربوطه
                    </th>                   
                    <th className='head-center clicked' > 
                        عنوان مدیا مربوطه
                    </th>   
                    <th className='head-center clicked' > 
                        تعداد ذخیره
                    </th>   
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    Saves.length === '0'  
                    ? <span>There is no Information</span> 
                    : Saves.map(save => {
                        return (
                            <TableSaveRow key={save._id}  save={save} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableSave;