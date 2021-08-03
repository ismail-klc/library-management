import Router from 'next/router';
import React from 'react'
import { Button } from 'react-bootstrap'
import useRequest from '../hooks/use-request';

function BorrowComplete({ borrowId }) {
    const { doRequest, errors } = useRequest({
        url: `http://localhost:3000/api/borrows/complete/${borrowId}`,
        body: {},
        method: 'put',
        onSuccess: () => Router.reload('/borrows')
    });

    const handleClick = async (e) => {
        e.preventDefault()

        await doRequest()
    }

    return (
        <Button
            onClick={handleClick}
            className="btn-sm btn-secondary mx-2 my-2">
            Complete
        </Button>
    )
}

export default BorrowComplete
