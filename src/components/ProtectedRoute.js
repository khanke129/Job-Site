import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const ProtectedRoute = ({ allowedRoles }) => {
	const { user, loading } = useAuth()

	if (loading) return <p>Loading...</p>
	if (!user || !allowedRoles.includes(user.role))
		return (
			<Navigate
				to="/login"
				replace
			/>
		)

	return <Outlet />
}

export default ProtectedRoute
