import { useRef, useState } from 'react';

import { omit } from 'lodash';

import { firebaseClient } from 'firebase/client';

import candidates from 'public/candidates.json';

import styles from 'styles/Vote.module.scss';

import { useAuth } from 'contexts/auth';

type VoteComponentPropsType = {
	selectedCandidateId: string;
};

export default function VoteComponent({ selectedCandidateId }: VoteComponentPropsType) {
	const [errorMessage, setErrorMessage] = useState(null);
	const { user } = useAuth();

	const db = useRef(firebaseClient.firestore());

	const saveVote = (candidate: string) => {
		db.current
			.collection('votes')
			.doc(user.uid)
			.set({
				candidate: candidates.find((cand) => cand.id === candidate),
				date: new Date(),
			});
	};

	const vote = (candId: string) => {
		setErrorMessage(null);
		saveVote(candId);
	};

	const cantVoteSignedOut = () => {
		setErrorMessage('You have to signin to vote');
		setTimeout(() => {
			setErrorMessage(null);
		}, 3000);
	};

	return (
		<div className={styles.externalContainer}>
			{user && <h2>Candidates</h2>}
			{errorMessage && <h2>{errorMessage}</h2>}
			<div className={styles.container}>
				{candidates.map((cand) => (
					<div
						key={cand.id}
						className={selectedCandidateId === cand.id ? styles.selectedCandidate : styles.candidate}
						onClick={() => (user ? vote(cand.id) : cantVoteSignedOut())}
					>
						<img width="100" src={cand.avatar} />
						<h3>{cand.alias}</h3>
					</div>
				))}
			</div>
		</div>
	);
}
