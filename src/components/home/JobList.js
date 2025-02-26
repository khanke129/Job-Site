import JobCard from "./JobCard"
import { Grid2, Typography, Container } from "@mui/material"

const JobList = ({ jobs }) => {
	return (
		<Container sx={{ mt: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
				textAlign={"center"}
			>
				Available Jobs
			</Typography>
			{jobs.length > 0 ? (
				<Grid2
					container
					spacing={2}
					direction="column"
				>
					{jobs.map((job) => (
						<Grid2
							item
							xs={12}
							key={job.id}
						>
							<JobCard
								job={job}
								sx={{ width: "100%", minHeight: "150px" }}
							/>
						</Grid2>
					))}
				</Grid2>
			) : (
				<Typography variant="body1">No jobs found.</Typography>
			)}
		</Container>
	)
}

export default JobList
