import React from 'react'
import Link from 'next/link'

function ContentHeader({
    title,
    children
}) {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">{title}</h1>
                    </div>
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item">
                                <Link href="/">
                                    <a >Home</a>
                                </Link>
                            </li>
                            {children}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentHeader
