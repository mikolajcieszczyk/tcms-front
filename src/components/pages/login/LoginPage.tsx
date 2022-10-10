import React, { useEffect, useState, useRef, useContext } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import axios from '../../../api/axios'
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

	console.log(auth)

	useEffect(() => {
		userRef.current.focus()
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
			console.log(response.data)

			const token = response.data.token
			setAuth({ user, pwd, token })
			// setUser('')
			// setPwd('')
			navigate(from, { replace: true })
		} catch (error) {
			console.log(error)
			errRef.current.focus()
		}
	}

	return (
		<div>
			{/* <p ref={errRef} aria-live='assertive'>
				{errMsg}
			</p> */}
			<h1>Sign In</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					type='text'
					id='username'
					ref={userRef}
					autoComplete='off'
					onChange={(e) => setUser(e.target.value)}
					value={user}
					required
				/>
				<label htmlFor='password'>Password:</label>
				<input
					type='password'
					id='password'
					onChange={(e) => setPwd(e.target.value)}
					value={pwd}
					required
				/>
				<button>Sign in</button>
			</form>
		</div>
	)
}
