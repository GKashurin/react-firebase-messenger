import React from "react";
import RegisterForm from "../components/RegisterForm";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Register = () => {
	const auth = useSelector(state => state.auth.isLoggedIn)

	if (auth) {
		return <Redirect to={'/chat'}/>
	}

	return (
		<div className="registerContainer">
			<RegisterForm />
		</div>
	);
}
export default Register;