import { useState } from "react"
import {
	TextField,
	MenuItem,
	Select,
	Button,
	FormControl,
	InputLabel,
	Box,
} from "@mui/material"

const SearchBar = ({ handleSearch, resetSearch }) => {
	const [searchTerm, setSearchTerm] = useState("")
	const [remote, setRemote] = useState("")
	const [experience, setExperience] = useState("")
	const [jobType, setJobType] = useState("")
	const [location, setLocation] = useState("")

	const handleSubmit = (e) => {
		e.preventDefault()
		handleSearch({ searchTerm, remote, experience, jobType, location })
	}

	return (
		<Box
			component="form"
			onSubmit={handleSubmit}
			sx={{
				display: "flex",
				flexWrap: "wrap",
				gap: 2,
				p: 2,
				alignItems: "center",
			}}
		>
			<TextField
				fullWidth
				label="Search jobs..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				variant="outlined"
			/>

			<FormControl fullWidth>
				<InputLabel>Remote</InputLabel>
				<Select
					value={remote}
					onChange={(e) => setRemote(e.target.value)}
					label="Remote"
				>
					<MenuItem value="on-site">On Site</MenuItem>
					<MenuItem value="hybrid">Hybrid</MenuItem>
					<MenuItem value="remote">Remote</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel>Experience</InputLabel>
				<Select
					value={experience}
					onChange={(e) => setExperience(e.target.value)}
					label="Experience"
				>
					<MenuItem value="zero">No Experience</MenuItem>
					<MenuItem value="one-to-two">1 to 2 Years</MenuItem>
					<MenuItem value="three-to-five">3 to 5 Years</MenuItem>
					<MenuItem value="five-plus">5+ Years</MenuItem>
				</Select>
			</FormControl>

			<FormControl fullWidth>
				<InputLabel>Job Type</InputLabel>
				<Select
					value={jobType}
					onChange={(e) => setJobType(e.target.value)}
					label="Job Type"
				>
					<MenuItem value="">Any Job Type</MenuItem>
					<MenuItem value="full-time">Full Time</MenuItem>
					<MenuItem value="part-time">Part Time</MenuItem>
					<MenuItem value="contract">Contract</MenuItem>
				</Select>
			</FormControl>

			<TextField
				fullWidth
				label="Location"
				value={location}
				onChange={(e) => setLocation(e.target.value)}
				variant="outlined"
			/>

			<Button
				type="submit"
				variant="contained"
				color="primary"
			>
				Search
			</Button>
			<Button
				variant="outlined"
				color="secondary"
				onClick={resetSearch}
			>
				Reset Search
			</Button>
		</Box>
	)
}

export default SearchBar
