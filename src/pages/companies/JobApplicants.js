import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { db } from "../../firebase"
import {
	doc,
	getDoc,
	collection,
	getDocs,
	query,
	where,
	updateDoc,
} from "firebase/firestore"
import { useAuth } from "../../context/AuthContext"
import {
	Container,
	Typography,
	CircularProgress,
	Button,
	Card,
	CardContent,
} from "@mui/material"
import useJobDetails from "../../hooks/useJobDetails"

const JobApplicants = () => {
	const { jobId } = useParams()
	const { user } = useAuth()
	const [job, setJob] = useState(null)
	const [applicants, setApplicants] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const { jobExperience, jobType, remoteStatus } = useJobDetails(job)

	useEffect(() => {
		const fetchJobAndApplicants = async () => {
			try {
				const jobRef = doc(db, "jobs", jobId)
				const jobSnap = await getDoc(jobRef)

				if (jobSnap.exists() && jobSnap.data().companyId === user?.id) {
					setJob({ id: jobSnap.id, ...jobSnap.data() })

					const applicationsQuery = query(
						collection(db, "applications"),
						where("jobId", "==", jobId)
					)
					const applicationsDocs = await getDocs(applicationsQuery)
					let applicantsData = applicationsDocs.docs.map((doc) => ({
						id: doc.id,
						...doc.data(),
					}))

					// Fetch additional applicant details from users collection
					const updatedApplicants = await Promise.all(
						applicantsData.map(async (applicant) => {
							const userRef = doc(db, "users", applicant.applicantId)
							const userSnap = await getDoc(userRef)
							if (userSnap.exists()) {
								return { ...applicant, ...userSnap.data() }
							}
							return applicant
						})
					)

					setApplicants(updatedApplicants)
				} else {
					setError("Job not found or unauthorized access.")
				}
			} catch (err) {
				setError("Failed to fetch job or applicants.")
			}
			setLoading(false)
		}

		fetchJobAndApplicants()
	}, [jobId, user])

	const updateApplicationStatus = async (applicationId, newStatus) => {
		try {
			const applicationRef = doc(db, "applications", applicationId)
			await updateDoc(applicationRef, { status: newStatus })
			setApplicants(
				applicants.map((applicant) =>
					applicant.id === applicationId
						? { ...applicant, status: newStatus }
						: applicant
				)
			)
		} catch (err) {
			setError("Failed to update application status.")
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
				<strong>Location:</strong> {job?.location}
			</Typography>
			<Typography variant="body1">
				<strong>Type:</strong> {jobType}
			</Typography>
			<Typography variant="body1">
				<strong>Experience:</strong> {jobExperience}
			</Typography>
			<Typography variant="body1">
				<strong>Remote:</strong> {remoteStatus}
			</Typography>
			<Typography
				variant="body1"
				sx={{ mt: 2 }}
			>
				{job?.description}
			</Typography>

			<Typography
				variant="h5"
				sx={{ mt: 4 }}
			>
				Applicants
			</Typography>
			{applicants.length > 0 ? (
				applicants.map((applicant) => (
					<Card
						key={applicant.id}
						sx={{ mt: 2 }}
					>
						<CardContent>
							<Typography variant="h6">{applicant.applicantName}</Typography>
							<Typography variant="body2">
								<strong>Status:</strong> {applicant.status}
							</Typography>
							<Typography variant="body2">
								<strong>Education:</strong>{" "}
								{applicant.education
									?.map(
										(edu) =>
											`${edu.degree} from ${edu.school}, Grade: ${edu.grade}`
									)
									.join(" | ") || "Not provided"}
							</Typography>
							<Typography variant="body2">
								<strong>Work Experience:</strong>{" "}
								{applicant.workExperience
									?.map(
										(exp) =>
											`${exp.jobTitle} at ${exp.company} (${exp.startDate} - ${exp.endDate})`
									)
									.join(" | ") || "Not provided"}
							</Typography>
							<Button
								variant="contained"
								color="primary"
								onClick={() =>
									updateApplicationStatus(applicant.id, "accepted")
								}
								sx={{ mt: 1, mr: 1 }}
							>
								Accept
							</Button>
							<Button
								variant="outlined"
								color="secondary"
								onClick={() =>
									updateApplicationStatus(applicant.id, "rejected")
								}
								sx={{ mt: 1 }}
							>
								Reject
							</Button>
						</CardContent>
					</Card>
				))
			) : (
				<Typography variant="body1">No applicants yet.</Typography>
			)}
		</Container>
	)
}

export default JobApplicants
