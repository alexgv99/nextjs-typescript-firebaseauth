import { createContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection, useCollectionData } from 'react-firebase-hooks/firestore';

import firebase from '../firebase/clientApp';
import { CandidateType } from '../types/CandidateType';
import { UserType } from '../types/UserType';
import { VoteType } from '../types/VoteType';

type ElectionContextType = {
	user: UserType;
	votes: VoteType[];
	currentCandidate: CandidateType;
	result: any;
};

export const ElectionContext = createContext({} as ElectionContextType);

export function ElectionProvider({ children }) {
	const [votes, votesLoading, votesError] = useCollectionData(firebase.firestore().collection('votes'), {});
	const [user, loading, error] = useAuthState(firebase.auth());
	const [result, setResult] = useState(null);
	const [currentCandidate, setCurrentCandidate] = useState<CandidateType>(null);

	useEffect(() => {
		if (votes) {
			if (!user) {
				setResult(null);
			} else {
				const result = {};
				votes.forEach((vote) => {
					const { id, alias, name, avatar } = vote.candidate;
					if (user.uid === vote.id) {
						setCurrentCandidate({ id, alias, name, avatar });
					}
					if (!result[vote.candidate.id]) {
						result[vote.candidate.id] = 0;
					}
					result[vote.candidate.id] += 1;
				});
				setResult(result);
			}
		}
	}, [votes, user]);

	return (
		<ElectionContext.Provider
			value={{
				user,
				votes: (votes || []).map((vote) => ({ id: vote.id, candidate: vote.candidate, user: vote.user })),
				currentCandidate,
				result,
			}}
		>
			{children}
		</ElectionContext.Provider>
	);
}
