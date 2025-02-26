import { useState } from "react"
import { auth, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Container, TextField, Button, Typography, Box } from "@mui/material"

const RegisterCompany = () => {
	const [formData, setFormData] = useState({
		companyName: "",
		email: "",
		password: "",
		industry: "",
	})
	const [error, setError] = useState(null)
	const navigate = useNavigate()
	const { setUser } = useAuth()

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			)
			const user = userCredential.user
			const userData = {
				companyName: formData.companyName,
				email: formData.email,
				industry: formData.industry,
				role: "company",
				createdAt: new Date(),
			}
			await setDoc(doc(db, "users", user.uid), userData)
			setUser({ id: user.uid, ...userData })
			navigate("/dashboard")
		} catch (err) {
			setError(err.message)
		}
	}

	return (
		<Container
			maxWidth="sm"
			sx={{ mt: 4 }}
		>
			<Typography
				variant="h4"
				gutterBottom
			>
				Register as a Company
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<TextField
					label="Company Name"
					name="companyName"
					onChange={handleChange}
					required
					fullWidth
				/>
				<TextField
					label="Email"
					type="email"
					name="email"
					onChange={handleChange}
					required
					fullWidth
				/>
				<TextField
					label="Password"
					type="password"
					name="password"
					onChange={handleChange}
					required
					fullWidth
				/>
				<TextField
					label="Industry"
					name="industry"
					onChange={handleChange}
					required
					fullWidth
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Register
				</Button>
				{error && <Typography color="error">{error}</Typography>}
			</Box>
		</Container>
	)
}

export default RegisterCompany
