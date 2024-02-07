import React , { useContext } from 'react';

//import Components 
import Number from './number';

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'

//import Styles
import 'src/Styles/sass/pagination.scss';

//import Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faAngleRight , faAngleLeft  } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleRight , faAngleLeft )

function Pagination(props){

    const paginationContext = useContext(PaginationContext);

    let pagination = paginationContext.pagination
    let inputHandler = paginationContext.inputHandler
    
    function persianNumbers(numbers){
        let number = ''
        number = String(numbers)


        for (var i = 0; i < number.length; i++) {
    
            switch (number[i]) {
                case '1':
                    return  '۱'
                case '2':
                    return '۲'
                case '3':
                    return '۳'
                case '4':
                    return '۴'
                case '5':
                    return '۵'
                case '6':
                    return '۶'
                case '7':
                    return '۷'
                case '8':
                    return '۸'
                case '9':
                    return '۹'              
                default :
                    return '۰'
            }
        }

    }


    let numbers = []
    for(var i= 1 ; i <= pagination.totalPages ; i++){
        numbers.push(<Number key={i} number={i} page={pagination.page} persianNumber={persianNumbers(i)}  />)
    }



    let nextPage = pagination.page + 1
    let prevPage = pagination.page - 1 

    return (
    <div className='table-manager'>
        <div className='pagination'>
            <ul> 
                { pagination.hasPrevPage  ? 
                    (
                    <li className={pagination.hasPrevPage ? 'previous-page active' : 'previous-page'}>
                        <input className='toggle-page' type='button' name='page' value={prevPage} onClick={inputHandler} />
                        <FontAwesomeIcon icon='angle-left' className='icon' />
                        
                    </li>
                    )
                    :   <span></span>
                }
                {   
                    numbers  
                }
                {  
                pagination.hasNextPage  
                ?   (
                <li className={pagination.hasNextPage ? 'next-page active' : 'next-page'} >
                    <input className='toggle-page' type='button' name='page' value={nextPage} onClick={inputHandler} />
                    <FontAwesomeIcon icon='angle-right' className='icon'/>
                    
                </li>
                )
                :   <span></span>
                }
            </ul>
        </div>
        <div className='limit-row'>
            <span className='dark:text-gray-50' >نشان بده :</span>
            <select 
                value={pagination.limit}
                onChange={inputHandler}
                name='limit'
                >
                <option value=''>انتخاب کنید</option>

                {/* <option value={`${pagination.limit}`}>{pagination.limit} ردیف</option> */}
                <option value={`${Math.floor(pagination.totalDocs / 3)}`}>{Math.floor(pagination.totalDocs / 3)} ردیف</option>
                <option value={`${Math.floor(pagination.totalDocs / 2)}`}>{Math.floor(pagination.totalDocs / 2)} ردیف</option>
                <option value={`${pagination.totalDocs}`}>{pagination.totalDocs} ردیف</option>
            </select>
        </div>
    </ div>
    )
};

export default Pagination;