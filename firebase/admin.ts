import * as firebaseAdmin from 'firebase-admin';

// get this JSON from the Firebase board
// you can also store the values in environment variables
// import serviceAccount from '~/Dropbox/secrets/nextjs-typescript-firebaseauth-firebase-adminsdk-65mf7-4a0771ad17.json';

const privateKey = process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY;
const clientEmail = process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

if (!privateKey || !clientEmail || !projectId) {
	console.error(`Failed to load Firebase credentials.`);
}

if (!firebaseAdmin.apps.length) {
	firebaseAdmin.initializeApp({
		credential: firebaseAdmin.credential.cert({ privateKey, clientEmail, projectId }),
		databaseURL: 'https://YOUR_PROJECT_ID.firebaseio.com',
	});
}

export { firebaseAdmin };
