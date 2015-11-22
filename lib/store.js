Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _internal_storage = require('./internal_storage');

var MlStore = (function () {
	function MlStore() {
		var key = arguments.length <= 0 || arguments[0] === undefined ? 'store' : arguments[0];

		_classCallCheck(this, MlStore);

		this._storage = new _internal_storage.MlInternalStorage(key);
	}

	_createClass(MlStore, [{
		key: 'clear',
		value: function clear() {
			return this._storage.clear();
		}
	}]);

	return MlStore;
})();

exports.MlStore = MlStore;