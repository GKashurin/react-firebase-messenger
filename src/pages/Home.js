import React, {useEffect, useState} from "react";
import "../styles/Home.scss"
import {useDispatch, useSelector} from "react-redux";
import {getRealTimeUsers} from "../redux/actions/usersActions";
import User from "../components/User";

const Home = () => {

	const dispatch = useDispatch();
	const user = useSelector((state => state.users.users.users))
	const auth = useSelector((state => state.auth))
	const [chatStarted, setChatStarted] = useState(false)
	const [chatUser, setChatUser] = useState('')
	let unsubscribe;

useEffect(() => {
	// eslint-disable-next-line react-hooks/exhaustive-deps
	unsubscribe = dispatch(getRealTimeUsers(auth.uid))
		.then(unsubscribe => {
			return unsubscribe;
		})
		.catch(error => console.log(error))
}, [])

//componentWillUnmount
	useEffect(() => {
		return () => {
			unsubscribe.then(f => f()).catch(error => console.log(error))
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	const toggleChat = (user) => {
		setChatStarted(true)
		setChatUser(`${user.firstName} ${user.secondName}`)
	}


	return (
		<section className="container">
			<div className="listOfUsers">
				{
					user?.map (obj => {
						return (
							<User
								onClick={toggleChat}
								user={obj}
								key={obj.uid}
							/>
						)
					})
				}

			</div>

			<div className="chatArea">
				<div className="chatHeader">
					{chatUser}
				</div>
				<div className="messageSections">
					{
						chatStarted ?
							<div style={{textAlign: "left"}}>
								<p className="messageStyle">Hello User</p>
							</div> : null
					}
				</div>
				{
					chatStarted ?
						<div className="chatControls">
							<textarea />
							<button>Отправить</button>
						</div> : null
				}
			</div>
		</section>
	)
};

export default Home;