import { CandidateType } from './CandidateType';
import { UserType } from './UserType';

export type VoteType = {
	id: string;
	candidate: CandidateType;
	user: UserType;
};
