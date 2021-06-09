import React, { cloneElement, useContext, useEffect, useRef, useState } from 'react';
import { Chart } from 'react-google-charts';
import { ElectionContext } from '../contexts/election';
import candidates from '../public/candidates.json';
import styles from '../styles/Result.module.scss';

const ResultComponent = () => {
	const { result, currentCandidate } = useContext(ElectionContext);
	const total = useRef(0);
	const [data, setData] = useState([]);

	useEffect(() => {
		if (!result) {
			setData([]);
		}
		total.current = Object.keys(result || {}).reduce((acc, key) => acc + result[key], 0);
		if (total.current > 0) {
			const dataAux = candidates.map((candidate) => [
				`${candidate.name} (${candidate.alias}): ${result[candidate.id]}`,
				result[candidate.id] || 0,
			]);
			setData([['Candidate', 'Votes'], ...dataAux]);
		}
	}, [result]);

	return total.current > 0 && currentCandidate ? (
		<div className={styles.container}>
			<Chart
				width={'500px'}
				height={'300px'}
				chartType="PieChart"
				loader={<div>Loading Chart</div>}
				data={data}
				className={styles.chart}
				options={{
					title: 'Partials',
					is3D: true,
					pieSliceText: 'value',
				}}
				rootProps={{ 'data-testid': '2' }}
			/>{' '}
		</div>
	) : null;
};

export default ResultComponent;
