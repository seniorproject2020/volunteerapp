import * as React from 'react';
import Register from './components/Register/Register';

class App extends React.Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			name: null
		};
	}

	async componentDidMount() {
		try {
			const r = await fetch('/api/hello');
			const name = await r.json();
			this.setState({ name });
		} catch (error) {
			console.log(error);
		}
	}

	render() {
		return (
			<main className="container my-5">
				<h1 className="text-primary text-center">Hello {this.state.name}!</h1>
				<Register/>
			</main>
		);
	}
}

export interface AppProps {}

export interface AppState {
	name: string;
}

export default App;
