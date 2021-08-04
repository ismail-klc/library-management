import React from 'react'

function ContentHeader() {
    return (
        <div className="content-header">
            <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                        <h1 className="m-0 text-dark">Dashboard</h1>
                    </div>{/* /.col */}
                    <div className="col-sm-6">
                        <ol className="breadcrumb float-sm-right">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Dashboard v1</li>
                        </ol>
                    </div>{/* /.col */}
                </div>{/* /.row */}
            </div>{/* /.container-fluid */}
        </div>
    )
}

export default ContentHeader
