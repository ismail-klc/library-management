import React, { useState } from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../hocs/withAuth'
import Head from 'next/head'
import { Form, Button } from 'react-bootstrap'
import useRequest from '../../hooks/use-request'
import buildClient from '../../helpers/build-client'
import Router from 'next/router'

function StudentDetail({ data }) {
    const router = useRouter()
    const id = router.query.id
    const [code, setCode] = useState(0)
    const { doRequest, errors } = useRequest({
        url: `http://localhost:3000/api/students/verify`,
        method: 'post',
        body: {
            code: parseInt(code), id
        },
        onSuccess: () => Router.push('/students')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    if (data && !data.isVerified) {
        return (
            <>
                <Head>
                    <title>Verify Student</title>
                </Head>
                <Form className="col-sm-6 mx-auto my-5" onSubmit={handleSubmit}>
                    <h4 className="mb-3">Verify Student Email</h4>
                    <Form.Group className="mb-3" >
                        <Form.Label>Code </Form.Label>
                        <Form.Control
                            value={code} onChange={e => setCode(e.target.value)}
                            type="number" placeholder="Enter the verify code" />
                    </Form.Group>
                    {
                        errors && errors
                    }
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </>
        )
    }

    return (
        <div className="text-center mt-5">
            {data && data.email} is verified
        </div>
    )
}


export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/students/${context.params.id}`);

        return { props: { data } };
        
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAuth(StudentDetail)
