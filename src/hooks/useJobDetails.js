import { useState, useEffect } from "react"

const useJobDetails = (job) => {
	const [jobExperience, setJobExperience] = useState("")
	const [remoteStatus, setRemoteStatus] = useState("")
	const [jobType, setJobType] = useState("")

	useEffect(() => {
		if (!job) return

		const experienceMapping = {
			zero: "No Experience required",
			"one-to-two": "1 to 2 Years Experience required",
			"three-to-five": "3 to 5 Years Experience required",
			"five-plus": "5+ Years Experience required",
		}

		const remoteMapping = {
			"on-site": "On Site",
			hybrid: "Hybrid",
			remote: "Remote",
		}

		const jobTypeMapping = {
			"full-time": "Full Time",
			"part-time": "Part Time",
			contract: "Contract",
		}

		setJobExperience(experienceMapping[job.experience] || "Unknown Experience")
		setRemoteStatus(remoteMapping[job.remote] || "Unknown Remote Status")
		setJobType(jobTypeMapping[job.type] || "Unknown Job Type")
	}, [job])

	return { jobExperience, remoteStatus, jobType }
}

export default useJobDetails
