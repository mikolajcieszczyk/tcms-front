import React from 'react'
import Nav from '../nav/Nav'
import { Dropdown, Icon } from 'semantic-ui-react'
import { PageLayoutContainer, MainContainer, TCMSheader, LoggedAs } from './PageLayout.styled'
import { Navigate, Outlet, useOutlet } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'
interface IPageLayout {
	path?: string
}

export default function PageLayout({ path }: IPageLayout): React.ReactElement {
	const handleLogOut = () => {
		// localStorage.removeItem('token')
		// navigate('/login')
		// todo
	}

	const { user } = useAuth()
	const outlet = useOutlet()

	console.log(user)

	if (!user) {
		return <Navigate to='/' />
	}

	return (
		<PageLayoutContainer>
			<Nav path={path} />
			<MainContainer>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignContent: 'center',
					}}
				>
					<TCMSheader>TENNIS CLUB MANAGEMENT SYSTEM</TCMSheader>
					<LoggedAs>
						<Icon size='big' name='user circle' />
						<Dropdown floating text='miki'>
							<Dropdown.Menu>
								<Dropdown.Item text='Log out' onClick={handleLogOut} />
							</Dropdown.Menu>
						</Dropdown>
					</LoggedAs>
				</div>
				<div style={{ padding: '20px 0' }}>{outlet}</div>
			</MainContainer>
		</PageLayoutContainer>
	)
}
