
import React from 'react'
import { googleProvider, auth } from "../../firebase.js" 
import { onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { getAuth } from 'firebase/auth';

const Login = (props) => {
	const {setUser} = props,
		navigate = useNavigate(),
		auth = getAuth(),
	handleSign = useCallback(() => {
		signInWithPopup(auth, googleProvider).catch((error) => {
			console.error("Google Sign-In Error:", error);
		});
	}, [auth]);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
				localStorage.setItem("email", user.email);
				localStorage.setItem("name", user.displayName);
				navigate('/');
			} else {
				setUser(null);
			}
		});

		return () => unsubscribe();
	}, [auth, navigate, setUser]);

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
