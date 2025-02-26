import { useState } from "react"
import {
	AppBar,
	Toolbar,
	IconButton,
	Drawer,
	List,
	ListItem,
	ListItemText,
	Button,
	useMediaQuery,
	Box,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Navbar = () => {
	const [drawerOpen, setDrawerOpen] = useState(false)
	const isMobile = useMediaQuery("(max-width: 768px)")
	const { user, logout } = useAuth()

	const toggleDrawer = (open) => () => {
		setDrawerOpen(open)
	}

	const menuItems = [
		{ text: "Home", path: "/" },
		!user && { text: "Login", path: "/login" },
		!user && { text: "Register Employee", path: "/signup-employee" },
		!user && { text: "Register Company", path: "/signup-company" },
		user?.role === "employee" && { text: "Profile", path: "/profile" },
		user?.role === "employee" && {
			text: "Applications",
			path: "/applications",
		},
		user?.role === "company" && { text: "Dashboard", path: "/dashboard" },
		user?.role === "company" && { text: "Post Job", path: "/post-job" },
	].filter(Boolean)

	return (
		<>
			<AppBar position="static">
				<Toolbar sx={{ justifyContent: "space-between" }}>
					{isMobile ? (
						<>
							<IconButton
								edge="start"
								color="inherit"
								onClick={toggleDrawer(true)}
							>
								<MenuIcon />
							</IconButton>
							<Drawer
								anchor="left"
								open={drawerOpen}
								onClose={toggleDrawer(false)}
								sx={{ width: 250 }}
							>
								<List sx={{ width: 250 }}>
									{menuItems.map(({ text, path }) => (
										<ListItem
											button
											key={text}
											component={Link}
											to={path}
											onClick={toggleDrawer(false)}
										>
											<ListItemText
												primary={text}
												sx={{ color: "black" }}
											/>
										</ListItem>
									))}
									{user && (
										<ListItem
											button
											onClick={logout}
											sx={{
												bgcolor: "red",
												color: "white",
												mt: 2,
												textAlign: "center",
												borderRadius: 1,
												"&:hover": { bgcolor: "darkred", cursor: "pointer" },
											}}
										>
											<ListItemText
												primary="Logout"
												sx={{ fontWeight: "bold", textAlign: "center" }}
											/>
										</ListItem>
									)}
								</List>
							</Drawer>
						</>
					) : (
						<>
							<Box>
								{menuItems.map(({ text, path }) => (
									<Button
										key={text}
										color="inherit"
										component={Link}
										to={path}
										sx={{ mx: 1 }}
									>
										{text}
									</Button>
								))}
							</Box>
							{user && (
								<Button
									color="secondary"
									variant="contained"
									onClick={logout}
									sx={{ ml: 2 }}
								>
									Logout
								</Button>
							)}
						</>
					)}
				</Toolbar>
			</AppBar>
		</>
	)
}

export default Navbar
