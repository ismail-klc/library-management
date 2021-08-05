import Head from 'next/head'
import React, { useState } from 'react';
import withAuth from '../../hocs/withAuth'
import ContentHeader from '../../components/content-header'
import { Form } from 'react-bootstrap';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [newPasswordConfirm, setNewPasswordConfirm] = useState('')
    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/auth/change-password',
        method: 'post',
        body: {
            oldPassword, newPassword, newPasswordConfirm
        },
        onSuccess: () => Router.push('/')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        await doRequest();
    }
    return (
        <>
            <Head>
                <title>Change Password</title>
            </Head>
            <ContentHeader title="Change Password">
            </ContentHeader>
            <section className="content">
                <div className="container-fluid">
                    <Form className="col-sm-6 mx-auto mb-5" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Old Password</Form.Label>
                            <Form.Control
                                value={oldPassword} onChange={e => setOldPassword(e.target.value)}
                                type="password" placeholder="Enter your old password" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                value={newPassword} onChange={e => setNewPassword(e.target.value)}
                                type="password" placeholder="Enter a new password" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>New Password Confirm</Form.Label>
                            <Form.Control
                                value={newPasswordConfirm} onChange={e => setNewPasswordConfirm(e.target.value)}
                                type="password" placeholder="Enter new password again" />
                        </Form.Group>
                        {
                            errors && errors
                        }
                        <div className="d-grid">
                            <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">
                                Change Password</button>
                        </div>
                    </Form>
                </div>
            </section>
        </>
    )
}

export default withAuth(ChangePassword)
