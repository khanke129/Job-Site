import { Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import RegisterEmployee from "./pages/employee/RegisterEmployee"
import RegisterCompany from "./pages/companies/RegisterCompany"
import Home from "./pages/Home"
import Profile from "./pages/employee/Profile"
import Applications from "./pages/employee/Applications"
import Dashboard from "./pages/companies/Dashboard"
import PostJob from "./pages/companies/PostJob"
import ProtectedRoute from "./components/ProtectedRoute"
import JobDetails from "./pages/employee/JobDetails"
import JobApplicants from "./pages/companies/JobApplicants"
import { Container } from "@mui/material"

function App() {
	return (
		<>
			<Navbar />
			<Container
				maxWidth="lg"
				sx={{ pb: 4 }}
			>
				<Routes>
					<Route
						path="/"
						element={<Home />}
					/>
					<Route
						path="/login"
						element={<Login />}
					/>
					<Route
						path="/signup-employee"
						element={<RegisterEmployee />}
					/>
					<Route
						path="/signup-company"
						element={<RegisterCompany />}
					/>
					<Route
						path="/jobs/:jobId"
						element={<JobDetails />}
					/>

					{/* Protected routes for Employees */}
					<Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
						<Route
							path="/profile"
							element={<Profile />}
						/>
						<Route
							path="/applications"
							element={<Applications />}
						/>
					</Route>

					{/* Protected routes for Companies */}
					<Route element={<ProtectedRoute allowedRoles={["company"]} />}>
						<Route
							path="/dashboard"
							element={<Dashboard />}
						/>
						<Route
							path="/post-job"
							element={<PostJob />}
						/>
						<Route
							path="company/job/:jobId"
							element={<JobApplicants />}
						/>
					</Route>
				</Routes>
			</Container>
		</>
	)
}

export default App
