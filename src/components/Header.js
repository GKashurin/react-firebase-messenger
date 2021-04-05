import React from 'react';
import {Link, NavLink} from "react-router-dom";

import '../styles/Header.scss'

const Header = (props) => {

	return (
		<header className="header">
			<div style={{display: 'flex'}}>
				<div className="logo">React-Chat</div>
				<ul className="leftMenu">
					<li><NavLink to={'/login'}>Войти</NavLink></li>
					<li><NavLink to={'/signup'}>Зарегистрироваться</NavLink></li>
				</ul>
			</div>
			<ul className="menu">
				<li>
					<Link to={'#'} onClick={props.logout}>Выйти</Link>
				</li>
			</ul>
		</header>
	);
}

export default Header;