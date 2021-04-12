import firebase from "firebase";

export const ADD_MESSAGE = "ADD_MESSAGE"
export const addMessage = (payload) => ({type: ADD_MESSAGE, payload})

export const addMessageToFirebase = (messageObj) => async dispatch => {
	firebase.firestore().collection('conversations')
		.add({
			...messageObj,
			isView: false,
			createdAt: new Date()
		})
		.then((data) => {
			console.log(data)
			dispatch(addMessage({
				...messageObj,
				isView: false,
				createdAt: new Date()
			}))
		})
		.catch((error) => console.log(error))
}

export const GET_MESSAGES = "GET_MESSAGES"
export const getMessages = payload => ({type: GET_MESSAGES, payload})

export const getRealTimeMessages = (user) => async (dispatch) => {
	firebase.firestore().collection('conversations')
		.where('user_uid_1', 'in', [user.uid_1, user.uid_2])
		.orderBy('createdAt', 'asc')
		.onSnapshot((querySnapshot) => {
			const conversations = [];
			querySnapshot.forEach((doc) => {
				if (
					(doc.data().user_uid_1 === user.uid_1 && doc.data().user_uid_2 === user.uid_2)
					||
					(doc.data().user_uid_1 === user.uid_2 && doc.data().user_uid_2 === user.uid_1)
				) {
					conversations.push(doc.data());
				}
			})
			dispatch(getMessages({conversations}));
		})
}


