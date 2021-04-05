import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store";
import {Provider} from "react-redux";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";

firebase.initializeApp(
	{
		apiKey: "AIzaSyBsdDHJvMDSvZqZqXg3MWVzA2P0PrIUJ7Y",
		authDomain: "chat-83eb6.firebaseapp.com",
		projectId: "chat-83eb6",
		storageBucket: "chat-83eb6.appspot.com",
		messagingSenderId: "1091347838914",
		appId: "1:1091347838914:web:f9062f9bb7d566ca49885b"
	}
);


ReactDOM.render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<App/>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>,
	document.getElementById('root')
);


reportWebVitals();
