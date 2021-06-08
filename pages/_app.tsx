import { ElectionProvider } from '../contexts/election';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<ElectionProvider>
			<Component {...pageProps} />
		</ElectionProvider>
	);
}

export default MyApp;
