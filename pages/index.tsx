import Head from 'next/head';

import { GetServerSidePropsContext } from 'next';

import nookies from 'nookies';

import UserComponent from 'components/user';
import VoteComponent from 'components/vote';
import ResultComponent from 'components/result';

import { firebaseAdmin } from 'firebase/admin';

import { obtainUser, obtainCurrentCandidate } from 'services/userService';

import styles from 'styles/Home.module.scss';

import { UserType } from 'types/UserType';
import { CandidateType } from 'types/CandidateType';
import { obtainResult } from 'services/resultService';

type HomePropsType = {
	user: UserType;
	currentCandidate: CandidateType;
	result: {
		[key: string]: string;
	};
};

function Home({ user, currentCandidate, result }: HomePropsType) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Brazilian election</title>
				<meta name="description" content="please, be smart..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.title}>Brazilian election</div>

				<VoteComponent selectedCandidateId={currentCandidate?.id} />

				{!!currentCandidate && <ResultComponent result={result} />}

				<UserComponent user={user} currentCandidate={currentCandidate} />
			</main>
		</div>
	);
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
	let props = {
		user: null,
		currentCandidate: null,
		result: null,
	};
	try {
		const cookies = nookies.get(ctx);
		// the user is authenticated! (authentication, controled by firebase.auth)
		const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);

		const { uid } = token;

		const user: UserType = await obtainUser(uid);

		const currentCandidate = (await obtainCurrentCandidate(uid)) || null;

		const result = await obtainResult();

		props = { user, currentCandidate, result };

		return { props };
	} catch (err) {
		console.error('err', err.message);
		// either the `token` cookie didn't exist
		// or token verification failed
		// or user is not admin
		// either way: redirect to the home page
		// ctx.res.writeHead(302, { Location: '/' });
		// ctx.res.end();

		// `as never` prevents inference issues
		// with InferGetServerSidePropsType.
		// The props returned here don't matter because we've
		// already redirected the user.
		// return { props: {} as never };
	}
	return { props };
};

export default Home;
