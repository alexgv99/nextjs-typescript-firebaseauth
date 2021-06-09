import { Fragment, useContext, useEffect, useState } from 'react';

import { formatWithOptions } from 'date-fns/fp';
import { ptBR } from 'date-fns/locale';
import { useRouter } from 'next/router';

import { BackButton } from '../components/back';
import ResultComponent from '../components/result';
import { ElectionContext } from '../contexts/election';
import styles from '../styles/Voters.module.scss';

const dayFormatter = formatWithOptions({ locale: ptBR }, 'dd/MM/yyyy');
const timeFormatter = formatWithOptions({ locale: ptBR }, 'HH:mm');

const VotersPage = () => {
	const router = useRouter();
	const { user, votes } = useContext(ElectionContext);
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
						id: vote.user.id,
						time,
						name: vote.user.name,
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
			{user?.admin ? (
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
					<ResultComponent />
				</>
			) : (
				<>
					<h1 className={styles.error}>You're not allowed here.</h1>
					<BackButton />
				</>
			)}
		</div>
	);
};

export default VotersPage;
