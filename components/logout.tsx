import Image from 'next/image';
import { firebaseClient } from 'firebase/client';

export default function LogoutButton() {
	return (
		<div className="flex" onClick={() => firebaseClient.auth().signOut()}>
			<div className="link">
				<Image src="/logout.png" width={30} height={30} /> Logout
			</div>
			<style jsx>{`
				.flex {
					margin-top: 15px;
					display: flex;
				}
				.link {
					display: flex;
					flex-direction: row;
					flex-wrap: nowrap;
					padding: 10px 20px;
					width: 130px;
					border: 1px solid lightgrey;
					border-radius: 15px;
					align-items: center;
					justify-content: space-between;
				}
			`}</style>
		</div>
	);
}
