import React from 'react'
import withAuth from '../../hocs/withAuth'
import DataTable, { Alignment } from 'react-data-table-component';
import { customStyles } from '../../styles/customStyles';
import buildClient from '../../helpers/build-client'
import { SubHeader } from '../../components/table-subheader';
import Router from 'next/router';

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
            <DataTable
                columns={columns}
                data={books}
                title="Books"
                highlightOnHover
                dense
                subHeader
                onRowClicked={e => Router.push(`/books/${e.id}`)}
                subHeaderAlign={Alignment.Left}
                subHeaderComponent={<SubHeader onClick={() => Router.push('/books/new')}/>}
                fixedHeader
                pagination
                paginationRowsPerPageOptions={[1, 2, 5]}
                customStyles={customStyles}
                responsive
            />
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
