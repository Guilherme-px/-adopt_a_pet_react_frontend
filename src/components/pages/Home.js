import axios from '../../utils/axios';

import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import styles from './Home.module.css';

function Home() {
	const [ pets, setPets ] = useState({});

	useEffect(() => {

		axios.get('/pets')
			.then((response) => {
				console.log(response.data.pets);
				setPets(response.data.pets);
			});

	}, []);

	return (
		<section>
			<div className={styles.pet_home_header}>
				<h1>Adopt a pet</h1>
			</div>
			<div className={styles.pet_container}>
				{pets.length > 0 && (
					pets.map((pet, index) => (
						<div key={index} className={styles.pet_card}>
							<div
								style={{
									backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[ 0 ]})`
								}}
								className={styles.pet_card_image}>
							</div>
							<h3>{pet.name}</h3>
							<p>
								<span className='bold'>Peso:</span> {pet.weight}kg
							</p>
							{pet.available ?
								(
									<Link to={`pet/${pet._id}`}>Mais detalhes</Link>
								)
								:
								(
									<p className={styles.adopted_text}>Pet já adotado</p>
								)
							}
						</div>
					))
				)}
				{pets.length === 0 && (
					<p>Não tem pets</p>
				)}
			</div>
		</section>
	);
}

export default Home;