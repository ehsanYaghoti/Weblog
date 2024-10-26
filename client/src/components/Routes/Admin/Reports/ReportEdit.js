// Modules
import React, { useEffect, useState }    from 'react';
import NodejsApi from 'src/Api/NodejsApi'; 
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

// layouts
import Navbar from 'src/components/Layouts/Admin/navbar.js';
import FormReport from 'src/components/Layouts/Admin/Report/FormReport';
import AdminrPanelHeader from 'src/components/Layouts/Admin/AdminrPanelHeader';

// Styles
import 'src/Styles/sass/main.scss';
import 'src/Styles/sass/forms.scss'

// Components
import isAdmin from 'src/Logics/isAdmin';
import ValidationPanel from 'src/components/Layouts/Admin/General/Validation/validationPanel';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';
import Error500 from 'src/components/Layouts/Admin/General/Errors/500';



const ReportEdit = (props) => {
    
    const [report , setReport] = useState({ 
        title : '',
    })
    const [success , setSuccess] = useState({ state : true ,  message : ''})
    const [validation , setValidation] = useState(true)
    const [messages , setMessages] = useState([])
    const [loading , setLoading] = useState(false)
    const [authenticatedUser , setAuthenticatedUser] = useState({
        isAuthenticated : false,
        user : {}
    })

    const {id} = useParams()

    useEffect(() => {

        setAuthenticatedUser({
            isAuthenticated : true,
            user : props?.user
        })
        setLoading(true)
        
        NodejsApi.get(`/admin/report/edit/${id}`)
        .then(response => {

            if(! response.data.success){
                
                setSuccess({
                    state : response.data.success ,
                    message : response.data.messages
                })
                setLoading(false)
                return  

            }

            setReport({
                title : response.data.data.title
            })
            setSuccess({
                state : response.data.success ,
                message : ''
            })
            setLoading(false)

    

        })
        .catch(err => {
            console.log(err)
            setSuccess({
                state : false ,
                message : err.message
            })
            setLoading(false)  
        })


    } , [id , props.user])
    

    let formHandler = (e) => {
        
        e.preventDefault();
        setLoading(true)
        
        NodejsApi.put(`/admin/report/${id}/update` , report)
        .then(response =>  {
            if(! response.data.success){

                setValidation(false)
                setLoading(false)
                setMessages(response.data.messages)
                return 

            }

            setMessages([])
            setValidation(true)
            setLoading(false)
            toast.success('information update was successful')

        })
        .catch(err => { 
            console.log(err)
            setSuccess({
                state : false ,
                message : err.message
            })
            setLoading(false)  
        })
    }

    let inputHandler = (e) => {
        e.preventDefault();
        let name = e.target.name
        let value = e.target.value

        setReport(prevState => {
            return {
                ...prevState,
                [name] : value
            }
        })

    }

    return (
        <div className='home-dashboard'>
            <Navbar user={authenticatedUser} />
            <div className='dashborad-body dark:bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] dark:from-gray-700 dark:via-gray-900 dark:to-black'>
                <AdminrPanelHeader user={authenticatedUser} />
                <h2 className='dashborad-body-title dark:text-gray-50'>ویرایش گزارش</h2>
                {!success.state && <Error500 message={success.message} /> }
                {loading && <SpinnerLoading /> }
                {! validation && <ValidationPanel messages={messages} />}
                <FormReport editMode={true}   report={report} inputHandler={inputHandler} formHandler={formHandler}  />
            </div>
        </div>
    )
    
}

export default isAdmin( ReportEdit);