import  React , { useContext }  from  'react';

//import Contexts
// import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TablePostRow from  './tablePostRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TableCategory(props){

    // const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);

    let posts = tableContext.posts
    // let queries = queryContext.queries
    // let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    <th className='head-center clicked' > 
                        عنوان 
                    </th>
                    <th className='head-center clicked' > 
                        نویسنده 
                    </th>
                    <th className='head-center clicked' > 
                        تعداد کامنت
                    </th>
                    <th className='head-center clicked' > 
                        تعداد ویزیت
                    </th>
                    <th className='head-center clicked' > 
                        تعداد ذخیره
                    </th>
                    <th className='head-center clicked' > 
                        تگ ها
                    </th>
                    <th className='head-center clicked' > 
                        وضعیت   
                    </th>
                    <th className='head-center clicked' > 
                        تعداد گزارش ها
                    </th>
                    <th className='clicked' > 
                    گزارش ها   
                    </th>     
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
            {
                    posts.length === '0'  
                    ? <span>There is no Information</span> 
                    : posts.map(post => {
                        return (
                            <TablePostRow key={post._id}  post={post} />
                        )
                    })
                }   
            </tbody>
        </table>
    </div>
    )
};

export default TableCategory;