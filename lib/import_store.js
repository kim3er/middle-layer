var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _InternalStorage2 = require('./internal_storage');

var ImportStore = (function (_InternalStorage) {
	function ImportStore() {
		_classCallCheck(this, ImportStore);

		if (_InternalStorage != null) {
			_InternalStorage.apply(this, arguments);
		}
	}

	_inherits(ImportStore, _InternalStorage);

	_createClass(ImportStore, [{
		key: 'config',

		// Config
		value: function config(key) {
			var fileRefs = arguments[1] === undefined ? [] : arguments[1];

			_get(Object.getPrototypeOf(ImportStore.prototype), 'config', this).call(this, key);

			this._fileRefs = fileRefs;
		}
	}, {
		key: 'fileRefs',
		value: function fileRefs() {
			return this._fileRefs;
		}
	}, {
		key: 'destroy',
		value: function destroy(deletions) {
			var self = this;

			return new Promise(function (resolve, reject) {
				async.eachSeries(deletions, function (id, cb) {
					self.remove(id).then(cb);
				}, function (err) {
					resolve();
				});
			});
		}
	}, {
		key: 'import',
		value: function _import(data) {
			var self = this;

			var changeFunc = function changeFunc(changeCb) {
				async.eachSeries(Object.keys(data.changes), function (id, cb) {
					self.set(id, data.changes[id]).then(cb);
				}, function (err) {
					changeCb();
				});
			};

			return new Promise(function (resolve, reject) {
				if (data.deletions) {
					self.destroy(data.deletions).then(function () {
						changeFunc(resolve);
					});
				} else {
					changeFunc(resolve);
				}
			});
		}
	}]);

	return ImportStore;
})(_InternalStorage2.InternalStorage);

exports.ImportStore = ImportStore;