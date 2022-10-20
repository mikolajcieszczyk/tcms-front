import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

import TennisBall from '../../assets/img/tennis-ball.png'

import { Icon, Menu } from 'semantic-ui-react'
import { NavContainer, LogoWrapper, MenuContainer, MenuItem } from './Nav.styled'

import useAuth from '../../hooks/useAuth'

interface INav {
	path?: string
}

export default function Nav({ path }: INav) {
	const [activeItem, setActiveItem] = useState('')
	const location = useLocation()
	const { auth, setAuth } = useAuth()

	return (
		<NavContainer>
			<LogoWrapper>
				<Link to='/dashboard'>
					<img src={TennisBall} alt='TennisBall' width='60px' />
				</Link>
			</LogoWrapper>
			<MenuContainer>
				<Menu inverted icon='labeled' vertical>
					<Link to='bookings'>
						<MenuItem
							name='Bookings'
							active={activeItem === 'Bookings'}
							onClick={() => setActiveItem('Bookings')}
							className='menuItem'
							isActive={location.pathname === '/dashboard/bookings'}
						>
							<Icon name='calendar alternate outline' />
							Bookings
						</MenuItem>
					</Link>

					<Link to='clients'>
						<MenuItem
							name='clients'
							active={activeItem === 'clients'}
							onClick={() => setActiveItem('clients')}
							className='menuItem'
							isActive={location.pathname === '/dashboard/clients'}
						>
							<Icon name='users' />
							Clients
						</MenuItem>
					</Link>

					<Link to='courts'>
						<MenuItem
							name='Courts'
							active={activeItem === 'Courts'}
							onClick={() => setActiveItem('Courts')}
							className='menuItem'
							isActive={location.pathname === '/dashboard/courts'}
						>
							<Icon name='warehouse' />
							Courts
						</MenuItem>
					</Link>

					<Link to='stats'>
						<MenuItem
							name='stats'
							active={activeItem === 'stats'}
							onClick={() => setActiveItem('stats')}
							className='menuItem'
							isActive={location.pathname === '/dashboard/stats'}
						>
							<Icon name='chart area' />
							Stats
						</MenuItem>
					</Link>
				</Menu>
			</MenuContainer>
		</NavContainer>
	)
}
