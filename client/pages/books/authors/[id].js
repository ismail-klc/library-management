import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../../hocs/withAuth'

function AuthorDetail() {
    const router = useRouter()
    const id = router.query.id

    return (
        <div>
            { id }
        </div>
    )
}

export default withAuth(AuthorDetail)
