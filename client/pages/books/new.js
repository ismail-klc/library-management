import React, { useState } from 'react'
import withAuth from '../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import buildClient from '../../helpers/build-client';
import Head from 'next/head';
import FormData from 'form-data';
import ContentHeader from '../../components/content-header';

function NewBook({ authors, types }) {
    let formData = new FormData();

    const [name, setName] = useState('')
    const [page, setPage] = useState(0)
    const [authorId, setAuthorId] = useState(0)
    const [typeId, setTypeId] = useState(0)
    const [stock, setStock] = useState(0)
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/books',
        method: 'post',
        body: formData,
        headers: {
            withCredentials: true
        },
        onSuccess: () => Router.push('/books')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        image && formData.append('image', image, image.name)
        formData.append('name', name)
        formData.append('page', page)
        formData.append('authorId', authorId)
        formData.append('stock', stock)
        formData.append('typeId', typeId)
        formData.append('description', description)

        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Book</title>
            </Head>
            <ContentHeader title="Add New Book">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">New</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid">
                    <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Book Name</Form.Label>
                            <Form.Control
                                value={name} onChange={e => setName(e.target.value)}
                                type="text" placeholder="Enter a name" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Page Number</Form.Label>
                            <Form.Control
                                value={page} onChange={e => setPage(e.target.value)}
                                type="number" placeholder="Enter page number" />
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Stock</Form.Label>
                            <Form.Control
                                value={stock} onChange={e => setStock(e.target.value)}
                                type="number" placeholder="Enter stock number" />
                        </Form.Group>
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Book Image</Form.Label>
                            <Form.Control
                                onChange={e => setImage(e.target.files[0])}
                                type="file" />
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
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a description about the book"
                                style={{ height: '100px' }}
                            />
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
