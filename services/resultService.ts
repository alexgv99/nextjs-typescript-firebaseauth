import { VoteType } from 'types/VoteType';
import { obtainVotes } from './voteService';

const obtainResult = async (votes?: VoteType[]) => {
	const result = {};
	votes = votes || (await obtainVotes());
	votes.forEach((vote) => {
		if (!result[vote.candidate.id]) {
			result[vote.candidate.id] = 0;
		}
		result[vote.candidate.id] += 1;
	});
	return result;
};

export { obtainResult };
