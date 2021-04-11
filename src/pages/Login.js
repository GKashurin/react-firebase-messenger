import React from "react";
import LoginForm from "../components/AuthForm";
import { useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Login = () => {
	const auth = useSelector(state => state.auth.isLoggedIn)

if (auth) {
	return <Redirect to={'/chat'}/>
}


	return (

		<div className="loginContainer">
			<LoginForm/>
		</div>
	);
}
export default Login;