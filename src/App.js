import React, {useEffect} from "react";
import {Switch, Route} from "react-router-dom";

import Header from "./components/Header";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

import './styles/App.scss'
import PrivateRoute from "./components/PrivateRoute";
import {useDispatch, useSelector} from "react-redux";
import {isLoggedInUser} from "./redux/actions/authActions";

const App = () => {
	const auth = useSelector(state => state.auth.isLoggedIn)
	const dispatch = useDispatch();

	useEffect(() => {
		if(!auth){
			dispatch(isLoggedInUser())
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

 	return (
		<div className="App">
			<Header />
			<section className="wrapper">
				<Switch>
					<Route exact path="/" component={Login} />
					<PrivateRoute path="/chat" exact component={Home} />
					<Route path="/signup" component={Register} />
				</Switch>
			</section>
		</div>
 	);
};

export default App;