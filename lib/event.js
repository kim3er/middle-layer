var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
	value: true
});

var Event = (function () {
	function Event() {
		_classCallCheck(this, Event);

		this.topics = {};
		this.hOP = this.topics.hasOwnProperty;
	}

	_createClass(Event, [{
		key: "subscribe",
		value: function subscribe(topic, listener) {
			// Create the topic's object if not yet created
			if (!this.hOP.call(this.topics, topic)) {
				this.topics[topic] = [];
			}

			console.log("Subscribed: " + topic);

			// Add the listener to queue
			var index = this.topics[topic].push(listener) - 1;

			// Provide handle back for removal of topic
			return {
				remove: function remove() {
					delete this.topics[topic][index];
				}
			};
		}
	}, {
		key: "publish",
		value: function publish(topic, info) {
			// If the topic doesn't exist, or there's no listeners in queue, just leave
			if (!this.hOP.call(this.topics, topic)) {
				return;
			}

			console.log("Published: " + topic);

			// Cycle through topics queue, fire!
			this.topics[topic].forEach(function (item) {
				item(info != undefined ? info : null);
			});
		}
	}]);

	return Event;
})();

exports.Event = Event;