import styled from 'styled-components'
import { Form, Button } from 'react-bootstrap'

export const CONTAINER = styled.div`
  padding: 10px;
  height: auto;

  label {
  }

  .form-group {
    margin-bottom: 2.5em;
  }

  .error {
    border: 2px solid #ff6565;
  }

  .error-message {
    color: #ff6565;
    padding: 0.5em 0.2em;
    height: 1em;
    position: absolute;
    font-size: 0.8em;
  }
`

export const MYFORM = styled(Form)`
  /* width: 90%;
  text-align: left;
  padding-top: 2em;
  padding-bottom: 2em;

  @media (min-width: 786px) {
    width: 50%;
  } */
`

export const BUTTON = styled(Button)`
  /* background: #1863ab;
  border: none;
  font-size: 1.2em;
  font-weight: 400;

  &:hover {
    background: #1d3461;
  } */
`
