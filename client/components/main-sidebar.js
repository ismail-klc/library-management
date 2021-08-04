import Link from 'next/link'
import React from 'react'

function MainSidebar() {
    return (
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            <a href="index3.html" className="brand-link">
                <span className="brand-text font-weight-light ml-4">LMS</span>
            </a>
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
