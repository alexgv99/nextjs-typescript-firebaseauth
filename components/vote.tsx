import React, { useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../firebase/clientApp';
import styles from '../styles/Vote.module.css';
import candidates from '../public/candidates.json';

const VoteComponent = () => {
	const [user, loading, error] = useAuthState(firebase.auth());
	const db = useRef(firebase.firestore());

	const setVote = (candidate: string) => {
		db.current
			.collection('votes')
			.doc(user.uid)
			.set({
				candidate: candidates.find((cand) => cand.id === candidate),
				user: {
					uid: user.uid,
					name: user.displayName,
					email: user.email,
				},
			});
	};

	return (
		<>
			{user && <h3>You can {'vote'}</h3>}
			<div className={styles.container}>
				{candidates.map((cand) => (
					<div key={cand.id} className={styles.candidate}>
						<img width="100" src={cand.avatar} onClick={() => (user ? setVote(cand.id) : null)} />
						<h3>{cand.alias}</h3>
					</div>
				))}
			</div>
		</>
	);
};

export default VoteComponent;
