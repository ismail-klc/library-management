import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap'
import Link from 'next/link'

function Header({ user }) {
  if (!user) {
    return null;
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link href="/">
          <a style={{ cursor: 'pointer' }}>
            <Navbar.Brand >
              Lib Mng
            </Navbar.Brand>
          </a>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/students" >
              <a
                className={`nav-link`} style={{ cursor: 'pointer' }}>Students</a>
            </Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>

          </Nav>
          <Nav>
            <NavDropdown title={user && user.email} id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <Link href="/auth/signout">
                <a
                  className={`dropdown-item`} style={{ cursor: 'pointer' }}>Signout</a>
              </Link>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
