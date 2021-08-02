import Router from 'next/router'
import React, { useEffect } from 'react'
import useRequest from '../../hooks/use-request'

function Signout() {
    const { doRequest } = useRequest({
        url: 'http://localhost:3000/api/auth/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/auth/signin')
    })

    useEffect(() => {
        doRequest();
    }, [])

    return (
        <div className="container mt-5 text-center">
            Signing you out...
        </div>
    )
}

export default Signout
