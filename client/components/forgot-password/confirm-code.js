import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import useRequest from '../../hooks/use-request';

function ConfirmCode({
    setStep, step, code, setCode, email
})  {

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/auth/confirm-reset',
        method: 'post',
        body: {
            email, code
        },
        onSuccess: () => setStep(step + 1)
    });

    const handleSubmit = async (e) => {
        e.preventDefault()
        await doRequest()
    }

    return (
        <Form className="col-sm-4 mx-auto mt-5" onSubmit={handleSubmit}>
            <h4 className="mb-3">Confirm Code</h4>
            <Form.Group className="mb-3" >
                <Form.Label>Code</Form.Label>
                <Form.Control
                    value={code} onChange={e => setCode(e.target.value)}
                    type="number" placeholder="Enter verification code" />
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

export default ConfirmCode
