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
                        <li className="nav-item">
                            <a href="pages/widgets.html" className="nav-link">
                                <i className="nav-icon fas fa-th"></i>
                                <p>
                                    Widgets
                                    <span className="right badge badge-danger">New</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-header">EXAMPLES</li>
                        <li className="nav-item">
                            <a href="pages/calendar.html" className="nav-link">
                                <i className="nav-icon far fa-calendar-alt"></i>
                                <p>
                                    Calendar
                                    <span className="badge badge-info right">2</span>
                                </p>
                            </a>
                        </li>
                        <li className="nav-header">MISCELLANEOUS</li>
                        <li className="nav-item">
                            <a href="https://adminlte.io/docs/3.0" className="nav-link">
                                <i className="nav-icon fas fa-file"></i>
                                <p>Documentation</p>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    )
}

export default MainSidebar
