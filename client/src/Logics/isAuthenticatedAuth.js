//import Api
// import { Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NodejsApi from 'src/Api/NodejsApi';
import SpinnerLoading from 'src/components/Layouts/Admin/General/Loadings/spinner';

export default function isAuthenticatedAuth(Component) {


    return (props) => {

        const [loading, setLoading] = useState(true)
        const [isAuthenticated , setIsAuthenticated] = useState(null)
        const navigate = useNavigate()


        useEffect(() => {

            const fetchData = async () => {
                setLoading(true)

                const res = await NodejsApi.get('/user')

                const userStatus = res?.data?.isAuthenticated
                console.log('user is login ?' , userStatus)

                if (userStatus) {

                    setLoading(false)
                    setIsAuthenticated(true)
                    navigate('/')
                    toast.info(`You are login now to access first log out from user panel`)
                    return

                }

                setIsAuthenticated(false)
                setLoading(false)
                return <Component isAuthenticated={false} {...props} />

            }

            fetchData()


        }, [ navigate , props])

        if(loading) {
            // return <Spinner />
            return <SpinnerLoading />
        }

        if(!isAuthenticated){
            return <Component isAuthenticated={false} {...props} />
        }


    }

}
