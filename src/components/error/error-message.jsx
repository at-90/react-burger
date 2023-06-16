import styles from './error-message.module.css'

const ErrorMessage = ({text}) => {
	return (
		<div className={styles.notification}>
			{text}
		</div>
	);
};

export default ErrorMessage;