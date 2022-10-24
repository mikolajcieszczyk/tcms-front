import styled from 'styled-components'
import { Menu } from 'semantic-ui-react'

export const StyledMenu = styled(Menu)`
  div {
    background-color: #fff !important;
    /* font-size: 16px !important; */
  }
`

export const MenuHeader = styled(Menu.Header)`
  display: flex;
  justify-content: space-between;
  font-size: 16px !important;
`
export const NavContainer = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px;
  text-align: center;
  color: #fff;
`

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  span {
    font-weight: 600;
    font-size: 25px;
    line-height: 38px;
    color: #2c2745;
    padding-left: 10px;
  }
`

export const MenuContainer = styled.nav`
  display: flex;
  flex-direction: column;
`
export const MenuItem = styled(Menu.Item)<{ isActive: boolean }>`
  display: flex !important;
  i {
    font-size: 15px;
    color: ${(props) =>
      props.isActive ? '#1657FF !important' : '#B9C0DE !important'};
  }

  span {
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    margin-left: 11px;

    letter-spacing: 1px;
    color: ${(props) =>
      props.isActive ? '#1657FF !important' : '#B9C0DE !important'};
  }
`
