import { firebaseAdmin } from 'firebase/admin';
import { CandidateType } from 'types/CandidateType';
import { UserType } from 'types/UserType';
import { VoteType } from 'types/VoteType';

// const obtainVote = async ({ id }: { id: string }): Promise<VoteType> => {
// 	const db = firebaseAdmin.firestore();
// 	const voteRef = db.collection('votes').doc(id);
// 	const voteSnapshot = await voteRef.get();

// 	if (!voteSnapshot.exists) {
// 		throw new Error(`Vote ${id} doesn't exist`);
// 	}

// 	const voteData = voteSnapshot as unknown;
// 	const vote = voteData as VoteType;
// 	vote.id = voteSnapshot.id;
// 	return vote;
// };

const obtainVotes = async () => {
	const db = firebaseAdmin.firestore();
	const votesSnapshot = await db.collection('votes').get();

	const votes: VoteType[] = [];
	votesSnapshot.forEach((item) => {
		const vote = item.data() as VoteType;
		vote.id = item.id;
		votes.push(vote);
	});
	return votes;
};

const saveVote = async (candidate: string) => {
	const db = firebaseAdmin.firestore();
	// db.collection('votes')
	// 	.doc(user.uid)
	// 	.set({
	// 		candidate: candidates.find((cand) => cand.id === candidate),
	// 		date: new Date(),
	// 	});
};

export { obtainVotes };
