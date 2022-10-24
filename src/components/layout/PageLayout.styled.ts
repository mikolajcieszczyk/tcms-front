import styled, { keyframes } from 'styled-components'
import { Grid } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export const PageLayoutContainer = styled.div`
  display: grid;
  grid-template-columns: 300px auto;
  height: 100%;
`

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 0 10px 10px 0;

  padding: 20px;
`
export const PageLayoutLeftColumn = styled(Grid.Column)`
  background-color: #4949c8;
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

const textclip = keyframes`
 0%, 20%, 50%, 80%, 100% {
  transform: translateY(0);
} 
40% {
  transform: translateY(-2px);
} 
60% {
  transform: translateY(-5px);
  } 
80% {
  transform: translateY(3px);
}
`

export const LogoWrapper = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;

  div {
    display: flex;
    align-items: center;
    img {
      animation: ${textclip} 4s linear infinite reverse;

      width: 30px;
    }

    span {
      font-weight: 600;
      font-size: 30px;
      line-height: 38px;
      color: #2c2745 !important;
    }
  }

  p {
    text-align: left;
    font-size: 10px;
    padding-left: 2px;
    color: #2c2745 !important;

    span:first-child {
      letter-spacing: 5px;
    }

    span:last-child {
      letter-spacing: 0.21px;
      position: relative;
      bottom: 4px;
    }
  }
`

export const LogOutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  p {
    text-transform: capitalize;
    color: #2c2745;

    span {
      margin-right: 10px;
    }
  }
`
