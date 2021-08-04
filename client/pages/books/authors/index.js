import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { SubHeader } from '../../../components/table-subheader';
import buildClient from '../../../helpers/build-client';
import withAuth from '../../../hocs/withAuth';
import { customStyles } from '../../../styles/customStyles';
import Router from 'next/router';
import MyDataTable from '../../../components/my-table';
import Head from 'next/head';
import ContentHeader from '../../../components/content-header';

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'First Name',
        selector: row => row.firstName,
        sortable: true,
    },
    {
        name: 'Last Name',
        selector: row => row.lastName,
        sortable: true,
    },
];

function Authors({ authors }) {
    if (typeof window !== 'undefined') {
        return (
            <>
                <Head>
                    <title>Authors</title>
                </Head>
                <ContentHeader title="Authors">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Books</li>
                    <li className="breadcrumb-item active">Authors</li>
                </ContentHeader>
                <section className="content">
                    <div className="container-fluid">
                        <MyDataTable
                            columns={columns}
                            data={authors}
                            onClick={e => Router.push(`/books/authors/${e.id}`)}
                            btnClick={() => Router.push('/books/authors/new')}
                        />
                    </div>
                </section>
            </>
        )
    }

    return null;
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/books/authors');
        console.log(data);
        return { props: { authors: data } };

    } catch (error) {
        return { props: {} };
    }
}
export default withAuth(Authors)
