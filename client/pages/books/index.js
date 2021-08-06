import React from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import Router from 'next/router';
import MyDataTable from '../../components/my-table';
import Head from 'next/head';
import ContentHeader from '../../components/content-header';
import { Row } from 'react-bootstrap';
import BookCard from '../../components/book-card';

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Name',
        selector: row => row.name,
        sortable: true,
    },
    {
        name: 'Page',
        selector: row => row.page,
        sortable: true,
    },
    {
        name: 'Stock',
        selector: row => row.stock,
        sortable: true,
    },
    {
        name: 'Author',
        selector: row => `${row.author.firstName} ${row.author.lastName}`,
        sortable: true,
    },
    {
        name: 'Type',
        selector: row => row.type.name,
        sortable: true,
    },
];


function Books({ books, isSearch }) {
    if (typeof window !== 'undefined') {
        return (
            <>
                <Head>
                    <title>Books</title>
                </Head>
                <ContentHeader title="Books">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Books</li>
                </ContentHeader>
                <section className="content">
                    <div className="container-fluid">
                        {
                            !isSearch ?
                                <MyDataTable
                                    columns={columns}
                                    filteredColumn="name"
                                    filteredBoxLabel="Filter By Name"
                                    data={books}
                                    onClick={e => Router.push(`/books/${e.id}`)}
                                    btnClick={() => Router.push('/books/new')}
                                /> :
                                <div>
                                    <Row>
                                        {
                                            books.map(b => (
                                                <BookCard key={b.id} book={b} />
                                            ))
                                        }
                                    </Row>
                                </div>
                        }
                    </div>
                </section>
            </>
        )
    }
    return null
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        if (context.query.name) {
            const name = context.query.name
            const { data } = await client.get(`/api/books?name=${name}`);
            return { props: { books: data, isSearch: true } };
        }

        const { data } = await client.get('/api/books');
        return { props: { books: data, isSearch: false } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Books)
