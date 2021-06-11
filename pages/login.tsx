import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import firebase from 'firebase/clientApp';
import styles from 'styles/Login.module.scss';
import { BackButton } from 'components/backButton';

const uiConfig: firebaseui.auth.Config = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// signInSuccessUrl: '/',
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID],
	signInSuccessUrl: '/',
	callbacks: {
		signInSuccessWithAuthResult: (authResult) => {
			console.log('authResult: ', authResult);
			return true;
		},
	},
};

export default function LoginPage() {
	return (
		<div className={styles.container}>
			<div className={styles.background}>&nbsp;</div>
			<div className={styles.login}>
				<h1>You need log in to vote.</h1>
				<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				<BackButton arrowColor="white" borderColor="lightgrey" textColor="white" />
			</div>
		</div>
	);
}
