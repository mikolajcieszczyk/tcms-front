import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
	div {
		/* font-size: 16px !important; */
	}
`

export const MenuHeader = styled(Menu.Header)`
	display: flex;
	justify-content: space-between;
	font-size: 16px !important;
`
export const NavContainer = styled.div`
	width: 130px;
	height: 100%;
	background: #5db7ad;
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
export const MenuItem = styled(Menu.Item)<{ isActive: boolean }>`
	i {
		color: ${(props) => (props.isActive ? '#e8e000 !important' : '#fff')};
	}
`
