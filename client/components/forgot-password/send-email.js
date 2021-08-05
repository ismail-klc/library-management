import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import useRequest from '../../hooks/use-request';

function SendEmail({
    setStep, step, email, setEmail
}) {
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/auth/send-reset',
        method: 'post',
        body: {
            email
        },
        onSuccess: () => setStep(step + 1)
    });

    const handleSubmit = async (e) => {
        e.preventDefault()

        await doRequest()
    }

    return (
        <Form className="col-sm-4 mx-auto mt-5" onSubmit={handleSubmit}>
            <h4 className="mb-3">Send Confirmation Email</h4>
            <Form.Group className="mb-3" >
                <Form.Label>Email</Form.Label>
                <Form.Control
                    value={email} onChange={e => setEmail(e.target.value)}
                    type="email" placeholder="Enter email address" />
            </Form.Group>
            {
                errors && errors
            }
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default SendEmail
