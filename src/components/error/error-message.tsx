import React from "react";
import styles from './error-message.module.css';

type TMessage = {
	text:string;
}

const ErrorMessage: React.FC<TMessage>= ({text}) => {
	return (
		<div className={styles.notification}>
			{text}
		</div>
	);
};

export default ErrorMessage;