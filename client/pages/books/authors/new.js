import React, { useState } from 'react'
import withAuth from '../../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../../hooks/use-request';
import Head from 'next/head';
import FormData from 'form-data';
import ContentHeader from '../../../components/content-header';


function NewAuthor() {
    let formData = new FormData();

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState(null)

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/books/authors',
        method: 'post',
        body: formData,
        headers: {
            withCredentials: true
        },
        onSuccess: () => Router.push('/books/authors')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.append('image', image, image.name)
        formData.append('description', description)
        formData.append('firstName', firstName)
        formData.append('lastName', lastName)

        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Author</title>

            </Head>
            <ContentHeader title="Add New Author">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">Authors</li>
                <li className="breadcrumb-item active">New</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid">
                    <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
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
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Author Image</Form.Label>
                            <Form.Control
                                onChange={e => setImage(e.target.files[0])}
                                type="file" />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                as="textarea"
                                placeholder="Leave a description about the author"
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

export default withAuth(NewAuthor)
