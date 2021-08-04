import React from 'react'

function Footer() {
    return (
        <footer className="main-footer">
            <strong>Copyright © { new Date().getFullYear() }  - Library Management System - </strong>
            All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                <b>Version</b> 1.0.0
            </div>
        </footer>
    )
}

export default Footer
