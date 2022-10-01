import React, { useState } from 'react'
import TennisBall from '../../assets/img/tennis-ball.png'
import styled from 'styled-components'

import { Icon, Menu } from 'semantic-ui-react'

export const NavContainer = styled.div`
	width: 130px;
	height: 800px;
	background: #028360;
	border-radius: 10px 0 0 10px;
	padding: 20px;
	text-align: center;
	color: white;
`

export const LogoWrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
`

export const MenuContainer = styled.nav`
	display: flex;
	flex-direction: column;
`

export default function Nav() {
	const [activeItem, setActiveItem] = useState('')
	return (
		<NavContainer>
			<LogoWrapper>
				<img src={TennisBall} alt='TennisBall' width='60px' />
			</LogoWrapper>
			<MenuContainer>
				<Menu inverted icon='labeled' vertical>
					<Menu.Item
						name='Bookings'
						active={activeItem === 'Bookings'}
						onClick={() => setActiveItem('Bookings')}
						className='menuItem'
					>
						<Icon name='calendar alternate outline' />
						Bookings
					</Menu.Item>

					<Menu.Item
						name='clients'
						active={activeItem === 'clients'}
						onClick={() => setActiveItem('clients')}
						className='menuItem'
					>
						<Icon name='users' />
						Clients
					</Menu.Item>

					<Menu.Item
						name='Courts'
						active={activeItem === 'Courts'}
						onClick={() => setActiveItem('Courts')}
						className='menuItem'
					>
						<Icon name='warehouse' />
						Courts
					</Menu.Item>

					<Menu.Item
						name='stats'
						active={activeItem === 'stats'}
						onClick={() => setActiveItem('stats')}
						className='menuItem'
					>
						<Icon name='chart area' />
						Stats
					</Menu.Item>
				</Menu>
			</MenuContainer>
		</NavContainer>
	)
}
