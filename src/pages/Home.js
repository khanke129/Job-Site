import { useState, useEffect } from "react"
import { db } from "../firebase"
import { collection, getDocs } from "firebase/firestore"
import SearchBar from "../components/home/SearchBar"
import JobList from "../components/home/JobList"
import { Container, Typography, Button } from "@mui/material"

const Home = () => {
	const [jobs, setJobs] = useState([])
	const [filteredJobs, setFilteredJobs] = useState([])

	useEffect(() => {
		const fetchJobs = async () => {
			const jobsCollection = await getDocs(collection(db, "jobs"))
			const jobData = jobsCollection.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}))
			setJobs(jobData)
			setFilteredJobs(jobData)
		}
		fetchJobs()
	}, [])

	const handleSearch = (filters) => {
		const { searchTerm, remote, experience, jobType, location } = filters
		const filtered = jobs.filter(
			(job) =>
				(searchTerm
					? job.title.toLowerCase().includes(searchTerm.toLowerCase())
					: true) &&
				(remote ? job.remote === remote : true) &&
				(experience ? job.experience === experience : true) &&
				(jobType ? job.type === jobType : true) &&
				(location
					? job.location.toLowerCase().includes(location.toLowerCase())
					: true)
		)
		setFilteredJobs(filtered)
	}

	const resetSearch = () => {
		setFilteredJobs(jobs)
	}

	return (
		<Container sx={{ mt: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Find Your Dream Job
			</Typography>
			<SearchBar handleSearch={handleSearch} resetSearch={resetSearch} />

			<JobList jobs={filteredJobs} />
		</Container>
	)
}

export default Home
