import Router from 'next/router';
import Head from 'next/head';
import React, { useState } from 'react'
import { Badge, Button } from 'react-bootstrap';
import MyDataTable from '../../components/my-table';
import buildClient from '../../helpers/build-client';
import withAuth from '../../hocs/withAuth'

const columns = [
    {
        name: 'Id',
        selector: row => row.id,
        sortable: true,
    },
    {
        name: 'Taken Date',
        selector: row => row.takenDate,
        sortable: true,
    },
    {
        name: 'Is Completed',
        selector: row => row.isCompleted
            ? <Badge pill bg="success" >&nbsp;&nbsp;&nbsp;</Badge>
            : <Badge pill bg="danger" >&nbsp;&nbsp;&nbsp;</Badge>,
        sortable: true,
    },
    {
        name: 'Book',
        selector: row => row.book.name,
        sortable: true,
    },
    {
        name: 'Student Id',
        selector: row => row.student.id,
        sortable: true,
    },
    {
        name: 'Student Name',
        selector: row => `${row.student.firstName} ${row.student.lastName} `,
        sortable: true,
    },
    {
        name: 'Complete',
        selector: row => !row.isCompleted &&
            <Button
            className="btn-sm btn-secondary mx-2 my-2">
                Complete
            </Button>,
    },
];

function Borrows({ data }) {
    const [borrows, setBorrows] = useState(data)
    
    if (typeof window !== 'undefined') {
        return (
            <>
                <Head>
                    <title>Borrows</title>
                </Head>
                <MyDataTable
                    columns={columns}
                    data={borrows}
                    title="Borrows"
                    // onClick={e => Router.push(`/students/${e.id}`)}
                    btnClick={() => Router.push('/borrows/new')}
                />
            </>
        )
    }

    return null;
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get('/api/borrows');
        console.log(data);
        return { props: { data } };

    } catch (error) {
        return { props: {} };
    }
}

export default withAuth(Borrows)
