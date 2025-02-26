import { useState } from "react"
import { db } from "../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import {
	Container,
	TextField,
	Button,
	Typography,
	Box,
	IconButton,
	MenuItem,
} from "@mui/material"
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material"

const degrees = ["High School", "Bachelor's", "Master's", "PhD", "Other"]

const Profile = () => {
	const { user, setUser } = useAuth()
	const [formData, setFormData] = useState({
		name: user?.name || "",
		email: user?.email || "",
		education: user?.education || [],
		workExperience: user?.workExperience || [],
	})
	const [error, setError] = useState(null)

	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleSave = async () => {
		if (!user) return
		try {
			const userRef = doc(db, "users", user.id)
			await updateDoc(userRef, formData)
			setUser({ ...user, ...formData })
		} catch (err) {
			setError("Failed to update profile.")
		}
	}

	const handleAddField = (field, defaultValue) => {
		setFormData({ ...formData, [field]: [...formData[field], defaultValue] })
	}

	const handleRemoveField = (field, index) => {
		const updatedFields = [...formData[field]]
		updatedFields.splice(index, 1)
		setFormData({ ...formData, [field]: updatedFields })
	}

	const handleFieldChange = (field, index, key, value) => {
		const updatedFields = [...formData[field]]
		updatedFields[index][key] = value
		setFormData({ ...formData, [field]: updatedFields })
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
				Profile
			</Typography>
			<Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
				<TextField
					label="Name"
					name="name"
					value={formData.name}
					onChange={handleChange}
					fullWidth
				/>
				<TextField
					label="Email"
					name="email"
					value={formData.email}
					disabled
					fullWidth
				/>

				<Typography variant="h6">Education</Typography>
				{formData.education.map((edu, index) => (
					<Box
						key={index}
						sx={{ display: "flex", flexDirection: "column", gap: 1 }}
					>
						<TextField
							select
							label="Degree"
							value={edu.degree}
							onChange={(e) =>
								handleFieldChange("education", index, "degree", e.target.value)
							}
							fullWidth
						>
							{degrees.map((option) => (
								<MenuItem
									key={option}
									value={option}
								>
									{option}
								</MenuItem>
							))}
						</TextField>
						<TextField
							label="School"
							value={edu.school}
							onChange={(e) =>
								handleFieldChange("education", index, "school", e.target.value)
							}
							fullWidth
						/>
						<TextField
							label="Grade"
							value={edu.grade}
							onChange={(e) =>
								handleFieldChange("education", index, "grade", e.target.value)
							}
							fullWidth
						/>
						<IconButton onClick={() => handleRemoveField("education", index)}>
							<RemoveIcon />
						</IconButton>
					</Box>
				))}
				<Button
					startIcon={<AddIcon />}
					onClick={() =>
						handleAddField("education", { degree: "", school: "", grade: "" })
					}
				>
					Add Education
				</Button>

				<Typography variant="h6">Work Experience</Typography>
				{formData.workExperience.map((exp, index) => (
					<Box
						key={index}
						sx={{ display: "flex", flexDirection: "column", gap: 1 }}
					>
						<TextField
							label="Job Title"
							value={exp.jobTitle}
							onChange={(e) =>
								handleFieldChange(
									"workExperience",
									index,
									"jobTitle",
									e.target.value
								)
							}
							fullWidth
						/>
						<TextField
							label="Company"
							value={exp.company}
							onChange={(e) =>
								handleFieldChange(
									"workExperience",
									index,
									"company",
									e.target.value
								)
							}
							fullWidth
						/>
						<TextField
							label="Start Date"
							type="date"
							InputLabelProps={{ shrink: true }}
							value={exp.startDate}
							onChange={(e) =>
								handleFieldChange(
									"workExperience",
									index,
									"startDate",
									e.target.value
								)
							}
							fullWidth
						/>
						<TextField
							label="End Date"
							type="date"
							InputLabelProps={{ shrink: true }}
							value={exp.endDate}
							onChange={(e) =>
								handleFieldChange(
									"workExperience",
									index,
									"endDate",
									e.target.value
								)
							}
							fullWidth
						/>
						<IconButton
							onClick={() => handleRemoveField("workExperience", index)}
						>
							<RemoveIcon />
						</IconButton>
					</Box>
				))}
				<Button
					startIcon={<AddIcon />}
					onClick={() =>
						handleAddField("workExperience", {
							jobTitle: "",
							company: "",
							startDate: "",
							endDate: "",
						})
					}
				>
					Add Work Experience
				</Button>

				<Button
					variant="contained"
					color="primary"
					onClick={handleSave}
				>
					Save Changes
				</Button>
				{error && <Typography color="error">{error}</Typography>}
			</Box>
		</Container>
	)
}

export default Profile
