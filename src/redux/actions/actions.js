import firebase from "firebase";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const logIn = (user) => ({ type: LOG_IN, payload: user});
export const logOut = () => ({ type: LOG_OUT });

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

export const fetchUsersFailure = error => ({ type: FETCH_USERS_FAILURE, payload: error })

export const signUpFirebase = (values) => async (dispatch) => {
// 	firebase.auth()
// 		.createUserWithEmailAndPassword(values.email, values.password)
// 		.then(data => {
// 			console.log(data)
// 			const currentUser = firebase.auth().currentUser
// 			const name = `${values.name} ${values.secondName}`;
// 			console.log(name);
// 			currentUser.updateProfile({
// 				displayName: name
// 			})
// 				.then(() => {
// 					firebase.firestore().collection("users")
// 						.doc((data.user.uid))
// 						.set({
// 							name: values.name,
// 							secondName: values.secondName,
// 							uid: data.user.uid,
// 							createdAt: new Date(),
// 							isOnline: true
// 						})
// 						.then(() => {
//
// 							const loggedInUser = {
// 								name: values.name,
// 								secondName: values.secondName,
// 								uid: data.user.uid,
// 								email: values.email
// 							}
// 							localStorage.setItem('user', JSON.stringify(loggedInUser));
// 							console.log(loggedInUser)
// 							console.log('Регистрация прошла успешно...!');
// 							dispatch(logIn())
// 						})
// 						.catch(error => console.log(error))
// 				})
// 		})
// 		.catch(error => console.log(error))
// }
//
// export const signInFirebase = (values) => (dispatch) => {
// 	firebase.auth().signInWithEmailAndPassword(values.email, values.password)
// 		.then(data => {dispatch(logIn(data.user))})
// 		.then(data => console.log(data))
// 		.catch(error => console.log(error))
}