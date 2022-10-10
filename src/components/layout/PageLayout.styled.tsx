import styled from 'styled-components'
import { Grid } from 'semantic-ui-react'

export const PageLayoutLeftColumn = styled(Grid.Column)`
	background-color: #4949c8;
`

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
	grid-template-columns: 40px 1fr;
	align-items: center;

	span {
		color: #028360;
		font-weight: 700;
	}
`
