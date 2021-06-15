import { NextApiRequest, NextApiResponse } from 'next';
import { receiveUpdate } from 'services/callback';

export default (req: NextApiRequest, res: NextApiResponse) => {
	const xml = req.body;

	console.log('xml: ', xml);

	receiveUpdate(xml);

	res.status(200).json({ message: xml });
};
