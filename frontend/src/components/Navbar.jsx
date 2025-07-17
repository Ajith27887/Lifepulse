import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router";

const Navbar = (props) => {
	const user = props.user;
	console.log(user,"nav");
	const navigate = useNavigate()

const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
        props.setUser(null);
		localStorage.removeItem("email")
        navigate("/");
    }).catch((error) => {
        alert(error);
    });
}
	
	return (
		<div style={{ backgroundColor: '#2C3E50' }} className="h-[100px] gap-5 w-full p-3 flex justify-end items-center   ">
			<div>
				{
					user && (
						<div className="flex justify-center items-center gap-4">
							<img src={user.photoURL} className="rounded-full w-20 h-20"/>
							<p>{user.displayName}</p>
						</div>
					)
				}
			</div>
			<div>
				<button className="bg-red-600 gap-5" onClick={handleSignOut}>LogOut</button>
			</div>
		</div>
	)
}

export default Navbar
