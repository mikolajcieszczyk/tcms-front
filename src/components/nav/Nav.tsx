import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import TennisBall from '../../assets/img/green-ball.png'

import { Container } from 'semantic-ui-react'

import useAuth from '../../hooks/useAuth'
import { BluePrintMenu } from './Nav.styled'
import { Button, ButtonGroup, Navbar } from 'react-bootstrap'
import Nav from 'react-bootstrap/Nav'
interface INav {
  path?: string
  logo: any
  logout: any
}

export default function Navi({ path, logo, logout }: INav) {
  const [active, setActive] = useState('home')
  const location = useLocation()
  const { auth, setAuth } = useAuth()

  return (
    <Navbar bg='white' variant='light'>
      <Container fluid className='px-3'>
        <Navbar.Brand href='#home'>{logo}</Navbar.Brand>
        <Nav className='me-auto'>
          <Nav.Link
            className={`${active === 'home' && 'font-weight-bold'}`}
            onClick={() => setActive('home')}
          >
            <Link to='/dashboard'>Home</Link>
          </Nav.Link>
          <Nav.Link
            className={`${active === 'bookings' && 'font-weight-bold'}`}
            onClick={() => setActive('bookings')}
          >
            <Link to='/dashboard/bookings'>Bookings</Link>
          </Nav.Link>
          <Nav.Link
            className={`${active === 'clients' && 'font-weight-bold'}`}
            onClick={() => setActive('clients')}
          >
            <Link to='/dashboard/clients'>Clients</Link>
          </Nav.Link>
        </Nav>
        <Nav>{logout}</Nav>
      </Container>
    </Navbar>
  )
}
