import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TableTagRow from  './tableTagRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableTag(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let tags = tableContext.tags
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >

        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='clicked'  style={{textAlign : 'center' }} > 
                        نام تگ  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortCategoryName' value={queries.sortCategoryName} onClick={sortHandler} />                        
                    </th>
                    <th className='clicked'  style={{textAlign : 'center' }} > 
                        توضیح تگ 
                    </th>
                    <th className='head-center clicked' > 
                        تعداد مقاله
                    </th>
                    <th className='head-center clicked' > 
                        تعداد پادکست
                    </th>
                    <th className='head-center clicked' > 
                        تعداد پست
                    </th>
                    <th className='head-center clicked' > 
                        تعداد دنبال کننده
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    tags.length === '0'  
                    ? <span>There is no Information</span> 
                    : tags.map(tag => {
                        return (
                            <TableTagRow key={tag._id}  tag={tag} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TableTag;