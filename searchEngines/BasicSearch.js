
function BasicSearch(db) {
	const search = (rawTerm) => {
		const results = [];
		if (!rawTerm || rawTerm.length == 0) {
			return results;
		}

		const term = rawTerm.toLowerCase();

		const ranked = {
			nameStarts: [],
			type: [],
			name: [],
			text: [],
			misc: []
		};

		db._all.forEach(card => {
			try {
				let i = card.name.toLowerCase().indexOf(term);
				if (i === 0) {
					return ranked.nameStarts.push(card);
				} else if (i > 0) {
					return ranked.name.push(card);
				}

				if (card.type.toLowerCase().indexOf(term) >= 0) {
					return ranked.type.push(card);
				}

				if (card.text) {
					if (card.text.toLowerCase().indexOf(term) >= 0) {
						return ranked.text.push(card);
					}
				}

				if (card.influence.toLowerCase().indexOf(term) >= 0) {
					return ranked.misc.push(card);
				}

			} catch(e) {
				console.error('couldn\'t search on card:', card);
				console.error(e);
			}
		});

		[ranked.nameStarts, ranked.type, ranked.name, ranked.text, ranked.misc].forEach(bucket => {
			bucket.forEach(card => {
				if (!results.includes(card)) {
					results.push(card);
				}
			});
		});

		return results;
	};

	return search;
}

BasicSearch.create = function(db) {
	return new BasicSearch(db);
};

module.exports = BasicSearch;
