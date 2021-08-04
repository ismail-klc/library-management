import Link from 'next/link'
import React from 'react'
import { Card, Button, Row } from 'react-bootstrap'

function BookCard({ book }) {
    return (
        <Card className="col-md-2 mx-auto">
            <Card.Img
                variant="top" src={`http://localhost:3000/uploads/${book.image}`} />
            <Card.Body>
                <Card.Title>{book.name}</Card.Title>
                <Link href={`/books/${book.id}`}>
                    <a className="btn btn-sm btn-secondary">Go Detail</a>
                </Link>
            </Card.Body>
        </Card>
    )
}

export default BookCard
