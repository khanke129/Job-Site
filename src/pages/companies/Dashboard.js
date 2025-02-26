import { useAuth } from "../../context/AuthContext"
import { useEffect, useState } from "react"
import { db } from "../../firebase"
import { collection, getDocs, query, where } from "firebase/firestore"
import CompanyProfile from "../../components/company/CompanyProfile"
import JobListings from "../../components/company/JobListings"
import { Container, Typography, CircularProgress } from "@mui/material"

const Dashboard = () => {
	const { user, setUser } = useAuth()
	const [jobs, setJobs] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchJobs = async () => {
			if (!user) return
			const jobsQuery = query(
				collection(db, "jobs"),
				where("companyId", "==", user.id)
			)
			const jobDocs = await getDocs(jobsQuery)
			setJobs(jobDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
			setLoading(false)
		}

		fetchJobs()
	}, [user])

	if (loading)
		return <CircularProgress sx={{ display: "block", margin: "auto", mt: 4 }} />

	return (
		<Container sx={{ mt: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Company Dashboard
			</Typography>
			<CompanyProfile
				user={user}
				setUser={setUser}
			/>
			<JobListings jobs={jobs} />
		</Container>
	)
}

export default Dashboard
