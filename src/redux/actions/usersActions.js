import firebase from "firebase";

export const GET_USERS = "GET_USERS"
const getUsers = (payload) => ({type: GET_USERS, payload})

export const getRealTimeUsers = (uid) => async (dispatch) => {
	const db = firebase.firestore();
	const unsubscribe = db.collection("users") //https://firebase.google.com/docs/firestore/query-data/listen?hl=en

		.onSnapshot((querySnapshot) => {
			const users = [];
			querySnapshot.forEach((doc) => {
				if (doc.data().uid !== uid) {
					users.push(doc.data());
				}
			});
			dispatch(getUsers({users: users})); //как в редюсере
		});
	return unsubscribe
}

