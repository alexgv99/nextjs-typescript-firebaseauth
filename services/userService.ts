import { firebaseAdmin } from 'firebase/admin';
import { CandidateType } from 'types/CandidateType';
import { UserType } from 'types/UserType';
import { VoteType } from 'types/VoteType';

const obtainUser = async (id: string): Promise<UserType> => {
	const db = firebaseAdmin.firestore();

	const userRef = db.collection('users').doc(id);
	const userSnapshot = await userRef.get();
	if (!userSnapshot.exists) {
		throw new Error(`User ${id} doesn't exist`);
	}
	const userData = userSnapshot as unknown;
	const user = userData as UserType;
	user.id = userSnapshot.id;
	return user;
};

const obtainCurrentCandidate = async (id: string): Promise<CandidateType> => {
	let currentCandidate: CandidateType = null;
	const db = firebaseAdmin.firestore();
	const voteRef = db.collection('votes').doc(id);
	const voteData = await voteRef.get();

	if (voteData.exists) {
		currentCandidate = (voteData as unknown as VoteType).candidate;
	}

	return currentCandidate;
};

const obtainUserNames = async (userIds: string[]): Promise<{ [key: string]: string }> => {
	const db = firebaseAdmin.firestore();

	const usersSnapshot = await db.collection('users').where('id', 'in', userIds).get();

	const userNames: { [key: string]: string } = {};
	usersSnapshot.forEach((item) => {
		const user = item.data() as UserType;
		userNames[item.id] = user.name;
	});
	return userNames;
};

export { obtainUser, obtainCurrentCandidate, obtainUserNames };
