var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var Progress = (function () {
	function Progress() {
		_classCallCheck(this, Progress);

		this._total = 0;
		this._downloaded = 0;
		this._idx = Math.random().toString(36).substr(2, 5);
		this._key = '' + this._idx + '_progress_';
	}

	_createClass(Progress, [{
		key: '_reset',
		value: function _reset() {
			this._total = 0;
			this._downloaded = 0;
		}
	}, {
		key: 'percentage',
		value: function percentage() {
			var dec = this._downloaded / this._total;

			if (isNaN(dec)) {
				return 0;
			} else {
				return this._downloaded / this._total * 100;
			}
		}
	}, {
		key: 'add',
		value: function add(value) {
			this._total += value;

			this.trigger('change');

			return this;
		}
	}, {
		key: 'increment',
		value: function increment() {
			++this._total;

			this.trigger('change');

			return this;
		}
	}, {
		key: 'decrement',
		value: function decrement() {
			++this._downloaded;

			this.trigger('change');

			return this;
		}
	}, {
		key: 'start',
		value: function start() {
			this._reset();

			this.trigger('start');

			return this;
		}
	}, {
		key: 'complete',
		value: function complete() {
			this._total = this._downloaded;

			this.trigger('complete');

			this._reset();

			return this;
		}
	}, {
		key: 'on',
		value: function on(eventName, listener) {
			events.subscribe('' + this._key + '' + eventName, listener);

			return this;
		}
	}, {
		key: 'trigger',
		value: function trigger(eventName) {
			events.publish('' + this._key + '' + eventName, { total: this._total, downloaded: this._downloaded, percentage: this.percentage() });

			return this;
		}
	}]);

	return Progress;
})();

exports.Progress = Progress;