import React , { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import QueryContext from 'src/Contexts/queryContext'
import TableContext from 'src/Contexts/tableContext'

//Components
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import Pagination from 'src/components/Layouts/Admin/pagination';
import FilterPermissionRow from 'src/components/Layouts/Admin/Permission/filterPermissionRow';
import TablePermission from 'src/components/Layouts/Admin/Permission/TablePermission';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

//import Styles
import  Spinner  from 'react-bootstrap/Spinner';
import isAdmin from 'src/Logics/isAdmin';

function Permissions(props) {
    const navigate = useNavigate()

    const [authenticatedUser , setAuthenticatedUser ] = useState({
        isAuthenticated : false,
        user : {
            roles : []
        }
    })

    const [ permissions , setPermissions ] = useState([])
    const [ queries , setQueries ] = useState({
        name : '',
        limit : '',
        page : '',
        sortPermissionName : 1,
    })
    const [ pagination , setPagination ] = useState({
        page : 0 ,
        hasNextPage : false ,
        hasPrevPage : false ,
        limit : 10 ,
        nextPage : null ,
        prevPage : null ,
        totalDocs : 0,
        totalPages : 0
    })
      
    const [ loading , setLoading ] = useState(false)
    const [success , setSuccess] = useState({ state : true ,  message : ''})


    useEffect(() => {
        setLoading(true)

        let queryString = Object.keys(queries).map(key => key + '=' + queries[key]).join('&');
        
        NodejsApi.get(`/admin/permissions?${queryString}`)
        .then(response => {
            if(! response.data.success){
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.data
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })


            let data = response.data.data
            let permissions = data.docs
            setPermissions(permissions);
            setPagination({
                page : data.page ,
                hasNextPage : data.hasNextPage ,
                hasPrevPage : data.hasPrevPage ,
                limit : data.limit ,
                nextPage : data.nextPage ,
                prevPage : data.prevPage ,
                totalDocs : data.totalDocs,
                totalPages : data.totalPages
            })
        } )
        .catch(err => console.log(err))
        setLoading(false)
    } , [queries])
    
    useEffect(() => {

        setAuthenticatedUser({
            isAuthenticated : true,
            user : props?.user
        })
        setLoading(true)
        NodejsApi.get(`/admin/permissions` )
        .then(response => {
            if(! response.data.success){
                console.log(response.data)
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    message : response.data.data
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                message : ''
                }
            })



            console.log(response.data)
            let data = response.data.data
            let permissions = data.docs

            setPermissions(permissions);
            setPagination({
                page : data.page ,
                hasNextPage : data.hasNextPage ,
                hasPrevPage : data.hasPrevPage ,
                limit : data.limit ,
                nextPage : data.nextPage ,
                prevPage : data.prevPage ,
                totalDocs : data.totalDocs,
                totalPages : data.totalPages
            })

            setLoading(false);
        } )
        .catch(err => {
            setLoading(false)
            console.log(err)

            if(err.response.status === 403){
                navigate('/admin')

                setSuccess(prevState => {
                    return {
                        state : err.response.data.success ,
                        message : err.response.data.message
                    }
                })
            }
            return setSuccess(prevState => {
                return {
                    state : false ,
                    message : err.message
                }
            })
        })

    } , [navigate , props.user])

    let deleteHandler = (e , id) =>{
        
        NodejsApi.delete(`/admin/permissions/${id}`)
        .then(response => { 
                setPermissions(prevState => {
                return [
                    ...prevState.filter(item => item._id !== id)
                ]
            })  
        })
        .catch(err => console.log(err))
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setQueries(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

    }

    let sortHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setQueries(prevState => {
            return {
                ...prevState,
                [name] : -value
            }
        })
    }

    return (
        <div className='home-dashboard'>
            <Navbar  user={authenticatedUser}  />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title text-gray-50'>مدیریت مجوز ها</h2>
                <QueryContext.Provider value={{  queries , inputHandler }}>
                    <FilterPermissionRow  />
                {
                    loading 
                    ? <div  style={{ textAlign : 'center'}}>                       
                        <Spinner animation="grow"  />
                    </div>  
                    : 
                    (
                        ! success.state
                        ? <span className='bg-slate-950 text-slate-50 py-6 px-4 w-fit rounded-md self-center'  style={{ textAlign : 'center'}}>{success.message  || 'مشکلی رخ داده'}</span>
                        :
                        <>
                        <TableContext.Provider value={{ permissions  , deleteHandler , sortHandler }}>
                            <TablePermission />
                        </TableContext.Provider>
                        <PaginationContext.Provider value={{ pagination  , inputHandler }}>
                            <Pagination  />
                        </PaginationContext.Provider>
                        </>
                    )
                }
                </QueryContext.Provider>
            </div>
        </div>
    )

}

export default isAdmin( Permissions);