import { Link } from "react-router-dom"
import {
	Card,
	CardContent,
	Typography,
	Button,
	Grid2,
	Container,
} from "@mui/material"

const JobListings = ({ jobs }) => {
	return (
		<Container sx={{ mt: 4 }}>
			<Typography
				variant="h4"
				gutterBottom
			>
				Your Job Listings
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
							<Card sx={{ width: "100%", minHeight: "150px" }}>
								<CardContent>
									<Typography variant="h5">{job.title}</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Location: {job.location}
									</Typography>
									<Typography
										variant="body2"
										color="textSecondary"
									>
										Applicants: {job.applicants?.length || 0}
									</Typography>
									<Button
										variant="contained"
										color="primary"
										component={Link}
										to={`/company/job/${job.id}`}
										sx={{ mt: 2 }}
									>
										View Details
									</Button>
								</CardContent>
							</Card>
						</Grid2>
					))}
				</Grid2>
			) : (
				<Typography variant="body1">No job listings found.</Typography>
			)}
		</Container>
	)
}

export default JobListings
