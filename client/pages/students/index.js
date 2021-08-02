import React, { useState } from 'react'
import withAuth from "../../hocs/withAuth"
import buildClient from '../../helpers/build-client'
import DataTable, { Alignment } from 'react-data-table-component';
import { customStyles } from '../../styles/customStyles';
import { SubHeader } from '../../components/table-subheader';
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
        name: 'Email',
        selector: row => row.email,
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
            <>
                <Head>
                    <title>Students</title>
                </Head>
                <MyDataTable
                    columns={columns}
                    data={students}
                    title="Students"
                    onClick={e => Router.push(`/students/${e.id}`)}
                    btnClick={() => Router.push('/students/new')}
                />
            </>
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
