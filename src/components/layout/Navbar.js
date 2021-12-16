import { Link } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';

import axios from '../../utils/axios';

import styles from './Navbar.module.css';

import Logo from '../../assets/img/logo.png';

/* context */
import { Context } from '../../context/UserContext';

function Navbar() {
	const { authenticated, logout } = useContext(Context);

	const [category, setCategory] = useState({});

	useEffect(() => {
		axios.get('/categories').then((response) => {
			setCategory(response.data.category);
		});
	}, []);

	return (
		<nav className={styles.navbar}>
			<div className={styles.navbar_logo}>
				<img src={Logo} alt="Get A Pet" />
				<h2>Get A Pet</h2>
			</div>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				{category.length > 0 && (
					category.map((c, index) => (
						<li key={index}>
							<Link to={`/categories/${c._id}`}>{c.name}</Link>
						</li>
					))
				)}
				{authenticated ? (
					<>
						<li>
							<Link to="/pet/mypets">My pets</Link>
						</li>
						<li>
							<Link to="/pet/myadoptions">My adoptions</Link>
						</li>
						<li>
							<Link to="/user/profile">Perfil</Link>
						</li>
						<li onClick={logout}>Sair</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Entrar</Link>
						</li>
						<li>
							<Link to="/register">Cadastrar</Link>
						</li>
					</>
				)}
			</ul>
		</nav>
	);
}

export default Navbar;
