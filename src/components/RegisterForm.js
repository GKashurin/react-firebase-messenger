import React from "react";
import * as Yup from "yup";
import {Formik} from "formik";
import {useDispatch} from "react-redux";
import {signUpFirebase} from "../redux/actions/authActions";

const RegisterForm = () => {

	const dispatch = useDispatch()
	const validationSchema = Yup.object().shape({
		firstName: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		secondName: Yup.string().typeError('Должно быть строкой').required('Поле обязательно'),
		email: Yup.string().email('Введите верный email').required('Поле обязательно'),
		password: Yup.string().typeError('Должно быть строкой').required('Поле обязательно')
	})

	const handleSubmit = (values) => {
		dispatch(signUpFirebase(values))
	}

	return (
		<Formik initialValues={{
			firstName: '',
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
							name='firstName'
							onChange={handleChange}
							onBlur={handleBlur}
							value={values.firstName}
						/>
					</p>
					{touched.firstName && errors.firstName && <p className={'error'}>{errors.firstName}</p>}

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