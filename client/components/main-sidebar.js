import Link from 'next/link'
import React from 'react'

function MainSidebar({ user }) {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <Link href="/">
                <a className="brand-link">
                    <span className="brand-text font-weight-light ml-4">
                        <b>LMS</b>
                    </span>
                </a>
            </Link>
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                <div className="image">
                    <img src="/img/user.jpg" className="img-circle elevation-2" alt="User Image" />
                </div>
                <div className="info">
                    <span
                    style={{color: '#fff'}}
                    className="d-block">{user.email}</span>
                </div>
            </div>
            <div className="sidebar">
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header ml-2">MAIN</li>
                        <li className="nav-item">
                            <Link href="/students" >
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-user-graduate"></i>
                                    <p>
                                        Students
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/books" >
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-book"></i>
                                    <p>
                                        Books
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/borrows" >
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-th"></i>
                                    <p>
                                        Borrows
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-header">BOOK</li>
                        <li className="nav-item">
                            <Link href="/books/authors" >
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-pen"></i>
                                    <p>
                                        Authors
                                    </p>
                                </a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/books/types" >
                                <a className="nav-link">
                                    <i className="nav-icon fas fa-align-justify"></i>
                                    <p>
                                        Types
                                    </p>
                                </a>
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default MainSidebar
