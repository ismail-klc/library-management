import React, { useState } from 'react'
import withAuth from '../../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';
import Head from 'next/head';
import ContentHeader from '../../../components/content-header';

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
            <ContentHeader title="Authors">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">Types</li>
                <li className="breadcrumb-item active">New</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid">
                    <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
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
                </div>
            </section>
        </>
    )
}

export default withAuth(NewType)
