import React from 'react'

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
                            {/* <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard v1</li> */}
                            { children}
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContentHeader
