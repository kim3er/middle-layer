var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _InternalStorage = require('./internal_storage');

var Store = (function () {
	function Store() {
		var key = arguments[0] === undefined ? 'store' : arguments[0];

		_classCallCheck(this, Store);

		this._storage = new _InternalStorage.InternalStorage(key);
	}

	_createClass(Store, [{
		key: 'clear',
		value: function clear() {
			return this._storage.clear();
		}
	}]);

	return Store;
})();

exports.Store = Store;