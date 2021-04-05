import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {logIn, signUpFirebase} from "../redux/actions/actions";
import firebase from "firebase";

const RegisterForm = () => {

	const dispatch = useDispatch()
	const validationSchema = Yup.object().shape({
		name: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		secondName: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно')
	})

	const handleSubmit = (values) => {
			firebase.auth()
		.createUserWithEmailAndPassword(values.email, values.password)
		.then(data => {
			console.log(data)
			const currentUser = firebase.auth().currentUser
			const name = `${values.name} ${values.secondName}`;
			console.log(name);
			currentUser.updateProfile({
				displayName: name
			})
				.then(() => {
					firebase.firestore().collection("users")
						.doc((data.user.uid))
						.set({
							name: values.name,
							secondName: values.secondName,
							uid: data.user.uid,
							createdAt: new Date(),
							isOnline: true
						})
						.then(() => {
/////////////////////////
							const loggedInUser = {
								name: values.name,
								secondName: values.secondName,
								uid: data.user.uid,
								email: values.email
							}
							//////////////////
							localStorage.setItem('user', JSON.stringify(loggedInUser));
							console.log(loggedInUser)
							console.log('Регистрация прошла успешно...!');
							dispatch(logIn(values.email, values.password))
						})
						.catch(error => console.log(error))
				})
		})
		.catch(error => console.log(error))
	}

	return (
		<Formik initialValues={{
			name: '',
			secondName: '',
			email: '',
			password: ''
		}
		}
				onSubmit={handleSubmit}
				validateOnBlur
				validationSchema={validationSchema}
		>
			{({

				  values,
				  errors,
				  touched,
				  handleChange,
				  handleBlur,
				  isValid,
				  handleSubmit,
				  dirty
			  }) => (
				<div className='form'>
					<p>
						<input
							className={'input'}
							type='text'
							name='name'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.name}
						/>
					</p>
					{touched.name && errors.name && <p className={'error'}>{errors.name}</p>}

					<p>
						<input
							className={'input'}
							type='text'
							name='secondName'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.secondName}
						/>
					</p>
					{touched.secondName && errors.secondName && <p className={'error'}>{errors.secondName}</p>}

					<p>
						<input
							className={'input'}
							type='text'
							name='email'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.email}
						/>
					</p>
					{touched.email && errors.email && <p className={'error'}>{errors.email}</p>}

					<p>
						<input
							className={'input'}
							type='password'
							name='password'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.password}
						/>
					</p>
					{touched.password && errors.password && <p className={'error'}>{errors.password}</p>}

					<button
						className="btn btn-primary mx-2"
						disabled={!isValid && !dirty}
						onClick={handleSubmit}
						type='submit'
					>Отправить
					</button>
				</div>
			)}
		</Formik>
	)
}
export default RegisterForm