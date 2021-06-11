import { createContext, useEffect, useRef, useState } from 'react';

import { omit } from 'lodash';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';

import { firebaseClient } from 'firebase/client';
import { CandidateType } from 'types/CandidateType';
import { UserType } from 'types/UserType';
import { VoteType } from 'types/VoteType';

type ElectionContextType = {
	user: UserType;
	votes: VoteType[];
	currentCandidate: CandidateType;
	result: any;
};

const initialState: ElectionContextType = {
	user: null,
	votes: [],
	currentCandidate: null,
	result: null,
};

export const ElectionContext = createContext({} as ElectionContextType);

export function ElectionProvider({ children }) {
	const db = useRef(firebaseClient.firestore());
	const [userAuth] = useAuthState(firebaseClient.auth());
	const [votesCollection] = useCollection(firebaseClient.firestore().collection('votes'), {});
	const [electionContext, setElectionContext] = useState<ElectionContextType>(initialState);

	useEffect(() => {
		if (userAuth) {
			const findUser = async () => {
				const userRef = db.current.collection('users').doc(userAuth.uid);
				const userItem = await userRef.get();

				if (userItem.exists) {
					const user: UserType = userItem.data() as UserType;
					user.id = userItem.id;
					// and update because we have two new fields since start of the project
					let update = false;
					if (!user.photoURL) {
						user.photoURL = userAuth.photoURL;
						update = true;
					}
					if (!user.createdAt) {
						user.createdAt = new Date();
						update = true;
					}
					if (update) {
						db.current
							.collection('users')
							.doc(userAuth.uid)
							.set(omit(user, ['id']));
					}
					setElectionContext((old) => ({ ...old, user }));
				} else {
					const user: UserType = {
						id: userAuth.uid,
						name: userAuth.displayName,
						email: userAuth.email,
						photoURL: userAuth.photoURL,
						createdAt: new Date(),
					};
					// save user
					db.current
						.collection('users')
						.doc(userAuth.uid)
						.set({ name: user.name, email: user.email, photoURL: user.photoURL, createdAt: user.createdAt });
					setElectionContext((old) => ({ ...old, user }));
				}
			};
			if (userAuth) {
				findUser();
			} else {
				setElectionContext((old) => ({ ...old, user: null }));
			}
		} else {
			setElectionContext((old) => ({ ...old, user: null }));
		}
	}, [userAuth]);

	useEffect(() => {
		const findUser = async (id: string) => {
			const userRef = db.current.collection('users').doc(id);
			const userItem = await userRef.get();
			if (userItem.exists) {
				const user: UserType = userItem.data() as UserType;
				user.id = userItem.id;
				return user;
			}
			return null;
		};
		const retrieveVotes = async () => {
			const votes = [];
			const usersIds = [];
			const users: UserType[] = [];

			votesCollection.forEach((item) => {
				usersIds.push(item.id);
			});

			for (let id of usersIds) {
				const user = await findUser(id);
				users.push(user);
			}

			votesCollection.forEach((item) => {
				const vote = item.data();
				vote['id'] = item.id;
				vote.date = vote.date ? new Date(vote.date.seconds * 1000) : null;
				vote.user = users.find((u) => u.id === item.id);
				votes.push(vote);
			});

			setElectionContext((old) => ({ ...old, votes: votes.sort((v1, v2) => (v1.date > v2.date ? 1 : -1)) }));
		};

		if (votesCollection && electionContext.user) {
			retrieveVotes();
		} else {
			setElectionContext((old) => ({ ...old, votes: null }));
		}
	}, [votesCollection, electionContext.user]);

	useEffect(() => {
		if (electionContext.votes) {
			if (electionContext.user) {
				const result = {};
				const newContext = { ...electionContext, currentCandidate: null };
				electionContext.votes.forEach((vote) => {
					if (electionContext.user.id === vote.id) {
						newContext.currentCandidate = vote.candidate;
					}
					if (!result[vote.candidate.id]) {
						result[vote.candidate.id] = 0;
					}
					result[vote.candidate.id] += 1;
				});
				newContext.result = result;
				setElectionContext(newContext);
			} else {
				setElectionContext((old) => ({ ...old, result: null, currentCandidate: null }));
			}
		}
	}, [electionContext.votes, electionContext.user]);

	return <ElectionContext.Provider value={electionContext}>{children}</ElectionContext.Provider>;
}
