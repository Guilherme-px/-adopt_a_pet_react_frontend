import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
/* utils */
import axios from '../../../utils/axios';

import RoundedImage from '../../layout/RoundedImage';

/* hooks */
import useFlashMessage from '../../../hooks/useFlashMessage';

/* css */
import styles from './Dashbord.module.css';

function MyPets() {
	const [ pets, setPets ] = useState([]);
	const { setFlashMessage } = useFlashMessage();
	const [ token ] = useState(localStorage.getItem('token') || '');

	useEffect(() => {
		axios.get('/pets/mypets', {
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`
			},
		})
			.then((response) => {
				setPets(response.data.pets);
			});
	}, [ token ]);
	
	async function removePet(id) {
		let msgType = 'success';

		const data = await axios.delete(`/pets/${id}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`
			},
		}).then((response) => {
			const updatedPets = pets.filter((pet) => pet._id !== id);
			setPets(updatedPets);
			return response.data;
		})
			.catch((msg) => {
				msgType = 'error';
				return msg.response.data;
			});

		setFlashMessage(data, msgType);
	}

	async function concludeAdoption(id) {
		let msgType = 'success';

		const data = await axios.patch(`/pets/conclude/${id}`, {
			headers: {
				Authorization: `Bearer ${JSON.parse(token)}`
			}
		})
			.then((response) => {
				return response.data;
			}).catch((msg) => {
				msgType = 'error';
				return msg.response.data;
			});
		
		setFlashMessage(data, msgType);
	}

	return (
		<section>
			<div className={styles.petlist_header}>
				<h1>My Pet</h1>
				<Link to='/pet/add'>Cadastrar pets</Link>
			</div>
			<div className={styles.petlist_container}>
				{pets.length > 0 && 
					pets.map((pet) => (
						<div key={pet._id} className={styles.petlist_row}>
							<RoundedImage
								src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`}
								alt={pet.name}
								width='px75'
							/>
							<span className='bold'>{pet.name}</span>
							<div className={styles.actions}>
								{pet.available ?
									(<>
										{pet.adopter && (
											<button className={styles.conclude_btn}
												onClick={() => {
													concludeAdoption(pet._id);
												}}
											>
												Concluir adoção
											</button>
										)}
										<Link to={`/pet/edit/${pet._id}`}>Editar</Link>
										<button onClick={() => {
											removePet(pet._id);
										}}>Excluir</button>
									</>)
									: <p>Pet já adotado</p>}
							</div>
						</div>
					))
				}
				{pets.length === 0 && <p>Nenhum pet cadastrados</p>}
			</div>
		</section>
	);
}

export default MyPets;