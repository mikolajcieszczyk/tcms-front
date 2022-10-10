import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Grid, Header, Segment, Button, Message, FormInput, Icon, Form } from 'semantic-ui-react'
import Logo from '../../../assets/img/logo.png'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../../AuthContext/AuthContext'

export default function LoginPage() {
	const [isSubmitted, setIsSubmitted] = useState(false)
	const [isLoginError, setIsLoginError] = useState(false)

	const { user } = useAuth()
	let navigate = useNavigate()

	if (!user) {
		return <Navigate to='/dashboard/' replace />
	}

	const getToken = () => {
		const tokenValue = localStorage.getItem('token')
		const parsedToken = tokenValue && JSON.parse(tokenValue)

		return parsedToken
	}

	const userToken = getToken()

	useEffect(() => {
		if (!userToken) {
			console.log('nima tokenaaaaaaaaaaaaaaaaaaaa')
		} else {
			navigate('/dashboard')
		}
	})

	localStorage.removeItem('token')

	const handleSubmit = async (e: any) => {
		e.preventDefault()

		setIsLoginError(false)

		const username = e.target[0].value
		const password = e.target[1].value

		const credentials = {
			username,
			password,
		}

		axios
			.post('http://localhost:4000/users/login', credentials)
			.then((res) => {
				if (res.status === 201) {
					setIsSubmitted(true)
					// todo change for cookies
					localStorage.setItem('token', JSON.stringify(res.data.token))
					setTimeout(() => navigate('/dashboard'), 2000)
				}
			})
			.catch((error) => {
				console.log(error)
				setIsLoginError(true)
			})
	}

	// console.log(isSubmitted)
	console.log(localStorage)

	return (
		<div className='form'>
			<Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
				<Grid.Column style={{ maxWidth: 450 }}>
					<Header as='h2' color='teal' textAlign='center'>
						<img src={Logo} style={{ width: '300px' }} /> <br></br>
						Log-in to your account
					</Header>
					<Form onSubmit={handleSubmit}>
						<Segment stacked>
							<FormInput fluid icon='user' iconPosition='left' placeholder='Username' required />
							<FormInput
								fluid
								icon='lock'
								iconPosition='left'
								placeholder='Password'
								type='password'
								required
							/>

							<Button color='teal' fluid size='large'>
								Login
							</Button>
						</Segment>
					</Form>
					<Message color='red' hidden={!isLoginError}>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<Icon size='big' name='info circle' />
							<div>
								<Message.Header>We're sorry but something went wrong</Message.Header>
								<p>Try one more time</p>
							</div>
						</div>
					</Message>
					<Message color='green' hidden={!isSubmitted} className='login-success-message'>
						<div
							style={{
								display: 'flex',
								justifyContent: 'space-evenly',
								alignItems: 'center',
							}}
						>
							<Icon size='big' loading name='thumbs up' />
							<div>
								<Message.Header>Logged succesfully!</Message.Header>
								<p>Redirecting...</p>
							</div>
						</div>
					</Message>
				</Grid.Column>
			</Grid>
		</div>
	)
}
