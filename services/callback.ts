import { firebaseAdmin } from 'firebase/admin';
import { v4 as uuid } from 'uuid';
import { xml2json } from 'xml-js';

const receiveUpdate = async (xml: string): Promise<void> => {
	const db = firebaseAdmin.firestore();
	try {
		const feed = xml2json(xml, { compact: true, spaces: 2 });
		console.log(feed);
		const obj = JSON.parse(feed);
		console.log('obj: ', obj);
		await db.collection('feeds').doc(uuid()).set(obj);
	} catch (err) {
		console.log('err: ', err.message);
		await db.collection('feeds-errors').doc(uuid()).set({ message: err.message, xml });
	}
};

export { receiveUpdate };
