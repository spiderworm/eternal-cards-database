
const imagePreloader = {
	_queue: [],
	_current: [],
	_done: [],
	max: 3,
	contains: function(url) {
		return this._queue.includes(url) || this._done.includes(url) || this._current.includes(url);
	},
	enqueue: function(url) {
		if (!this.contains(url)) {
			this._queue.push(url);
			this._loadNext();
		}
	},
	prioritize: function(url) {
		if (!this.contains(url)) {
			this.enqueue(url);
		}
		const i = this._queue.indexOf(url);
		if (i > 0) {
			this._queue.splice(i, 1);
			this._queue.unshift(url);
		}
	},
	_loadNext: function() {
		if (this._queue.length > 0 && this._current.length < this.max) {
			const url = this._queue.shift();
			this._current.push(url);
			const img = document.createElement('img');
			img.onload = () => {
				const i = this._current.indexOf(url);
				if (i >= 0) {
					this._current.splice(i, 1);
				}
				if (!this._done.includes(url)) {
					this._done.push(url);
				}
				this._loadNext();
			};
			img.src = url;
			this._loadNext();
		}
	}
};

export default imagePreloader;
