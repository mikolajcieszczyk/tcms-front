import React from 'react'
import Navi from '../nav/Nav'
import {
  // Button,
  // Container,
  Dropdown,
  Grid,
  Header,
  // Icon,
} from 'semantic-ui-react'
import {
  PageLayoutContainer,
  MainContainer,
  TCMSheader,
  LoggedAs,
  LogoWrapper,
  LogOutWrapper,
} from './PageLayout.styled'
import { useOutlet, useNavigate, useLocation, Link } from 'react-router-dom'
import TennisBall from '../../assets/img/green-ball.png'
import useAuth from '../../hooks/useAuth'
import AvatarPlaceholder from '../../assets/img/avatar.png'
import Container from 'react-bootstrap/Container'
import { Col, Row } from 'react-bootstrap'
interface IPageLayout {
  path?: string
}

export default function PageLayout({ path }: IPageLayout): React.ReactElement {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuth()
  // console.log(auth)
  const outlet = useOutlet()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/login'

  const handleLogOut = () => {
    // localStorage.removeItem('token')
    // navigate('/login')
    // todo
    setAuth({})
    navigate(from, { replace: true })
  }

  return (
    <Container fluid className='bg-white global-br px-3 py-3'>
      <Row>
        <Col>
          <Navi
            logo={
              <LogoWrapper to='/dashboard'>
                <div>
                  <img src={TennisBall} alt='TennisBall' />
                  <span>TCMS</span>
                </div>
                {/* <p style={{ color: '#2C2745' }}>
                  <span>TENNIS CLUB</span> <br /> <span>MANAGEMENT SYSTEM</span>
                </p> */}
              </LogoWrapper>
            }
            logout={
              <Dropdown
                direction='left'
                lazyLoad
                icon={''}
                trigger={
                  <p style={{ display: 'flex', alignItems: 'center' }}>
                    <img
                      src={AvatarPlaceholder}
                      alt='AvatarPlaceholder'
                      width='30px'
                      style={{
                        borderRadius: '.28571429rem',
                      }}
                    />
                  </p>
                }
              >
                <Dropdown.Menu>
                  <Dropdown.Header
                    icon='user'
                    content={<span>{auth.user}</span>}
                  />
                  <Dropdown.Item text='Log out' onClick={handleLogOut} />
                </Dropdown.Menu>
              </Dropdown>
            }
          />
        </Col>
      </Row>
      <Row className='mt-3 text-center'>
        <Col>
          {location.pathname === '/dashboard' && <h3>Home</h3>}
          {location.pathname === '/dashboard/bookings' && <h3>Bookings</h3>}
          {location.pathname === '/dashboard/clients' && <h3>Clients</h3>}
        </Col>
      </Row>
      <Row>{outlet}</Row>
      <Row className='text-center mt-3'>
        <a
          href='https://github.com/mikolajcieszczyk'
          target='_blank'
          rel='noopener noreferrer'
        >
          <i className='bi bi-git'></i> github.com/mikolajcieszczyk
        </a>
      </Row>
    </Container>
  )
}
