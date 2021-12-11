import styles from './Input.module.scss';

function Select({ name, options, handleOnChange, color, category }) {
	return (
		<div className={styles.form_control}>
			<select name={name} id={name} onChange={handleOnChange} value={color && category}>
				<option>Selecione uma opção</option>
				{options.map(option => 
					<option value={option} key={option}>
						{option}
					</option>
				)}
			</select>
		</div>
	);
}

export default Select;