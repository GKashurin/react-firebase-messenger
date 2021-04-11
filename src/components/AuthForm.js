import React from "react";
import {Formik} from "formik";
import * as Yup from "yup";
import {useDispatch} from "react-redux";
import {signInFirebase} from "../redux/actions/authActions";

const LoginForm = () => {
const dispatch = useDispatch()

	const validationSchema = Yup.object().shape({
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно')
	})

	const handleSubmit = (values) => {
		dispatch(signInFirebase(values))
	}

	return (
		<Formik initialValues={{
			email: '',
			password: ''
		}
		}
				onSubmit={handleSubmit}
				validateOnBlur
				validationSchema={validationSchema}
		>
			{ ( {
					values,
					errors,
					touched,
					handleChange,
					handleBlur,
					isValid,
					handleSubmit,
					dirty
				} ) => (
				<div className='form'>

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
					>Войти</button>
				</div>
			)}
		</Formik>
	)
}
export default LoginForm