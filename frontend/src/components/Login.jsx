
import React from 'react'
import { googleProvider, auth } from "../../firebase.js" 
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
	const setUser = props.setUser,
		navigate = useNavigate(),
	handleSign = () => {
		signInWithPopup(auth,googleProvider).then((data) => {
			setUser(data.user)
			localStorage.setItem("email", data.user.email)
			localStorage.setItem("name", data.user.displayName)
			navigate("/bike")
		})
	}	
  return (
		<div style={{backgroundColor: "#F0F4F8"}} className='w-full h-screen text-black flex flex-col items-center justify-center'>
			<div className="text-center">
				<h1 className="text-4xl font-bold mb-8">Welcome to LifePluse</h1>
				<button 
					onClick={handleSign}
					className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				>
					Sign in with Google
				</button>
			</div>
		</div>
  )
}

export default Login
