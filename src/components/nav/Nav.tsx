import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import TennisBall from '../../assets/img/green-ball.png'

import { Container, Icon, Menu } from 'semantic-ui-react'
import {
  NavContainer,
  LogoWrapper,
  MenuContainer,
  MenuItem,
} from './Nav.styled'

import useAuth from '../../hooks/useAuth'

interface INav {
  path?: string
}

export default function Nav({ path }: INav) {
  const [activeItem, setActiveItem] = useState('')
  const location = useLocation()
  const { auth, setAuth } = useAuth()

  return (
    <Container>
      <Menu secondary>
        <Link to='/dashboard'>
          <MenuItem
            name='main'
            active={activeItem === 'main'}
            onClick={() => setActiveItem('main')}
            isActive={location.pathname === '/dashboard'}
          >
            <Icon name='globe' fitted />
            <span>Main</span>
          </MenuItem>
        </Link>

        <Link to='bookings'>
          <MenuItem
            name='Bookings'
            active={activeItem === 'Bookings'}
            onClick={() => setActiveItem('Bookings')}
            isActive={location.pathname === '/dashboard/bookings'}
          >
            <Icon name='calendar alternate outline' fitted />
            <span>Bookings</span>
          </MenuItem>
        </Link>

        <Link to='clients'>
          <MenuItem
            name='clients'
            active={activeItem === 'clients'}
            onClick={() => setActiveItem('clients')}
            isActive={location.pathname === '/dashboard/clients'}
          >
            <Icon name='users' fitted />
            <span>Clients</span>
          </MenuItem>
        </Link>
      </Menu>
    </Container>
    // <NavContainer>
    //   <LogoWrapper>
    //     <Link
    //       to='/dashboard'
    //       style={{
    //         display: 'flex',
    //         flexDirection: 'column',
    //         alignItems: 'center',
    //       }}
    //     >
    //       <div style={{ display: 'flex', alignItems: 'center' }}>
    //         <img src={TennisBall} alt='TennisBall' width='30px' />
    //         <span>TCMS</span>
    //       </div>
    //       <p style={{ color: '#2C2745' }}>TENNIS CLUB MANAGEMENT SYSTEM</p>
    //     </Link>
    //   </LogoWrapper>
    //   <MenuContainer>
    //     <Menu inverted icon='labeled' vertical>

    //
    //     </Menu>
    //   </MenuContainer>
    // </NavContainer>
  )
}
