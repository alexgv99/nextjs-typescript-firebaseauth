import { Fragment, useContext, useEffect, useState } from 'react';

import { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

import { formatWithOptions } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale';
import nookies from 'nookies';

import { BackButton } from 'components/backButton';
import ResultComponent from 'components/result';

import { firebaseAdmin } from 'firebase/admin';

import { VoteType } from 'types/VoteType';
import { UserType } from 'types/UserType';

import styles from 'styles/Voters.module.scss';
import { obtainUser } from 'services/userService';
import { obtainVotes } from 'services/voteService';
import { obtainResult } from 'services/resultService';

const dayFormatter = formatWithOptions({ locale: ptBR }, 'dd/MM/yyyy');
const timeFormatter = formatWithOptions({ locale: ptBR }, 'HH:mm');

type VotesPagePropsType = {
	votes: VoteType[];
	userNames: { [key: string]: string };
	result: unknown;
};

const VotersPage = ({ votes, userNames, result }: VotesPagePropsType) => {
	const router = useRouter();
	const [votesByDate, setVotesByDate] = useState({});

	useEffect(() => {
		if (votes?.length > 0) {
			setVotesByDate(
				votes.reduce((acc, vote) => {
					const date = new Date(vote.date);
					const day = dayFormatter(date);
					const time = timeFormatter(date);
					const key = `dia ${day}`;
					if (!acc[key]) {
						acc[key] = [];
					}
					const newVote = {
						id: vote.id,
						time,
						name: userNames[vote.id],
						candidate: vote.candidate.alias,
					};
					acc[key].push(newVote);
					return acc;
				}, {})
			);
		}
	}, [votes]);

	return (
		<div className={styles.container}>
			<>
				<div className={styles.list}>
					<BackButton />
					<table>
						{Object.keys(votesByDate).map((key) => (
							<Fragment key={key}>
								<thead>
									<tr key={key}>
										<th></th>
										<th>
											<span className={styles.date}>{key}</span>
										</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									{votesByDate[key].map((vote) => (
										<tr key={vote.id}>
											<td className={styles.time}>{vote.time}</td>
											<td className={styles.name}>{vote.name}</td>
											<td className={styles.candidate}>{vote.candidate}</td>
										</tr>
									))}
								</tbody>
							</Fragment>
						))}
					</table>
				</div>
				<ResultComponent result={result} />
			</>
		</div>
	);
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	try {
		const cookies = nookies.get(ctx);

		// the user is authenticated! (authentication, controle by firebase.auth)
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		const { uid } = token;

		const user: UserType = await obtainUser(uid);

		// only admin users can access this page (authorization, controlled by your application)
		if (!user.admin) {
			throw new Error('User is not admin');
		}

		const votes = await obtainVotes();

		const userIds = votes.map((vote) => vote.id);
		const userNames = null;

		const result = await obtainResult(votes);

		return {
			props: { votes, userNames, result },
		};
	} catch (err) {
		// either the `token` cookie didn't exist
		// or token verification failed
		// or user is not admin
		// either way: redirect to the home page
		ctx.res.writeHead(302, { Location: '/' });
		ctx.res.end();

		// `as never` prevents inference issues
		// with InferGetServerSidePropsType.
		// The props returned here don't matter because we've
		// already redirected the user.
		return { props: {} as never };
	}
};

export default VotersPage;
