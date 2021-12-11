/* eslint-disable no-unused-vars */
import axios from '../utils/axios';

import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import useFlashMessage from './useFlashMessage';

export default function useAuth() {
	const { setFlashMessage } = useFlashMessage();
	const [ authenticated, setAuthenticated ] = useState(false);
	const history = useHistory();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
			setAuthenticated(true);
		}
	}, []);

	async function register(user) {
		let msgText = 'Cadastro realizado com sucesso!';
		let msgType = 'success';
	
		try {
			const data = await axios.post('/users/register', user)
				.then((response) => {
					return response.data;
				});

			await authUser(data);
		} catch (msg) {
			msgText = msg.response.data;
			msgType = 'error';
		}

		setFlashMessage(msgText, msgType);

	}

	async function login(user) {
		let msgText = 'Login realizado com sucesso!';
		let msgType = 'success';

		try {
			const data = await axios.post('users/login', user)
				.then((response) => {
					return response.data;
				});
			
			await authUser(data);
		} catch (msg) {
			msgText = msg.response.data;
			msgType = 'error';
		}

		setFlashMessage(msgText, msgType);
	}

	async function authUser(data) {

		setAuthenticated(true); 
		
		localStorage.setItem('token', JSON.stringify(data.token));
		history.push('/');
	}

	function logout() {
		const msgText = 'Logout realizado com sucesso!';
		const msgType = 'success';

		setAuthenticated(false);
		localStorage.removeItem('token');
		axios.defaults.headers.Authorization = undefined;
		history.push('/');

		setFlashMessage(msgText, msgType);
	}

	return { register, authenticated, logout, login };
}
