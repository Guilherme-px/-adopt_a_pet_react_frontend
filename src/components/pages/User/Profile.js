import axios from '../../../utils/axios';

import Input from '../../form/Input';

import { useState, useEffect } from 'react';

import style from './Profile.module.css';
import formStyles from '../../form/Form.module.css';
import RoundedImage from '../../layout/RoundedImage';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

function Profile() {
	const [ token ] = useState(localStorage.getItem('token') || '');
	const [ user, setUser ] = useState({});
	const { setFlashMessage } = useFlashMessage();
	const [preview, setPreview] = useState();
	
	useEffect(() => {
		axios.get('/users/checkuser', {
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`
			},
		}).then((response) => {
			setUser(response.data);
		});
	}, [token]);

	function onFileChange(e) {
		setPreview(e.target.files[0]);
		setUser({ ...user, [ e.target.name ]: e.target.files[ 0 ] });
	}
	
	function handleChange(e) {
		setUser({ ...user, [ e.target.name]: e.target.value });
	}
	
	async function handleSubmit(e) {
		e.preventDefault();
		
		let msgtype = 'success';
		
		const formData = new FormData();

		await Object.keys(user).forEach((key) =>
			formData.append(key, user[key]),
		);
		
		const data = await axios.patch(`/users/edit/${user._id}`, formData, {
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`,
				'Content-Type': 'multipart/form-data'
			},
		}).then((response) => {
			return response.data;
		}).catch((msg) => {
			msgtype = 'error';
			return msg.response.data;
		});
		
		setFlashMessage(data.msg, msgtype);
	}
	
	return (
		<section>
			<div className={style.profile_header}>
				<h1>User dashbord</h1>
			</div>
			<form className={formStyles.form_container} onSubmit={handleSubmit}>
				{(user.image || preview) && (
					<RoundedImage
						src={
							preview
								? URL.createObjectURL(preview)
								: `${process.env.REACT_APP_API}/images/users/${user.image}`
						}
						alt={user.name}
					/>
				)}
				<Input
					text='imagem'
					type='file'
					name='image'
					handleOnChange={onFileChange}
				/>
				<Input
					text='E-mail'
					type='email'
					name='email'
					placeholder='Digite o seu email'
					handleOnChange={handleChange}
					value={ user.email || '' }
				/>
				<Input
					text='Name'
					type='name'
					name='name'
					placeholder='Digite o seu nome'
					handleOnChange={handleChange}
					value={ user.name || '' }
				/>
				<Input
					text='Phone'
					type='phone'
					name='phone'
					placeholder='Digite o seu telefone'
					handleOnChange={handleChange}
					value={ user.phone || '' }
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
				<input type="submit" value='Editar' />
			</form>
		</section>
	);
}

export default Profile;