import firebaseClient from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_IR,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== 'undefined' && !firebaseClient.apps.length) {
	firebaseClient.initializeApp(clientCredentials);
	firebaseClient.auth().setPersistence(firebaseClient.auth.Auth.Persistence.SESSION);
	(window as any).firebase = firebaseClient;
}

export { firebaseClient };
