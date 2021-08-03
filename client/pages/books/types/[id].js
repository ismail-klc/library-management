import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../../hocs/withAuth'
import buildClient from '../../../helpers/build-client'

function TypeDetail() {
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
        const { data } = await client.get(`/api/books/types/${context.params.id}`);

        return { props: { data } };
        
    } catch (error) {
        return {
            notFound: true,
        }
    }
}

export default withAuth(TypeDetail)
