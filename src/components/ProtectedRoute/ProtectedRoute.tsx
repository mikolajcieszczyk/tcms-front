import { Navigate } from 'react-router-dom'
import { useAuth } from '../AuthContext/AuthContext'

interface IProps {
	children: React.ReactElement<any, any>
}

export const ProtectedRoute = ({ children }: IProps) => {
	const { user } = useAuth()
	if (!user) {
		return <Navigate to='/' />
	}
	return children
}
