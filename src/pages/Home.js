import React, {useEffect, useState} from "react";
import "../styles/Home.scss"
import {useDispatch, useSelector} from "react-redux";
import {getRealTimeUsers} from "../redux/actions/usersActions";
import User from "../components/User";
import {addMessageToFirebase, getRealTimeMessages} from "../redux/actions/messageActions";

const Home = () => {
	const dispatch = useDispatch();
	const user = useSelector((state => state.users.users.users))
	const auth = useSelector((state => state.auth))
	const conversations = useSelector((state => state.users.conversations.conversations))
	const [chatStarted, setChatStarted] = useState(false)
	const [chatUser, setChatUser] = useState('')
	const [message, setMessage] = useState('')
	const [userUid, setUserUid] = useState(null)
	let unsubscribe;

useEffect(() => {
	unsubscribe = dispatch(getRealTimeUsers(auth.uid))
		.then(unsubscribe => {
			return unsubscribe;
		})
		.catch(error => console.log(error))

}, [])

//componentWillUnmount
	useEffect(() => {
		return () => unsubscribe.then(f => f()).catch(error => console.log(error))
	}, [])


	const toggleChat = (user) => {
		setChatStarted(true)
		setChatUser(`${user.firstName} ${user.secondName}`)
		setUserUid(user.uid)

		dispatch(getRealTimeMessages({
			uid_1: auth.uid,
			uid_2: user.uid
		}))
	}

	const handleSubmit = (e) => {

		const messageObj = {
			user_uid_1: auth.uid,
			user_uid_2: userUid,
			message
		}
		if (message !== "") {
			dispatch(addMessageToFirebase(messageObj))
				.then(() => setMessage(''));
		}
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
							conversations?.map (obj => {
								return (
									<div key={obj.createdAt} style={{textAlign: obj.user_uid_1 === auth.uid ? "right" : "left"}}>
										<p className="messageStyle">{obj.message}</p>
									</div>
								)
							}) : null
					}
				</div>
				{
					chatStarted ?
						<div className="chatControls">
							<textarea
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								placeholder="Введите сообщение"
							/>
							<button onClick={handleSubmit}>Отправить</button>
						</div> : null
				}
			</div>
		</section>
	)
};

export default Home;