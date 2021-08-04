import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';
import { Form, Button } from 'react-bootstrap';

function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/auth/signin',
        method: 'post',
        body: {
            email, password
        },
        onSuccess: () => Router.push('/')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }

    return (
        <div>
            <Head>
                <title>Sign In</title>
            </Head>
            <div className="row mx-auto">
                <div className="col-sm-8 col-md-8 col-lg-6 col-10 col-xl-4 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h3 className="text-center">Sign In</h3>
                            <Form className="mx-auto mt-5" onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        value={email} onChange={e => setEmail(e.target.value)}
                                        type="email" placeholder="Enter a type name" />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        type="password" placeholder="Enter a type name" />
                                </Form.Group>
                                {
                                    errors && errors
                                }
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                            </Form>
                            <hr className="my-4" />
                            <div className="text-center">
                                <Link href="/auth/signup">Create an account</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
