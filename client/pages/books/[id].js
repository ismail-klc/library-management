import React from 'react'
import withAuth from '../../hocs/withAuth'
import buildClient from '../../helpers/build-client'
import Head from 'next/head';
import ContentHeader from '../../components/content-header';

function BookDetail({ data }) {
    return (
        <>
            <Head>
                <title>{data.name}</title>
            </Head>
            <ContentHeader title={data.name}>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">{data.name}</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid text-center">
                    <img
                        className="col-6 col-md-3 col-sm-6"
                        src={`http://localhost:3000/uploads/${data.image}`} />
                    <div className="mt-4">
                        <h3>
                            {data.name}
                        </h3>
                    </div>
                    <div className="mt-1">
                        <b>
                            Author: {data.author.firstName} {data.author.lastName}
                        </b>
                    </div>
                    <div className="mt-1">
                        <b>
                            Category: {data.type.name}
                        </b>
                    </div>
                    <div className="mt-1">
                        <b>
                            Page: {data.page}
                        </b>
                    </div>
                    <div className="mt-1">
                        <b>
                            Stock: {data.stock}
                        </b>
                    </div>
                    <p className="mt-4">
                        {data.description}
                    </p>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/books/${context.params.id}`);

        return { props: { data } };

    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAuth(BookDetail)
