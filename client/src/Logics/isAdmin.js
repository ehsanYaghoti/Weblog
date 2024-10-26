import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NodejsApi from 'src/Api/NodejsApi';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

export default function isAdmin(Component, page) {
    return (props) => {

        const [isAdmin, setIsAdmin] = useState(false)
        const [loading, setLoading] = useState(true)
        const [user , setUser] = useState({})

        const navigate = useNavigate()

        useEffect(() => {

            const fetchData = async () => {
                setLoading(true)

                const res = await NodejsApi.get('/user')

                const userStatus = res?.data?.authenticatedUser?.admin
                setUser(res?.data?.authenticatedUser)

                if (userStatus) {
                    setLoading(false)
                    setIsAdmin(true)

                } else if (!userStatus) {

                    setIsAdmin(false)
                    setLoading(false)
                    toast.info(`You can not access to this route`)
                    navigate('/')

                }

                setLoading(false)

            }

            fetchData()

        }, [isAdmin, navigate])

        

        if (loading) {
            return <SpinnerOnTop />
        }


        if (isAdmin) {
            return <Component isAdmin={true} user={user} {...props} />
        } else if(! isAdmin){
            toast.info(`You can not access to this route`)

            return navigate('/')
        }


        return

    }
}