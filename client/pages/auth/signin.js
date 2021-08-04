import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router';
import React, { useState } from 'react';
import useRequest from '../../hooks/use-request';

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
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card border-0 shadow rounded-3 my-5">
                        <div className="card-body p-4 p-sm-5">
                            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
                            <form onSubmit={handleSubmit}>
                                <div className="form-floating mb-3">
                                    <input
                                        required value={email} onChange={e => setEmail(e.target.value)}
                                        type="email" className="form-control" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <div className="form-floating mb-3">
                                    <input
                                        value={password} onChange={e => setPassword(e.target.value)}
                                        type="password" className="form-control" placeholder="Password" />
                                    <label htmlFor="floatingPassword">Password</label>
                                </div>

                                <div className="form-check mb-3">
                                    <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                    <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                        Remember password
                                    </label>
                                </div>
                                {
                                    errors
                                }
                                <div className="d-grid">
                                    <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Sign
                                        in</button>
                                </div>
                                <hr className="my-4" />
                                <div className="text-center">
                                    <Link href="/auth/signup">Create an account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
