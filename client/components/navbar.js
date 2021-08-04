import Link from 'next/link'
import React, { useState } from 'react'
import Router from 'next/router'

function Navbar() {
  const [name, setName] = useState('')

  const handleSearch = async (e) => {
    e.preventDefault()

    Router.push(`/books?name=${name}`)
    setName('')
  }

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button"><i className="fas fa-bars"></i></a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <Link href="/" >
            <a
              className={`nav-link`} >Home</a>
          </Link>
        </li>
      </ul>

      <form className="form-inline ml-3" onSubmit={handleSearch}>
        <div className="input-group input-group-sm">
          <input 
          value={name} onChange={e => setName(e.target.value)}
          className="form-control form-control-navbar" type="search" placeholder="Search Book By Name" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </form>

      <ul className="navbar-nav ml-auto">
        <li className="nav-item d-none d-sm-inline-block">
          <Link href="/auth/signout" >
            <a
              className={`nav-link`} >Sign Out</a>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
