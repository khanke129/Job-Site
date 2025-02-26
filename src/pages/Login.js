import { useState } from "react"
import { auth, db } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { Container, TextField, Button, Typography, Box } from "@mui/material"

const Login = () => {
	const [formData, setFormData] = useState({ email: "", password: "" })
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
			const userCredential = await signInWithEmailAndPassword(
				auth,
				formData.email,
				formData.password
			)
			const user = userCredential.user
			const userDoc = await getDoc(doc(db, "users", user.uid))

			if (userDoc.exists()) {
				setUser({ id: user.uid, ...userDoc.data() })
				navigate("/")
			} else {
				setError("User data not found.")
			}
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
				Login
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
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
					Login
				</Button>
				{error && <Typography color="error">{error}</Typography>}
			</Box>
		</Container>
	)
}

export default Login
