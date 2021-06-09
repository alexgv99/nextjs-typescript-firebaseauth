import { useContext, useRef, useState } from 'react';
import { omit } from 'lodash';

import { ElectionContext } from '../contexts/election';
import firebase from '../firebase/clientApp';
import candidates from '../public/candidates.json';
import styles from '../styles/Vote.module.scss';
import { VoteType } from '../types/VoteType';

const VoteComponent = () => {
	const { user, currentCandidate } = useContext(ElectionContext);
	const [errorMessage, setErrorMessage] = useState(null);

	const db = useRef(firebase.firestore());

	const saveVote = (candidate: string) => {
		const vote: VoteType = {
			id: user.id,
			candidate: candidates.find((cand) => cand.id === candidate),
			date: new Date(),
			user: null,
		};
		db.current
			.collection('votes')
			.doc(user.id)
			.set(omit(vote, ['id', 'user']));
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
						className={currentCandidate?.id === cand.id ? styles.selectedCandidate : styles.candidate}
						onClick={() => (user ? vote(cand.id) : cantVoteSignedOut())}
					>
						<img width="100" src={cand.avatar} />
						<h3>{cand.alias}</h3>
					</div>
				))}
			</div>
		</div>
	);
};

export default VoteComponent;
