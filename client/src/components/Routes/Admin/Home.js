import React , {useState , useEffect} from 'react';

//import Api
import NodejsApi from 'src/Api/NodejsApi'; 

//import Contexts
import AuthenticatedUserContext from 'src/Contexts/authenticatedUserContext';

//import layouts
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';
import Navbar from 'src/components/Layouts/Admin/navbar.js';

// import styles and icons
import 'src/Styles/sass/home.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faUsers , faBook , faQuoteRight , faDollarSign , faFile } from "@fortawesome/free-solid-svg-icons";
library.add(faUsers , faBook , faQuoteRight , faDollarSign , faFile)

function Home(props){

    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [ loading , setLoading ] = useState(false)

    const [dashboardData , setDashboardData] = useState({
        usersCount : '',
        usersAdminCount : '',
        categorysCount : '',
        tagsCount : '',
        permissionsCount : '',
        rolesCount : '',
        postsCount : '',
        podcastsCount : '',
        commentsCount : '', 
        articlesCount : '',
        answersCount : '',
        user : {
            isAuthenticated : false,
            user : {
                username : '',
                avatar : null,
                roles : []
            }        
        }
    })

    useEffect(() => {
        NodejsApi.get(`/admin/dashboard` )
        .then(response => {
            if(! response.data.success){
                console.log(response.data)
                setLoading(false)
                return  setSuccess(prevState => {
                   return {
                    state : response.data.success ,
                    messages : response.data.messages
                    }
                })
              
            }

            setSuccess(prevState => {
                return {
                state : response.data.success ,
                messages : ''
                }
            })



            console.log(response.data)
            let data = response.data.data
            setDashboardData({
                ...data
            });

            setLoading(false);
        } )
        .catch(err => console.log(err))

    } , [])
    
    
    return (
    <div className='home-dashboard  '>
        <AuthenticatedUserContext.Provider  value={dashboardData.user}  >
        <Navbar />

        {
            loading ? ('') : ('')
        }
        {
            success ? ('') : ('')
        }
        <div className='dashboard !pr-0 lg:!pr-[250px] dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:!border-none dark:from-gray-700 dark:via-gray-900 dark:to-black dark:text-gray-50'>
            
            <AdminrPanelHeader />
        
            <div className='cards !grid !grid-cols-1 sm:!grid-cols-2  md:!grid-cols-3 lg:!grid-cols-4 xl:!grid-cols-6 '>
                <div className='card users'>
                    <span className='number'>{ dashboardData.usersCount }</span>
                    <span className='name'>مجموع کاربران</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>{ dashboardData.usersAdminCount }</span>
                    <span className='name'>مجموع کاربران ادمین</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>{ dashboardData.postsCount }</span>
                    <span className='name'>مجموع پست ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>{ dashboardData.podcastsCount }</span>
                    <span className='name'>مجموع پادکست ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card active-users'>
                    <span className='number'>{ dashboardData.commentsCount }</span>
                    <span className='name'>مجموع کامنت</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>{ dashboardData.articlesCount }</span>
                    <span className='name'>مجموع مقاله ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card payments'>
                    <span className='number'>{ dashboardData.answersCount }</span>
                    <span className='name'>مجموع پاسخ ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card users'>
                    <span className='number'>{ dashboardData.categorysCount }</span>
                    <span className='name'>مجموع دسته بندی ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card users'>
                    <span className='number'>{ dashboardData.tagsCount }</span>
                    <span className='name'>مجموع تگ ها</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>

                <div className='card payments'>
                    <span className='number'>{ dashboardData.permissionsCount }</span>
                    <span className='name'>مجموع مجوز</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>
                <div className='card viewers'>
                    <span className='number'>{ dashboardData.rolesCount }</span>
                    <span className='name'>مجموع نقش</span>
                    <FontAwesomeIcon icon='users' className='card-icon'/>
                </div>


            </div>

        </div>
        </AuthenticatedUserContext.Provider>
    </div>
    )
}

export default Home;