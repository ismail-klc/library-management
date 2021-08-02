import React, { useState } from 'react'
import withAuth from '../../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';

function NewAuthor() {
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/books/authors',
        method: 'post',
        body: {
            firstName, lastName
        },
        onSuccess: () => Router.push('/books/authors')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <Form className="col-sm-6 mx-auto mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                value={firstName} onChange={e => setFirstName(e.target.value)}
                type="text" placeholder="Enter the first name" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                value={lastName} onChange={e => setLastName(e.target.value)}
                type="text" placeholder="Enter the last name" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default withAuth(NewAuthor)
