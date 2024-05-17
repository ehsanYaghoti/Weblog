//import Api
import { Spinner } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NodejsApi from 'src/Api/NodejsApi';

export default function isAuthenticated(Component, page) {
    return (props) => {

        const [isAuthenticated, setIsAuthenticated] = useState(false)
        const [loading, setLoading] = useState(true)
        const navigate = useNavigate()

        useEffect(() => {

            const fetchData = async () => {
                setLoading(true)

                const res = await NodejsApi.get('/user')

                const userStatus = res?.data?.isAuthenticated
                console.log(userStatus , page)

                if (page === 'auth' && userStatus) {
                    console.log(isAuthenticated)
                    setLoading(false)
                    setIsAuthenticated(true)
                    navigate('/')
                    toast.info(`You are login now to access first log out from user panel`)

                } else if (page === 'panel' && !userStatus) {
                    console.log(isAuthenticated)
                    setIsAuthenticated(false)
                    setLoading(false)
                    toast.info(`You are not login now to access first log in from /auth/login`)
                    navigate('/')

                } else if(userStatus){
                    setIsAuthenticated(true)
                }

                setLoading(false)

            }

            fetchData()

            console.log(isAuthenticated)


        }, [isAuthenticated, navigate])

        

        if (loading) {
            return <Spinner />
        }

        if (page === 'auth') {
           
            if (!isAuthenticated) {
                console.log(isAuthenticated)
                return <Component isAuthenticated={false} {...props} />
            }

        } else if (page === 'panel') {
            console.log(isAuthenticated)
            if (loading) {
                return <Spinner />
            }

            if (isAuthenticated) {
                console.log(isAuthenticated)

                return <Component isAuthenticated={true} {...props} />

            }
        }

        return

    }
}