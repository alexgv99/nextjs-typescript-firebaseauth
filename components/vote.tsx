import React, { useContext, useRef } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../firebase/clientApp';
import styles from '../styles/Vote.module.css';
import candidates from '../public/candidates.json';
import { ElectionContext } from '../contexts/election';

const VoteComponent = () => {
	const { user, currentCandidate } = useContext(ElectionContext);

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
					date: new Date(),
				},
			});
	};

	return (
		<>
			{user && <h3>Candidates</h3>}
			<div className={styles.container}>
				{candidates.map((cand) => (
					<div
						key={cand.id}
						className={currentCandidate?.id === cand.id ? styles.selectedCandidate : styles.candidate}
						onClick={() => (user ? setVote(cand.id) : null)}
					>
						<img width="100" src={cand.avatar} />
						<h3>{cand.alias}</h3>
					</div>
				))}
			</div>
		</>
	);
};

export default VoteComponent;
