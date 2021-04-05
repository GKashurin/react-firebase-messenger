import React from "react";
import {Switch, Route} from "react-router-dom";

import Header from "./components/Header";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";

import './styles/App.scss'
import PrivateRoute from "./components/PrivateRoute";

const App = () => {

 	return (
		<div className="App">
			<Header />
			<Switch>
				<PrivateRoute path="/" exact component={Home} />
				<Route path="/login" component={Login} />
				<Route path="/signup" component={Register} />
			</Switch>
		</div>
 	);
};

export default App;