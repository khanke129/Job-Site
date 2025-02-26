import { useState } from "react"
import { db } from "../../firebase"
import { collection, addDoc } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import { useNavigate } from "react-router-dom"
import {
	Container,
	TextField,
	MenuItem,
	Select,
	Button,
	Typography,
	FormControl,
	InputLabel,
	Box,
} from "@mui/material"

const PostJob = () => {
	const { user } = useAuth()
	const navigate = useNavigate()
	const [title, setTitle] = useState("")
	const [remote, setRemote] = useState("on-site")
	const [experience, setExperience] = useState("zero")
	const [jobType, setJobType] = useState("full-time")
	const [location, setLocation] = useState("")
	const [description, setDescription] = useState("")
	const [error, setError] = useState(null)

	const handleSubmit = async (e) => {
		e.preventDefault()
		setError(null)

		if (!user) {
			setError("You must be logged in to post a job.")
			return
		}

		try {
			await addDoc(collection(db, "jobs"), {
				title,
				companyId: user.id,
				companyName: user.companyName,
				remote,
				experience,
				jobType,
				location,
				description,
				applicants: [],
				createdAt: new Date(),
			})
			navigate("/dashboard")
		} catch (err) {
			setError("Failed to post job. Please try again.")
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
				Post a Job
			</Typography>
			<Box
				component="form"
				onSubmit={handleSubmit}
				sx={{ display: "flex", flexDirection: "column", gap: 2 }}
			>
				<TextField
					label="Job Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					fullWidth
				/>
				<FormControl fullWidth>
					<InputLabel>Remote</InputLabel>
					<Select
						value={remote}
						onChange={(e) => setRemote(e.target.value)}
					>
						<MenuItem value="on-site">On Site</MenuItem>
						<MenuItem value="hybrid">Hybrid</MenuItem>
						<MenuItem value="remote">Remote</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel>Experience</InputLabel>
					<Select
						value={experience}
						onChange={(e) => setExperience(e.target.value)}
					>
						<MenuItem value="zero">No Experience</MenuItem>
						<MenuItem value="one-to-two">1 to 2 Years</MenuItem>
						<MenuItem value="three-to-five">3 to 5 Years</MenuItem>
						<MenuItem value="five-plus">5+ Years</MenuItem>
					</Select>
				</FormControl>
				<FormControl fullWidth>
					<InputLabel>Job Type</InputLabel>
					<Select
						value={jobType}
						onChange={(e) => setJobType(e.target.value)}
					>
						<MenuItem value="full-time">Full Time</MenuItem>
						<MenuItem value="part-time">Part Time</MenuItem>
						<MenuItem value="contract">Contract</MenuItem>
					</Select>
				</FormControl>
				<TextField
					label="Location"
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					required
					fullWidth
				/>
				<TextField
					label="Job Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
					fullWidth
					multiline
					rows={4}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
				>
					Post Job
				</Button>
				{error && <Typography color="error">{error}</Typography>}
			</Box>
		</Container>
	)
}

export default PostJob
