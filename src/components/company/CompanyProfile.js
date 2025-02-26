import { useState } from "react"
import { db } from "../../firebase"
import { doc, updateDoc } from "firebase/firestore"
import { TextField, Button, Card, CardContent, Typography } from "@mui/material"

const CompanyProfile = ({ user, setUser }) => {
	const [companyProfile, setCompanyProfile] = useState({
		name: user?.companyName || "",
		description: user?.companyDescription || "",
	})
	const [editing, setEditing] = useState(false)

	const handleProfileChange = (e) => {
		setCompanyProfile({ ...companyProfile, [e.target.name]: e.target.value })
	}

	const saveProfile = async () => {
		if (!user) return
		const userRef = doc(db, "users", user.id)
		await updateDoc(userRef, {
			companyName: companyProfile.name,
			companyDescription: companyProfile.description,
		})
		setUser({
			...user,
			companyName: companyProfile.name,
			companyDescription: companyProfile.description,
		})
		setEditing(false)
	}

	return (
		<Card sx={{ maxWidth: 600, margin: "auto", padding: 2, mt: 4 }}>
			<CardContent>
				<Typography
					variant="h5"
					gutterBottom
				>
					Company Profile
				</Typography>
				{editing ? (
					<div>
						<TextField
							fullWidth
							label="Company Name"
							name="name"
							value={companyProfile.name}
							onChange={handleProfileChange}
							margin="normal"
							variant="outlined"
						/>
						<TextField
							fullWidth
							label="Company Description"
							name="description"
							value={companyProfile.description}
							onChange={handleProfileChange}
							margin="normal"
							variant="outlined"
							multiline
							rows={4}
						/>
						<Button
							variant="contained"
							color="primary"
							onClick={saveProfile}
							sx={{ mr: 2 }}
						>
							Save
						</Button>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => setEditing(false)}
						>
							Cancel
						</Button>
					</div>
				) : (
					<div>
						<Typography variant="body1">
							<strong>Name:</strong> {companyProfile.name}
						</Typography>
						<Typography
							variant="body1"
							sx={{ mt: 1 }}
						>
							<strong>Description:</strong> {companyProfile.description}
						</Typography>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setEditing(true)}
							sx={{ mt: 2 }}
						>
							Edit Profile
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}

export default CompanyProfile
