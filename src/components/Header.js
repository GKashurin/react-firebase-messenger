import React from 'react';
import {Link, NavLink} from "react-router-dom";

import '../styles/Header.scss'
import {useDispatch, useSelector} from "react-redux";
import {signOut} from "../redux/actions/authActions";

const Header = (props) => {
	const auth = useSelector(state => state.auth)
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(signOut(auth.uid))
	}

	return (
		<header className="header">
			<div style={{display: 'flex'}}>
				<div className="logo">React-Chat</div>
				{
					!auth.isLoggedIn ?
						<ul className="leftMenu">
							<li><NavLink to={'/'}>Войти</NavLink></li>
							<li><NavLink to={'/signup'}>Зарегистрироваться</NavLink></li>
						</ul> : null
				}
			</div>
			<div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
				{ auth.isLoggedIn ? `Вы вошли как: ${auth.firstName} ${auth.secondName}` : ''}
			</div>
			<ul className="menu">
				{ auth.isLoggedIn ?
					<li><Link to={'/'} onClick={handleClick}>Выйти</Link></li>
					: null
				}
			</ul>
		</header>
	);
}

export default Header;