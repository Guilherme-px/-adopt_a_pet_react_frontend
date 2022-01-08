import { useState } from 'react';
import { useHistory } from 'react-router-dom';

/* styles */
import styles from './AddPet.module.css';

/* utils */
import axios from '../../../utils/axios';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';
import PetForm from '../../form/PetForm';

function AddPet() {
	const [token] = useState(localStorage.getItem('token') || '');
	const { setFlashMessage } = useFlashMessage();
	const history = useHistory();

	async function registerPet(pet) {
		let msgType = 'success';

		const formData = new FormData();

		const petFormData = await Object.keys(pet).forEach((key) => {
			if (key === 'images') {
				for (let i = 0; i < pet[key].length; i++) {
					formData.append('images', pet[key][i]);
				}
			} else {
				formData.append(key, pet[key]);
			}
		});

		formData.append('pet', petFormData);

		const data = await axios
			.post('pets/create', formData, {
				headers: {
					Authorization: `Bearer ${JSON.parse(token)}`,
					'Content-Type': 'multipart/form-data',
				},
			})
			.then((response) => {
				return response.data;
			})
			.catch((msg) => {
				msgType = 'error';
				return msg.response.data;
			});

		setFlashMessage(data, msgType);

		if (msgType !== 'error') {
			history.push('/pets/mypets');
		}
	}

	return (
		<section className={styles.addpet_header}>
			<div>
				<h1>Cadastre um pet para adoção</h1>
			</div>
			<PetForm handleSubmit={registerPet} btnText='Cadastrar Pet' />
		</section>
	);
}

export default AddPet;