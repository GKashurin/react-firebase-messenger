import firebase from "firebase";

export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE"

export const logOut = () => ({ type: LOG_OUT });
export const logIn = (payload) => ({ type: LOG_IN, payload});
// аналогично:
// export const logIn = (values) => ({ type: LOG_IN, payload: {
// 		firstName: values.firstName,
// 		secondName: values.secondName,
// 		email: values.email }});


export const fetchUsersFailure = error => ({ type: FETCH_USERS_FAILURE, payload: error })


//регистрация
export const signUpFirebase = (values) => async (dispatch) => {
	firebase.auth()
		.createUserWithEmailAndPassword(values.email, values.password)
		.then(data => {
			const currentUser = firebase.auth().currentUser
			const name = `${values.firstName} ${values.secondName}`;
			currentUser.updateProfile({
				displayName: name
			})
				.then(() => {
					firebase.firestore().collection("users")
						.doc((data.user.uid))
						.set({
							firstName: values.firstName,
							secondName: values.secondName,
							uid: data.user.uid,
							createdAt: new Date(),
							isOnline: true
						})
						.then(() => {

							const loggedInUser = {
								firstName: values.firstName,
								secondName: values.secondName,
								uid: data.user.uid,
								email: values.email
							}

							localStorage.setItem('user', JSON.stringify(loggedInUser));
							console.log(loggedInUser)
							console.log('Регистрация прошла успешно...!');
							dispatch(logIn({
								firstName: values.firstName,
								secondName: values.secondName,
								email: values.email
							}));
						})
						.catch(error => console.log(error))
				})
		})
		.catch(error => console.log(error))
}

//авторизация
export const signInFirebase = (values) => async (dispatch) => {
	firebase.auth().signInWithEmailAndPassword(values.email, values.password)
		.then((data) => {
			const db = firebase.firestore();
			db.collection('users')
				.doc(data.user.uid)
				.update({isOnline: true})

				.then(() => {
					const name = (data.user.displayName).split(" ");  // Приходит строка, делаю из нее массив
					const firstName = name[0]
					const secondName = name[1];

					const loggedInUser = {
						firstName,
						secondName,
						uid: data.user.uid,
						email: data.user.email
					}
					localStorage.setItem('user', JSON.stringify(loggedInUser));
					dispatch(logIn({
						firstName: firstName,
						secondName: secondName,
						email: values.email,
						uid: data.user.uid,
					}));
				})
				.catch(error => console.log(error))
		})

		.catch((error) => {
			console.log(error);
			dispatch(fetchUsersFailure())
		})
}

export const isLoggedInUser = () => { //вход через localStorage
	return async dispatch => {
		const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

		if (user) {
			dispatch(logIn({
				firstName: user.firstName,
				secondName: user.secondName,
				email: user.email,
				uid: user.uid,
			}));
		}
		else {
			dispatch(fetchUsersFailure({error: 'нужно ввести логин и пароль'}))
		}
	}
}


//Выход(очищение localStorage, смена статуса на оффлайн)
export const signOut = (uid) => {
	return async (dispatch) => {

		firebase.firestore().collection('users')
			.doc(uid)
			.update({
				isOnline:false
			})
			.then(() => {
				firebase.auth()
					.signOut()
					.then(() => {
						localStorage.clear();
						dispatch(logOut())
					})
					.catch(error => console.log(error))
			})
			.catch(error => console.log(error))
	}
}

