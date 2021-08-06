import React from 'react'
import withAuth from '../../../hocs/withAuth'
import buildClient from '../../../helpers/build-client'
import ContentHeader from '../../../components/content-header';
import Head from 'next/head';

function TypeDetail({ data }) {
    return (
        <>
            <Head>
                <title>{data.name}</title>
            </Head>
            <ContentHeader title={data.name}>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">Types</li>
                <li className="breadcrumb-item active">{data.name}</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid text-center">
                    {data.id} {data.name}
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/books/types/${context.params.id}`);

        return { props: { data } };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAuth(TypeDetail)
