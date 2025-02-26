import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../firebase"
import {
	doc,
	getDoc,
	collection,
	addDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import {
	Container,
	Typography,
	CircularProgress,
	Button,
} from "@mui/material"

const JobDetails = () => {
	const { jobId } = useParams()
	const { user } = useAuth()
	const [job, setJob] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [applied, setApplied] = useState(false)

	useEffect(() => {
		const fetchJob = async () => {
			try {
				const jobRef = doc(db, "jobs", jobId)
				const jobSnap = await getDoc(jobRef)
				if (jobSnap.exists()) {
					setJob({ id: jobSnap.id, ...jobSnap.data() })
				} else {
					setError("Job not found.")
				}
			} catch (err) {
				setError("Failed to fetch job details.")
			}
			setLoading(false)
		}

		fetchJob()
	}, [jobId])

	const applyForJob = async () => {
		if (!user) {
			setError("You must be logged in to apply for this job.")
			return
		}

		try {
			await addDoc(collection(db, "applications"), {
				jobId: job.id,
				jobTitle: job.title,
				companyId: job.companyId,
				companyName: job.companyName,
				applicantId: user.id,
				applicantName: user.name,
				status: "pending",
				createdAt: new Date(),
			})

			const jobRef = doc(db, "jobs", job.id)
			await updateDoc(jobRef, {
				applicants: arrayUnion(user.id),
			})

			setApplied(true)
		} catch (err) {
			setError("Failed to apply for the job. Please try again.")
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
				{job?.title}
			</Typography>
			<Typography variant="body1">
				<strong>Company:</strong> {job?.companyName}
			</Typography>
			<Typography variant="body1">
				<strong>Location:</strong> {job?.location}
			</Typography>
			<Typography variant="body1">
				<strong>Type:</strong> {job?.jobType}
			</Typography>
			<Typography variant="body1">
				<strong>Experience:</strong> {job?.experience}
			</Typography>
			<Typography variant="body1">
				<strong>Remote:</strong> {job?.remote}
			</Typography>
			<Typography
				variant="body1"
				sx={{ mt: 2 }}
			>
				{job?.description}
			</Typography>

			{applied ? (
				<Typography
					variant="body1"
					color="success.main"
					sx={{ mt: 2 }}
				>
					You have already applied for this job.
				</Typography>
			) : (
				<Button
					variant="contained"
					color="primary"
					onClick={applyForJob}
					sx={{ mt: 2 }}
				>
					Apply Now
				</Button>
			)}
		</Container>
	)
}

export default JobDetails
