import Link from 'next/link';
import Image from 'next/image';
import { ReactComponent as Arrow } from '../public/icons/arrow.svg';

export function BackButton() {
	return (
		<Link href="/">
			<a className="flex">
				<div className="link">
					<Arrow width={20} height={20} /> Back
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
						padding: 10px;
						border: 1px solid black;
						border-radius: 15px;
					}
				`}</style>
			</a>
		</Link>
	);
}
