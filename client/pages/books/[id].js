import React from 'react'
import { useRouter } from 'next/router'
import withAuth from '../../hocs/withAuth'

function BookDetail() {
    const router = useRouter()
    const id = router.query.id

    return (
        <div>
            { id }
        </div>
    )
}

export default withAuth(BookDetail)
