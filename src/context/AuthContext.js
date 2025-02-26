import { createContext, useContext, useEffect, useState } from "react"
import { auth, db } from "../firebase"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
			if (authUser) {
				const userDoc = await getDoc(doc(db, "users", authUser.uid))
				if (userDoc.exists()) {
					setUser({ id: authUser.uid, ...userDoc.data() })
				} else {
					setUser(null)
				}
			} else {
				setUser(null)
			}
			setLoading(false)
		})

		return () => unsubscribe()
	}, [])

	// ✅ Logout-Funktion hinzufügen
	const logout = async () => {
		await signOut(auth)
		setUser(null) // Benutzer im State zurücksetzen
	}

	return (
		<AuthContext.Provider value={{ user, setUser, logout, loading }}>
			{loading ? <p>Loading...</p> : children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => useContext(AuthContext)
