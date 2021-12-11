/* eslint-disable react/prop-types */
import styles from './Input.module.scss';

function Input({
	type,
	text,
	name,
	placeholder,
	handleOnChange,
	value,
	multiple,
}) {
	return (
		<div className={styles.form_control}>
			<input
				type={type}
				name={name}
				id={name}
				placeholder={placeholder}
				onChange={handleOnChange}
				value={value}
				{...(multiple ? { multiple } : '')}
			/>
			<label htmlFor={name}>{text}:</label>
		</div>
	);
}

export default Input;
