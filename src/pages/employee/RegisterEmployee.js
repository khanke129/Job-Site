import { useState } from "react"
import { auth, db } from "../../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import { Container, TextField, Button, Typography, Box } from "@mui/material"

const RegisterEmployee = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
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
				name: formData.name,
				email: formData.email,
				role: "employee",
				createdAt: new Date(),
			}
			await setDoc(doc(db, "users", user.uid), userData)
			setUser({ id: user.uid, ...userData })
			navigate("/profile")
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
				Register as an Employee
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<TextField
					label="Name"
					name="name"
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

export default RegisterEmployee
