import React, { useState } from 'react'
import withAuth from "../../hocs/withAuth"
import buildClient from '../../helpers/build-client'
import DataTable, { Alignment } from 'react-data-table-component';
import { customStyles } from '../../styles/customStyles';
import { SubHeader } from '../../components/table-subheader';
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
    {
        name: 'Class',
        selector: row => row.class,
        sortable: true,
    },
    {
        name: 'Birth',
        selector: row => row.birthDate,
        sortable: true,
    },
    {
        name: 'Gender',
        selector: row => row.gender,
        sortable: true,
    },
    {
        name: 'School No',
        selector: row => row.schoolNumber,
        sortable: true,
    },
];


const Students = ({ data }) => {
    const [students, setStudents] = useState(data);

    if (typeof window !== 'undefined') {
        return (
            <DataTable
                columns={columns}
                data={students}
                title="Students"
                highlightOnHover
                dense
                subHeader
                onRowClicked={e => Router.push(`/students/${e.id}`)}
                subHeaderAlign={Alignment.Left}
                subHeaderComponent={<SubHeader onClick={() => Router.push('/students/new')}/>}
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
        const { data } = await client.get('/api/students');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Students)
