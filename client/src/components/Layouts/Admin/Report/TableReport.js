import  React , { useContext }  from  'react';

//import Contexts
// import  QueryContext from 'src/Contexts/queryContext';
import  TableContext from 'src/Contexts/tableContext';


//import Components
import TablePostRow from  './tableReportRow';

//import icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSortAmountDown , faPlus , faTable  , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync} from "@fortawesome/free-solid-svg-icons";
library.add(faSortAmountDown , faPlus , faTable , faEllipsisV , faUserCircle , faSort , faCaretUp , faTrashAlt , faSync)

function TablReport(props){

    // const queryContext =  useContext(QueryContext);
    const tableContext =  useContext(TableContext);

    let reports = tableContext.reports
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
                        سازنده
                    </th>
                    <th className='head-center clicked' > 
                        تعداد گزارش پست
                    </th>
                    <th className='head-center clicked' > 
                        تعداد گزارش پاسخ
                    </th>
                    <th className='head-center clicked' > 
                        توسط کاربران
                    </th>
                    <th className='head-center clicked' > 
                        نویسنده گزارش شده
                    </th>
                                
                    <th className='head-center clicked'><FontAwesomeIcon icon='table' /></th>
                </tr>
            </thead>
            <tbody className='table-body'>
            {
                    reports.length === '0'  
                    ? <span>There is no Information</span> 
                    : reports.map(report => {
                        return (
                            <TablePostRow key={report._id}  report={report} />
                        )
                    })
                }   
            </tbody>
        </table>
    </div>
    )
};

export default TablReport;