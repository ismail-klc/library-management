import Router from 'next/router';
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import useRequest from '../../hooks/use-request';

function ChangePassword({
    email, code,
    password, setPassword, passwordConfirm, setPasswordConfirm
}) {
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/auth/reset-password',
        method: 'post',
        body: {
            email, code, password, passwordConfirm
        },
        onSuccess: () => Router.push('/auth/signin')
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        await doRequest()
    }

    return (
        <Form className="col-sm-4 mx-auto mt-5" onSubmit={handleSubmit}>
            <h4 className="mb-3">Change Password</h4>
            <Form.Group className="mb-3" >
                <Form.Label>New Password</Form.Label>
                <Form.Control
                    value={password} onChange={e => setPassword(e.target.value)}
                    type="password" placeholder="Enter new password" />
            </Form.Group>
            <Form.Group className="mb-3" >
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control
                    value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)}
                    type="password" placeholder="Enter new password again" />
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

export default ChangePassword
