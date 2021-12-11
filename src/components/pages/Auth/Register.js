import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from '../../form/Form.module.css';
import Input from '../../form/Input';
/* contexts */
import { Context } from '../../../context/UserContext';

function Register() {
	const [ user, setUser ] = useState({});
	const { register } = useContext(Context);

	function handleChange(e) {
		setUser({ ...user, [e.target.name]: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		register(user);
	}

	return (
		<section className={styles.form_container}>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<Input
					text="Nome"
					type="text"
					name="name"
					placeholder="Digite o seu nome."
					handleOnChange={handleChange}
				/>
				<Input
					text="Telefone"
					type="text"
					name="phone"
					placeholder="Digite o seu telefone."
					handleOnChange={handleChange}
				/>
				<Input
					text="E-mail"
					type="email"
					name="email"
					placeholder="Digite o seu E-mail."
					handleOnChange={handleChange}
				/>
				<Input
					text="Senha"
					type="password"
					name="password"
					placeholder="Digite a sua senha."
					handleOnChange={handleChange}
				/>
				<Input
					text="Confirmação de senha"
					type="password"
					name="confirmPassword"
					placeholder="Confirme a sua senha."
					handleOnChange={handleChange}
				/>
				<input type="submit" value="Cadastrar" />
			</form>
			<p>
				Já tem uma conta? <Link to="/login">clique aqui</Link>
			</p>
		</section>
	);
}

export default Register;
