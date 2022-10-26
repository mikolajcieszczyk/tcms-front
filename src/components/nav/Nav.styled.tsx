import styled from 'styled-components'
import { Menu } from '@blueprintjs/core'

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

export const BluePrintMenu = styled(Menu)`
  display: flex !important;
`
