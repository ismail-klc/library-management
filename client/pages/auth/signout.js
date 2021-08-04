import Head from 'next/head'
import Router from 'next/router'
import React, { useEffect } from 'react'
import ContentHeader from '../../components/content-header'
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
        <>
            <Head>
                <title>Signing out</title>
            </Head>
            <ContentHeader>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid text-center mt-5">
                    Signing you out ...
                </div>
            </section>
        </>
    )
}

export default Signout
