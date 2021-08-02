import Head from 'next/head';
import Router from 'next/router';
import { useRouter } from 'next/router';
import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import MyDataTable from '../../../components/my-table';
import { SubHeader } from '../../../components/table-subheader';
import buildClient from '../../../helpers/build-client';
import withAuth from '../../../hocs/withAuth';
import { customStyles } from '../../../styles/customStyles';

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
];

function Types({ types }) {
    const router = useRouter()
    if (typeof window !== 'undefined') {
        return (
            <>
                <Head>
                    <title>Types</title>
                </Head>
                <MyDataTable
                    columns={columns}
                    data={types}
                    title="Types"
                    onClick={e => Router.push(`/books/types/${e.id}`)}
                    btnClick={() => Router.push('/books/types/new')}
                />
            </>
        )
    }

    return null;
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/books/types');
        console.log(data);
        return { props: { types: data } };

    } catch (error) {
        return { props: {} };
    }
}
export default withAuth(Types)
