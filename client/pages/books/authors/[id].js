import React from 'react'
import withAuth from '../../../hocs/withAuth'
import buildClient from '../../../helpers/build-client'
import Head from 'next/head';
import ContentHeader from '../../../components/content-header';

function AuthorDetail({ data }) {
    return (
        <>
            <Head>
                <title>{data.firstName} {data.lastName}</title>

            </Head>
            <ContentHeader title={`${data.firstName} ${data.lastName}`}>
                <li className="breadcrumb-item"><a href="#">Home</a></li>
                <li className="breadcrumb-item active">Books</li>
                <li className="breadcrumb-item active">Authors</li>
                <li className="breadcrumb-item active">{data.firstName} {data.lastName}</li>
            </ContentHeader>
            <section className="content">
                <div className="container-fluid text-center">
                    <img
                        className="col-6 col-md-4 col-sm-6"
                        src={`http://localhost:3000/uploads/${data.image}`} />
                    <div className="mt-4">
                        <h4>
                            {data.firstName} {data.lastName}
                        </h4>
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
        const { data } = await client.get(`/api/books/authors/${context.params.id}`);

        return { props: { data } };

    } catch (error) {
        console.log("err", error);
        return {
            notFound: true,
        }
    }
}

export default withAuth(AuthorDetail)
