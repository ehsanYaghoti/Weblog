import React , { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import PaginationContext from 'src/Contexts/paginationContext'
import QueryContext from 'src/Contexts/queryContext'
import TableContext from 'src/Contexts/tableContext'

//Components Layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import Pagination from 'src/components/Layouts/Admin/pagination';
import FilterRow from 'src/components/Layouts/Admin/User/filterRow';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';
import Table from 'src/components/Layouts/Admin/User/Table';

//import Styles
import  Spinner  from 'react-bootstrap/Spinner';
import GoTopBtn from 'src/components/Layouts/Home/General/GoTopBtn';
import isAdmin from 'src/Logics/isAdmin';

function Users(props) {
    const navigate = useNavigate()


    const [authenticatedUser , setAuthenticatedUser ] = useState({
        isAuthenticated : false,
        user : {
            roles : []
        }
    })

    const [ usersState , setUsersState ] = useState([])

    const [ sortQueries , setsortQueries ] = useState({
        sortCreatedAt : '',
        sortUsername : '',
        sortEmail : ''
    })
 
    const [ queries , setQueries ] = useState({
        search  : '',
        createdAt : '',
        premission : '',
        limit : '',
        page : '',
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
        
        NodejsApi(`/admin/user?${queryString}`)
        .then(response => {
            if(! response.data.success){
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
            let users = data.docs
            console.log(data)
            setUsersState(users);
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
        .catch(err => {
            console.log(err)
            setLoading(false)
            console.log('there is a problem')
            setSuccess({
                state : false,
                message : err.message
            })
        })
        setLoading(false)
    } , [queries])
    
    useEffect(() => {
        setLoading(true)
        NodejsApi.get(`/admin/user` )
        .then(response => {
            if(! response.data.success){
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
            let users = data.docs

            setAuthenticatedUser({
                isAuthenticated : response.data.isAuthenticated,
                user : response.data.authenticatedUser
            })

            setUsersState(users);
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

    } , [navigate])

    let deleteHandler = (e , bb) =>{
        setLoading(true)
        
        NodejsApi.delete(`/admin/user/${bb}`)
        .then(response => { 
                setLoading(false)
                setUsersState(prevState => {
                return [
                    ...prevState.filter(item => item._id !== bb)
                ]
            })  
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        })
    }

    let setAdminHandler = (e, userId) =>{
        setLoading(true)

        let data = {
            userId
        }

        NodejsApi.put(`/admin/user/admin` , data)
        .then(response => {
            if(! response.data.success){
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
            // let data = response.data.data
            // let users = data.docs

            // setUsersState(users);

            setLoading(false);
        } )
        .catch(err =>{ 
            setLoading(false)
            console.log(err)
            setSuccess(prevState => {
                return {
                    state : false ,
                    message : err.message
                }
             })
        })
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
        console.log(e.target)

        if(sortQueries[name] === 'asc'){            
            setsortQueries(prevState => {
                return {
                    ...prevState,
                    [name] : 'desc'
                }
            })


        } else if(sortQueries[name] === 'desc'){
            setsortQueries(prevState => {
                return {
                    ...prevState,
                    [name] : 'asc'
                }
            })
        } else {
            setsortQueries(prevState => {
                return {
                    ...prevState,
                    [name] : 'desc'
                }
            })
        }

        setLoading(true)
        NodejsApi(`/admin/user?${name}=${sortQueries[name]}`)
        .then(response => {
            if(! response.data.success){
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
            let users = data.docs
            setUsersState(users);
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
        .catch(err => {
            console.log(err)
            setLoading(false)
            console.log('there is a problem')
            setSuccess({
                state : false,
                message : err.message
            })
        })
        setLoading(false)

        // NodejsApi.get(`${process.env.REACT_APP_API_URL}/articles?${name}=${queries[name]}`)
        // .then(response => {
        //     if(! response.data.success){
        //         // setLoading(false)
        //         return  setSuccess(prevState => {
        //            return {
        //             state : response.data.success ,
        //             message : response.data.data
        //             }
        //         })
              
        //     }

        //     setSuccess(prevState => {
        //         return {
        //         state : response.data.success ,
        //         message : ''
        //         }
        //     })


        //     let data = response.data
        //     let articles = data.articles.docs
        //     setArticles(articles);
        //     setLoading(false)

        // } )
        // .catch(err => {
        //     console.log(err)
        //     setSuccess({
        //         state : false,
        //         message : err.message
        //     })
        //     setLoading(false)

        // })

    }

    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser}  />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black '>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>مدیریت کاربران</h2>
                <QueryContext.Provider value={{ sortQueries:sortQueries , queries : queries , inputHandler : inputHandler}}>
                    <FilterRow  />
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
                        <TableContext.Provider value={{users : usersState , deleteHandler , setAdminHandler , sortHandler}}>
                            <Table />
                        </TableContext.Provider>
                        <PaginationContext.Provider value={{ pagination  , inputHandler }}>
                            <Pagination  />
                        </PaginationContext.Provider>
                        </>
                    )
                }
                </QueryContext.Provider>
            </div>
            <GoTopBtn />
        </div>
    )

}

export default isAdmin( Users);