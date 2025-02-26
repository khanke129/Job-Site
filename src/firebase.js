import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
	apiKey: "AIzaSyCLeYZxJ5Z1JUwKaPJRBHzWKvWlsSNH8zE",
	authDomain: "jobify-db03c.firebaseapp.com",
	projectId: "jobify-db03c",
	storageBucket: "jobify-db03c.firebasestorage.app",
	messagingSenderId: "586169086328",
	appId: "1:586169086328:web:792a3aab0411950596988d",
}

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
