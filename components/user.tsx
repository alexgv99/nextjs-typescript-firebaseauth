import React from 'react';

import LoginButton from 'components/loginButton';
import LogoutButton from 'components/logout';
import VotersButton from 'components/votersButton';

import styles from 'styles/User.module.scss';

import { CandidateType } from 'types/CandidateType';
import { UserType } from 'types/UserType';

type UserComponentPropsType = {
	user: UserType;
	currentCandidate: CandidateType;
};

export default function UserComponent({ user, currentCandidate }: UserComponentPropsType) {
	return (
		<>
			{!user && <LoginButton />}
			{user && (
				<div className={styles.container}>
					<div className={styles.background}>&nbsp;</div>
					<div className={styles.user}>
						<div className={styles.one}>
							<img width="100" src={user.photoURL} />
						</div>
						<div className={styles.two}>
							<h3>Hello {user.name}</h3>
							{currentCandidate && (
								<span>
									Your current vote is for <i className={styles.candidate}>{currentCandidate.name}</i>
								</span>
							)}
							<div className={styles.toolbar}>
								<LogoutButton />
								{!!user.admin && <VotersButton />}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
