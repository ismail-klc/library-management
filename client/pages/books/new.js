import React, { useState } from 'react'
import withAuth from '../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import buildClient from '../../helpers/build-client';
import Head from 'next/head';

function NewBook({ authors, types }) {
    const [name, setName] = useState('')
    const [page, setPage] = useState(0)
    const [authorId, setAuthorId] = useState(0)
    const [typeId, setTypeId] = useState(0)

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/books',
        method: 'post',
        body: {
            name, page, authorId: parseInt(authorId), typeId: parseInt(typeId)
        },
        onSuccess: () => Router.push('/books')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Book</title>
            </Head>
            <Form className="col-sm-6 mx-auto my-5" onSubmit={handleSubmit}>
                <h4 className="mb-3">Add New Book</h4>
                <Form.Group className="mb-3" >
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                        value={name} onChange={e => setName(e.target.value)}
                        type="text" placeholder="Enter a name" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Page Number</Form.Label>
                    <Form.Control
                        value={page} onChange={e => setPage(parseInt(e.target.value))}
                        type="number" placeholder="Enter page number" />
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Book Author</Form.Label>
                    <Form.Select
                        value={authorId}
                        onChange={e => setAuthorId(parseInt(e.target.value))}
                        aria-label="Select an author">
                        {
                            authors.map(a => (
                                <option
                                    key={a.id}
                                    value={parseInt(a.id)}>{`${a.firstName} ${a.lastName}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Book Type</Form.Label>
                    <Form.Select
                        value={typeId}
                        onChange={e => setTypeId(parseInt(e.target.value))}
                        aria-label="Select a type">
                        {
                            types.map(t => (
                                <option
                                    key={t.id}
                                    value={parseInt(t.id)}>{`${t.name}`}
                                </option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
        </>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        let res = await client.get('/api/books/authors');
        const authors = res.data;

        res = await client.get('/api/books/types');
        const types = res.data;

        return { props: { authors, types } };
    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(NewBook)
