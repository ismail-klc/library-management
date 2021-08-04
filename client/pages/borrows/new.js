import React, { useState } from 'react'
import withAuth from '../../hocs/withAuth'
import { Form, Button } from 'react-bootstrap'
import Router from 'next/router';
import useRequest from '../../hooks/use-request';
import Head from 'next/head';
import buildClient from '../../helpers/build-client';
import ContentHeader from '../../components/content-header';

function NewBorrow({ books, students }) {
    const [studentId, setStudentId] = useState(0)
    const [bookId, setBookId] = useState(0)

    const { doRequest, errors } = useRequest({
        url: 'http://localhost:3000/api/borrows',
        method: 'post',
        body: {
            studentId: parseInt(studentId),
            bookId: parseInt(bookId)
        },
        onSuccess: () => Router.push('/borrows')
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        await doRequest();
    }

    return (
        <>
            <Head>
                <title>Add New Borrow</title>
            </Head>
            <ContentHeader title="Add New Borrow">
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Borrows </li>
                <li className="breadcrumb-item active">New </li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid">
                    <Form className="col-sm-6 mx-auto" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Student</Form.Label>
                            <Form.Select
                                value={studentId}
                                onChange={e => setStudentId(e.target.value)}
                                aria-label="Select a student">
                                <option
                                    value={0}>
                                    {`Select a student`}
                                </option>
                                {
                                    students.map(a => (
                                        <option
                                            key={a.id}
                                            value={a.id}>
                                            {`${a.firstName} ${a.lastName}`}
                                        </option>
                                    ))
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Book</Form.Label>
                            <Form.Select
                                value={bookId}
                                onChange={e => setBookId(e.target.value)}
                                aria-label="Select a book">
                                <option
                                    value={0}>
                                    {`Select a book`}
                                </option>
                                {
                                    books.map(t => (
                                        <option
                                            key={t.id}
                                            value={t.id}>
                                            {`${t.name}`}
                                        </option>
                                    ))
                                }
                            </Form.Select>
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
        let res = await client.get('/api/books');
        const books = res.data;

        res = await client.get('/api/students');
        const students = res.data;

        return { props: { students, books } };
    } catch (error) {
        return { props: {} };
    }
}


export default withAuth(NewBorrow)
