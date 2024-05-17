import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NodejsApi from 'src/Api/NodejsApi';
import SpinnerOnTop from 'src/components/Layouts/Home/Loadings/SpinnerOnTop';

export default function isAdmin(Component, page) {
    return (props) => {

        const [isAdmin, setIsAdmin] = useState(false)
        const [loading, setLoading] = useState(true)
        const navigate = useNavigate()

        useEffect(() => {

            const fetchData = async () => {
                setLoading(true)

                const res = await NodejsApi.get('/user')

                const userStatus = res?.data?.authenticatedUser?.admin

                if (userStatus) {
                    setLoading(false)
                    setIsAdmin(true)

                } else if (!userStatus) {

                    console.log(isAdmin)

                    setIsAdmin(false)
                    setLoading(false)
                    toast.info(`You are not access to this route`)
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
            console.log(isAdmin)
            return <Component isAdmin={false} {...props} />
        }


        return

    }
}