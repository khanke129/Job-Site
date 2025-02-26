import { useEffect, useState } from "react"
import { db } from "../../firebase"
import {
	collection,
	getDocs,
	query,
	where,
	deleteDoc,
	doc,
} from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import { Link } from "react-router-dom"
import {
	Container,
	Typography,
	CircularProgress,
	Card,
	CardContent,
	Button,
} from "@mui/material"

const Applications = () => {
	const { user } = useAuth()
	const [applications, setApplications] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const fetchApplications = async () => {
			if (!user) return

			try {
				const applicationsQuery = query(
					collection(db, "applications"),
					where("applicantId", "==", user.id)
				)
				const applicationDocs = await getDocs(applicationsQuery)
				setApplications(
					applicationDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
				)
			} catch (err) {
				setError("Failed to fetch applications.")
			}
			setLoading(false)
		}

		fetchApplications()
	}, [user])

	const handleDelete = async (applicationId) => {
		try {
			await deleteDoc(doc(db, "applications", applicationId))
			setApplications(applications.filter((app) => app.id !== applicationId))
		} catch (err) {
			setError("Failed to delete application.")
		}
	}

	if (loading)
		return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />
	if (error) return <Typography color="error">{error}</Typography>

	return (
		<Container sx={{ mt: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Your Applications
			</Typography>
			{applications.length > 0 ? (
				applications.map((application) => (
					<Card
						key={application.id}
						sx={{ mt: 2 }}
					>
						<CardContent>
							<Typography
								variant="h6"
								component={Link}
								to={`/jobs/${application.jobId}`}
								sx={{ textDecoration: "none", color: "inherit" }}
							>
								{application.jobTitle}
							</Typography>
							<Typography variant="body2">
								<strong>Company:</strong> {application.companyName}
							</Typography>
							<Typography variant="body2">
								<strong>Status:</strong> {application.status}
							</Typography>
							<Button
								variant="outlined"
								color="error"
								onClick={() => handleDelete(application.id)}
								sx={{ mt: 2 }}
							>
								Delete Application
							</Button>
						</CardContent>
					</Card>
				))
			) : (
				<Typography variant="body1">
					You have not applied for any jobs yet.
				</Typography>
			)}
		</Container>
	)
}

export default Applications
