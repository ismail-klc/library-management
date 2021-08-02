import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { SubHeader } from '../../../components/table-subheader';
import buildClient from '../../../helpers/build-client';
import withAuth from '../../../hocs/withAuth';
import { customStyles } from '../../../styles/customStyles';
import Router from 'next/router';

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
            <DataTable
                columns={columns}
                data={authors}
                title="Authors"
                highlightOnHover
                dense
                subHeader
                subHeaderAlign={Alignment.Left}
                subHeaderComponent={<SubHeader onClick={() => Router.push('/books/authors/new')}/>}
                pagination
                paginationRowsPerPageOptions={[1, 2, 5]}
                fixedHeader
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
        const { data } = await client.get('/api/books/authors');
        console.log(data);
        return { props: { authors: data } };

    } catch (error) {
        return { props: {} };
    }
}
export default withAuth(Authors)
