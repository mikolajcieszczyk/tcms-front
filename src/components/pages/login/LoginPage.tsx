import React, { useEffect, useState, useRef, useContext } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import Logo from '../../../assets/img/logo.png'
import axios from '../../../api/axios'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
const LOGIN_URL = 'users/login'

export default function LoginPage() {
	const { auth, setAuth } = useAuth()
	const userRef: any = useRef()
	const errRef: any = useRef()
	const navigate = useNavigate()
	const location = useLocation()
	const from = location.state?.from?.pathname || '/dashboard'

	const [user, setUser] = useState('')
	const [pwd, setPwd] = useState('')
	const [errMsg, setErrMsg] = useState('')

	// console.log(auth)

	useEffect(() => {
		// userRef.current.focus()
	}, [])

	useEffect(() => {
		setErrMsg('')
	}, [user, pwd])

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		try {
			const response = await axios.post(
				LOGIN_URL,
				JSON.stringify({ username: user, password: pwd }),
				{
					headers: { 'Content-type': 'application/json' },
					// withCredentials: true,
				},
			)
			// console.log(response.data)

			const token = response.data.token
			setAuth({ user, pwd, token })
			// setUser('')
			// setPwd('')
			navigate(from, { replace: true })
		} catch (error) {
			console.log(error)
			// errRef.current.focus()
		}
	}

	return (
		<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
			{/* <p ref={errRef} aria-live='assertive'>
				{errMsg}
			</p> */}
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header as='h2' color='teal' textAlign='center'>
					<img src={Logo} style={{ width: '300px' }} /> <br></br>
					Log-in to your account
				</Header>
				<Form size='large' onSubmit={handleSubmit}>
					<Segment>
						<Form.Input
							fluid
							icon='user'
							placeholder='Username'
							id='username'
							ref={userRef}
							autoComplete='off'
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<Form.Input
							fluid
							icon='lock'
							placeholder='Password'
							type='password'
							id='password'
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>
						<Button color='teal' fluid size='large'>
							Login
						</Button>
					</Segment>
				</Form>
			</Grid.Column>
		</Grid>
	)
}
