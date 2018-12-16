import React, { Component } from 'react';
import database from './database.js';
import CardFigure from './card/CardFigure.js';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			term: '',
			results: database.search('')
		};
	}

	onChange(e) {
		this.setState({ [e.target.name]: e.target.value });
		if (e.target.name === "term") {
			this.updateResults(e.target.value);
		}
	}

	updateResults(term) {
		setTimeout(() => {
			const results = database.search(term);
			if (this.state.term === term) {
				this.setState({ results });
			}
		}, 0);
	}

	render() {
		const { term, results } = this.state;

		return (
			<div className="App">
				<header className="App-header">
					<h1>
						eternal-cards-database
					</h1>
				</header>
				<main>
					<section>
						<h1>
							search
						</h1>
						<input type="text" name="term" value={term} onChange={(e) => this.onChange(e)} />
					</section>
					<section>
						<h1>
							results
						</h1>
						{results.map(card => (
							<CardFigure card={card} key={card.imageURL} />
						))}
					</section>
				</main>
			</div>
		);
	}
}

export default App;
