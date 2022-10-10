import { Navigate, useOutlet } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'

export const LoginLayout = () => {
	const { user } = useAuth()
	const outlet = useOutlet()

	console.log(user)

	if (user) {
		return <Navigate to='/dashboard/' replace />
	}

	return <div>{outlet}</div>
}
