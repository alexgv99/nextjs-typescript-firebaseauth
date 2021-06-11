import Link from 'next/link';
import Image from 'next/image';
import { ReactComponent as Arrow } from '../public/icons/arrow.svg';

type BackButtonPropsType = {
	arrowColor?: string;
	borderColor?: string;
	textColor?: string;
};

export function BackButton({ arrowColor, borderColor, textColor }: BackButtonPropsType) {
	return (
		<Link href="/">
			<a className="flex">
				<div className="link">
					<Arrow width={20} height={20} style={arrowColor ? { color: arrowColor } : {}} />{' '}
					<span style={textColor ? { color: textColor } : {}}>Back</span>
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
						border: 1px solid ${borderColor || 'black'};
						border-radius: 15px;
					}
				`}</style>
			</a>
		</Link>
	);
}
