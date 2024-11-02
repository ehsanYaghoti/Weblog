//import Api
import { Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NodejsApi from 'src/Api/NodejsApi';

export default function isAuthenticatedPanel(Component) {
    return (props) => {

        const [loading, setLoading] = useState(true)
        const [isAuthenticated , setIsAuthenticated] = useState(false)
        const navigate = useNavigate()

        useEffect(() => {

            const fetchData = async () => {
                setLoading(true)

                const res = await NodejsApi.get('/user')

                const userStatus = res?.data?.isAuthenticated
                console.log('user is login ?' , userStatus)

                if (!userStatus) {

                    setLoading(false)
                    setIsAuthenticated(false)
                    toast.info(`You are not login now to access first log in from /auth/login`)
                    navigate('/')

                } 

                setLoading(false)
                setIsAuthenticated(true)
                return <Component isAuthenticated={true} {...props} />

            }

            fetchData()

        }, [navigate , props])

        

        if(loading) {
            return <Spinner />
        }

        if(isAuthenticated){
            return <Component isAuthenticated={true} {...props} />
        }

    }
}