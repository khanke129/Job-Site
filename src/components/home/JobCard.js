import React from "react"
import { Link } from "react-router-dom"
import { Card, CardContent, Typography } from "@mui/material"
import useJobDetails from "../../hooks/useJobDetails"

function JobCard({ job }) {
	const { jobExperience, remoteStatus, jobType } = useJobDetails(job)


	return (
		<Link
			to={`/jobs/${job.id}`}
			target="_blank"
			style={{ textDecoration: "none" }}
		>
			<Card sx={{ maxWidth: 400, margin: "auto", mt: 2, boxShadow: 3 }}>
				<CardContent>
					<Typography variant="h6">{job.title}</Typography>
					<Typography
						variant="subtitle1"
						color="textSecondary"
					>
						{job.company}
					</Typography>
					<Typography variant="body2">{job.location}</Typography>
					<Typography variant="body2">{remoteStatus}</Typography>
					<Typography variant="body2">{jobExperience}</Typography>
					<Typography variant="body2">{jobType}</Typography>
				</CardContent>
			</Card>
		</Link>
	)
}

export default JobCard
