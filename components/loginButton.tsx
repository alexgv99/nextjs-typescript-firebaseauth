import Image from 'next/image';
import Link from 'next/link';

export default function LoginButton() {
	return (
		<Link href="/login">
			<a className="flex">
				<div className="link">
					<Image src="/voters.png" width={30} height={30} />
					Please, login to vote
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
	);
}
