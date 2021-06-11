import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const clientCredentials = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
	projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	sorageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
	messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_IR,
	appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
	firebase.initializeApp(clientCredentials);
	firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

export { firebase as firebaseClient };