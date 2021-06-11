import Image from 'next/image';
import Link from 'next/link';

export default function VotersButton() {
	return (
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
	);
}
