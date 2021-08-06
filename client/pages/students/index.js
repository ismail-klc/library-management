import React, { useState } from 'react'
import withAuth from "../../hocs/withAuth"
import buildClient from '../../helpers/build-client'
import DataTable, { Alignment } from 'react-data-table-component';
import { customStyles } from '../../styles/customStyles';
import { SubHeader } from '../../components/table-subheader';
import Router from 'next/router';
import MyDataTable from '../../components/my-table';
import Head from 'next/head';
import { Badge } from 'react-bootstrap';
import ContentHeader from '../../components/content-header';

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Full Name',
        selector: row => `${row.firstName} ${row.lastName}`,
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
    {
        name: 'Is Verified',
        selector: row => row.isVerified
            ? <Badge pill bg="success" >&nbsp;&nbsp;&nbsp;</Badge>
            : <Badge pill bg="danger" >&nbsp;&nbsp;&nbsp;</Badge>,
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
                <ContentHeader title="Students">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item active">Students</li>
                </ContentHeader>
                <section className="content">
                    <div className="container-fluid">
                        <MyDataTable
                            columns={columns}
                            filteredColumn="email"
                            filteredBoxLabel="Filter By Email"
                            data={students} 
                            title="Students"
                            onClick={e => Router.push(`/students/${e.id}`)}
                            btnClick={() => Router.push('/students/new')}
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
        const { data } = await client.get('/api/students');
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Students)
