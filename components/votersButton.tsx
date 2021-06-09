import Image from 'next/image';
import { useContext } from 'react';
import Link from 'next/link';

import { ElectionContext } from '../contexts/election';
import firebase from '../firebase/clientApp';

export default function VotersButton() {
	const { user } = useContext(ElectionContext);
	return user.admin ? (
		<Link href="/voters">
			<a className="flex">
				<div className="link">
					Voters <Image src="/voters.png" width={30} height={30} />
				</div>
				<style jsx>{`
					.flex {
						margin-top: 15px;
						display: flex;
					}
					.link {
						display: flex;
						gap: 10px;
						flex-direction: row;
						flex-wrap: nowrap;
						padding: 10px 25px;
						border: 1px solid lightgrey;
						border-radius: 15px;
						align-items: center;
					}
				`}</style>
			</a>
		</Link>
	) : null;
}
