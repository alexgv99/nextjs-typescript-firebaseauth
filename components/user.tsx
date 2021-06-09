import React, { useContext, useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from '../firebase/clientApp';
import styles from '../styles/User.module.scss';
import candidates from '../public/candidates.json';
import { CandidateType } from '../types/CandidateType';
import { ElectionContext } from '../contexts/election';

const uiConfig: firebaseui.auth.Config = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// signInSuccessUrl: '/',
	signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID, firebase.auth.GithubAuthProvider.PROVIDER_ID],
	// callbacks: {
	// 	signInSuccessWithAuthResult: (authResult) => {
	// 		console.log('authResult: ', authResult);
	// 		return true;
	// 	},
	// },
};

const UserComponent = () => {
	const { user, currentCandidate } = useContext(ElectionContext);
	return (
		<>
			{!user && (
				<div>
					<h1>Application login</h1>
					<p>Please, login:</p>
					<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			)}
			{user && (
				<div className={styles.user}>
					<img width="100" src={user.photoURL} />
					<div>
						<h3>Hello {user.name}</h3>
						{currentCandidate && <i>Your currently vote is for {currentCandidate.name}</i>}
						<div onClick={() => firebase.auth().signOut()}>logout</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserComponent;
