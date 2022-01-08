import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

import useFlashMessage from '../../../hooks/useFlashMessage';

import styles from './PetDetails.module.css';

import axios from '../../../utils/axios';

function PetDetails() {
	const [ pet, setPet ] = useState({});
	const { id } = useParams();
	const { setFlashMessage } = useFlashMessage();
	const [token] = useState(localStorage.getItem('token') || '');

	useEffect(() => {
		axios.get(`/pets/${id}`)
			.then((response) => {
				setPet(response.data.pet);
			});
	}, [ id ]);
	
	async function schedule() {

		let msgType = 'success';

		const data = await axios.patch(`pets/schedule/${pet._id}`, {
			Authorization: `Bearer ${JSON.parse(token)}`
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
		<>
			{pet.name && (
				<section className={styles.pet_details_container}>
					<div className={styles.pet_details_header}>
						<h1>Mais sobre o pet: {pet.name}</h1>
						<p>Caso tenha interesse, marque uma visita para conhecê-lo</p>
					</div>
					<div className={styles.pet_images}>
						{pet.images.map((image, index) => (
							<img
								src={`${process.env.REACT_APP_API}/images/pets/${image}`}
								alt={pet.name}
								key={index}
							/>
						))}
					</div>
					<p>
						<span className='bold'>Peso: </span> {pet.weight}kg
					</p>
					<p>
						<span className='bold'>Idade: </span> {pet.age} anos
					</p>
					{token ? (
						<button onClick={schedule}>Agendar visita</button>
					) : (
						<p>Você precisa <Link to='/register'>criar uma conta</Link> para agendar uma visita!</p>
					)
					}
				</section>
			)}
		</>
	);
}

export default PetDetails;