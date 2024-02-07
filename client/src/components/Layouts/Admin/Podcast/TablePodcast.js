import  React , { useContext }  from  'react';

//import Contexts
import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TablePodcastRow from  './tablePodcastRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown  , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown  , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablePodcast(props){

    const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);
    
    let podcasts = tableContext.podcasts
    let queries = queryContext.queries
    let sortHandler = tableContext.sortHandler

    return (
    <div className='w-full overflow-x-auto p-6' >
        <table className='table'>            
            <thead className='table-head'>
                <tr className='table-row'>
                    
                    <th className='clicked' > 
                        عنوان پادکست  <FontAwesomeIcon icon='sort' />
                        <input className='toggle-page' type='button' name='sortPodcastName' value={queries.sortPodcastName} onClick={sortHandler} />                        
                    </th>
                    <th className='clicked' > 
                        نام نویسنده پادکست
                    </th>
                    <th className='head-center clicked' > 
                        تعداد کامنت
                    </th>
                    <th className='head-center clicked' > 
                        تعداد ویزیت
                    </th>
                    <th className='head-center clicked' > 
                        تعداد لایک
                    </th>
                    <th className='head-center clicked' > 
                        تعداد ذخیره
                    </th>
                    <th className='head-center clicked' > 
                        دسته بندی 
                    </th>
                    <th className='head-center clicked' > 
                        تگ ها
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>

                </tr>
            </thead>
            <tbody className='table-body'>
                {
                    podcasts.length === '0'  
                    ? <span>There is no Information</span> 
                    : podcasts.map(podcast => {
                        return (
                            <TablePodcastRow key={podcast._id}  podcast={podcast} />
                        )
                    })
                }                           
            </tbody>
        </table>
    </div>
    )
};

export default TablePodcast;