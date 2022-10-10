import { createContext, useState } from 'react'

interface IProps {
	children: React.ReactNode
}

interface IAuth {
	auth: any
	setAuth: any
}

const AuthContext = createContext({} as IAuth)

export const AuthProvider = ({ children }: IProps) => {
	const [auth, setAuth] = useState({})

	return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>
}

export default AuthContext
