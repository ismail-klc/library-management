import Link from 'next/link';
import React from 'react'

function DashboardCart({ data }) {
    return (
        <div className="row">
            <div className="col-lg-3 col-6">
                <div className="small-box bg-info">
                    <div className="inner">
                        <h3>{data.bookCount}</h3>
                        <p>Books</p>
                    </div>
                    <div className="icon">
                        <i className="ion ion-bag" />
                    </div>
                    <Link href="/books" >
                        <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box bg-success">
                    <div className="inner">
                        <h3>{data.studentCount}<sup style={{ fontSize: '20px' }}></sup></h3>
                        <p>Students</p>
                    </div>
                    <div className="icon">
                        <i className="ion ion-stats-bars" />
                    </div>
                    <Link href="/students" >
                        <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                    </Link>                
                    </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box bg-warning">
                    <div className="inner">
                        <h3>{data.borrowCount}</h3>
                        <p>Borrows</p>
                    </div>
                    <div className="icon">
                        <i className="ion ion-person-add" />
                    </div>
                    <Link href="/borrows" >
                        <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                    </Link>
                </div>
            </div>
            <div className="col-lg-3 col-6">
                <div className="small-box bg-danger">
                    <div className="inner">
                        <h3>{data.authorCount}</h3>
                        <p>Authors</p>
                    </div>
                    <div className="icon">
                        <i className="ion ion-pie-graph" />
                    </div>
                    <Link href="/books/authors" >
                        <a className="small-box-footer" >More info <i className="fas fa-arrow-circle-right" /></a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default DashboardCart
