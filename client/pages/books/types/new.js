import React, { useState } from 'react'
import withAuth from '../../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';
import Head from 'next/head';

function NewType() {
    const [name, setName] = useState('')
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/books/types',
        method: 'post',
        body: {
            name
        },
        onSuccess: () => Router.push('/books/types')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Type</title>
            </Head>
            <Form className="col-sm-6 mx-auto my-5" onSubmit={handleSubmit}>
                <h4 className="mb-3">Add New Type</h4>
                <Form.Group className="mb-3" >
                    <Form.Label>Type Name</Form.Label>
                    <Form.Control
                        value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder="Enter a type name" />
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

export default withAuth(NewType)
