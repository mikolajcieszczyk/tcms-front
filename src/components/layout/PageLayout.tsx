import React from 'react'
import Nav from '../nav/Nav'
import styled from 'styled-components'
import TennisBall from '../../assets/img/tennis-ball.png'
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	Search,
	Segment,
} from 'semantic-ui-react'

export const PageLayoutContainer = styled.div`
	display: grid;
	grid-template-columns: 130px auto;
`

export const MainContainer = styled.div`
	display: flex;
	flex-direction: column;
	background-color: #fff;
	border-radius: 0 10px 10px 0;

	padding: 20px;
`

export const TCMSheader = styled.h1`
	color: #006980;
	margin: 0;
`

export const LoggedAs = styled.div`
	display: grid;
	grid-template-columns: 50px 1fr;
	align-items: center;

	span {
		color: #028360;
		font-weight: 700;
	}
`

export default function PageLayout(): React.ReactElement {
	return (
		<PageLayoutContainer>
			<Nav />
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
						<Image src={TennisBall} size='mini' circular />
						<span>Mikołaj Cięszczyk</span>
					</LoggedAs>
				</div>
				<div style={{ padding: '20px 0' }}>
					<Segment>
						Reprehenderit laborum adipisicing velit non tempor elit. Reprehenderit
						consequat ex amet exercitation do. Reprehenderit reprehenderit adipisicing
						qui ad culpa eu velit. Dolore fugiat excepteur sint consequat aute.Mollit
						veniam consequat quis aute culpa sint non elit. Esse nostrud do non et
						velit. Eiusmod dolore in esse minim est eiusmod officia mollit adipisicing
						fugiat eu aute.Culpa et ex laborum enim pariatur labore reprehenderit mollit
						est qui in duis ipsum id. Nostrud elit occaecat in deserunt. Duis mollit do
						ex nulla cillum nostrud irure non quis deserunt et elit ipsum.Voluptate
						Lorem laborum dolor aute esse anim proident nostrud labore Lorem fugiat.
						Duis deserunt do proident fugiat Lorem laborum. Tempor labore dolor esse
						reprehenderit exercitation ut. Fugiat quis ex sunt reprehenderit deserunt
						ullamco laborum voluptate laboris aliqua incididunt minim labore. Dolore
						sint anim fugiat velit et consequat nisi minim. Non ut sit amet sint duis
						excepteur. Enim consequat sunt ullamco dolore culpa ad est qui commodo.Sit
						dolor do anim excepteur non laborum cupidatat amet exercitation pariatur
						occaecat. Nisi deserunt eiusmod incididunt dolor laboris consectetur. Est
						amet cillum duis voluptate nulla deserunt Lorem dolore ut. In enim
						exercitation incididunt ad duis tempor non irure commodo. Amet velit ea ea
						deserunt labore quis adipisicing est amet qui mollit ut. Nulla est duis
						dolor sint eiusmod eu mollit occaecat minim occaecat proident incididunt. Eu
						consequat labore quis irure id.
					</Segment>
				</div>
			</MainContainer>
		</PageLayoutContainer>
	)
}
