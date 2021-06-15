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

	const userData = userSnapshot.data() as unknown;
	let user = userData as UserType;
	user.createdAt = user.createdAt ? new Date(user.createdAt['seconds'] * 1000).toString() : null;
	try {
		user.id = userSnapshot.id;
	} catch (err) {
		console.error('deu merda', err);
	}
	return user;
};

const obtainCurrentCandidate = async (id: string): Promise<CandidateType> => {
	let currentCandidate: CandidateType = null;
	const db = firebaseAdmin.firestore();
	const voteRef = db.collection('votes').doc(id);
	const voteSnapshotDoc = await voteRef.get();

	if (voteSnapshotDoc.exists) {
		const voteData = voteSnapshotDoc.data() as VoteType;
		voteData.id = voteSnapshotDoc.id;
		currentCandidate = voteData.candidate;
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
