import React, { useState } from 'react'
import withAuth from '../../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';

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
        <Form className="col-sm-6 mx-auto mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Type Name</Form.Label>
                <Form.Control
                value={name} onChange={e => setName(e.target.value)}
                type="text" placeholder="Enter a type name" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default withAuth(NewType)
