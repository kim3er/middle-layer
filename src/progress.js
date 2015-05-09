import { PubSub } from './pub_sub';

export class Progress {

	_reset() {
		this._total = 0;
		this._downloaded = 0;
	}

	constructor() {
		let self = this;

		self.event = new PubSub();

		self._total = 0;
		self._downloaded = 0;
		self._idx = Math.random().toString(36).substr(2, 5);
		self._key = `${self._idx}_progress_`;
	}

	percentage() {
		var dec = this._downloaded / this._total;

		if (isNaN(dec)) {
			return 0;
		}
		else {
			return ( this._downloaded / this._total ) * 100;
		}
	}

	add(value) {
		this._total += value;

		this.trigger('change');

		return this;
	}

	increment() {
		++this._total;

		this.trigger('change');

		return this;
	}

	decrement() {
		++this._downloaded;

		this.trigger('change');

		return this;
	}

	start() {
		this._reset();

		this.trigger('start');

		return this;
	}

	complete() {
		this._total = this._downloaded;

		this.trigger('complete');

		this._reset();

		return this;
	}

	on(eventName, listener) {
		this.event.subscribe(`${this._key}${eventName}`, listener);

		return this;
	}

	trigger(eventName) {
		this.event.publish(`${this._key}${eventName}`, { total: this._total, downloaded: this._downloaded, percentage: this.percentage() });

		return this;
	}
}
