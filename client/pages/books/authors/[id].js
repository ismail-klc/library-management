import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../../hocs/withAuth'
import buildClient from '../../../helpers/build-client'


function AuthorDetail() {
    const router = useRouter()
    const id = router.query.id

    return (
        <div>
            { id }
        </div>
    )
}

export async function getServerSideProps(context) {
    const client = buildClient(context);

    try {
        const { data } = await client.get(`/api/books/authors/${context.params.id}`);
        console.log("data", data);

        return { props: { data } };
        
    } catch (error) {
        console.log("err",error);
        return {
            notFound: true,
        }
    }
}

export default withAuth(AuthorDetail)
