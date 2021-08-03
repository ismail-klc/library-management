import React from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import Router from 'next/router';
import MyDataTable from '../../components/my-table';
import Head from 'next/head';

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


function Books({ books }) {
    if (typeof window !== 'undefined') {
        return (
            <>
                <Head>
                    <title>Books</title>
                </Head>
                <MyDataTable
                    columns={columns}
                    data={books}
                    title="Books"
                    onClick={e => Router.push(`/books/${e.id}`)}
                    btnClick={() => Router.push('/books/new')}
                />
            </>
        )
    }

    return null;
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/books');
        console.log(data);
        return { props: { books: data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Books)
