import Head from 'next/head';
import styles from '../styles/Home.module.scss';
import UserComponent from '../components/user';
import VoteComponent from '../components/vote';
import ResultComponent from '../components/result';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>Brazilian election</title>
				<meta name="description" content="please, be smart..." />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<div className={styles.title}>Brazilian election</div>

				<VoteComponent />

				<ResultComponent />

				<UserComponent />
			</main>
		</div>
	);
}
