Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var MlInternalStorage = (function () {

	// Contstructor

	function MlInternalStorage(key) {
		_classCallCheck(this, MlInternalStorage);

		this.config(key);

		this._sortField = null;
	}

	_createClass(MlInternalStorage, [{
		key: 'config',

		// Config
		value: function config(key) {
			this._key = key || 'store';

			this._storage = localforage;
		}
	}, {
		key: 'setSortField',
		value: function setSortField(field) {
			this._sortField = field;
		}
	}, {
		key: '_serialize',

		// Private
		value: function _serialize(data) {
			return data;
		}
	}, {
		key: '_deserialize',
		value: function _deserialize(value) {
			return value;
		}
	}, {
		key: '_getRecordKey',
		value: function _getRecordKey(id) {
			return this._key + '-' + id;
		}
	}, {
		key: '_getIndexKey',
		value: function _getIndexKey() {
			return this._key + '_index';
		}
	}, {
		key: '_getIndex',
		value: function _getIndex() {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._storage.getItem(self._getIndexKey()).then(function (value) {
					resolve(self._deserialize(value));
				});
			});
		}
	}, {
		key: '_setIndex',
		value: function _setIndex() {
			var array = arguments[0] === undefined ? [] : arguments[0];

			var obj = this._serialize(array);
			return this._storage.setItem(this._getIndexKey(), obj);
		}
	}, {
		key: '_addToIndex',
		value: function _addToIndex(recordKey) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					index = index || [];
					if (!index.includes(recordKey)) {
						index.push(recordKey);

						self._setIndex(index).then(function () {
							resolve();
						});
					} else {
						resolve();
					}
				});
			});
		}
	}, {
		key: '_removeFromIndex',
		value: function _removeFromIndex(recordKey) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					var idx = index ? index.indexOf(recordKey) : -1;

					if (idx !== -1) {
						index.splice(idx, 1);
					}

					self._setIndex(index).then(function () {
						resolve();
					});
				});
			});
		}
	}, {
		key: '_hasKey',
		value: function _hasKey(id) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					resolve(index.includes(self._getRecordKey(id)));
				});
			});
		}
	}, {
		key: '_getRecord',
		value: function _getRecord(recordKey) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._storage.getItem(recordKey).then(function (record) {
					resolve(self._deserialize(record));
				});
			});
		}
	}, {
		key: '_setRecord',
		value: function _setRecord(recordKey, data) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._storage.setItem(recordKey, self._serialize(data)).then(function () {
					self._addToIndex(recordKey).then(resolve);
				});
			});
		}
	}, {
		key: '_removeRecord',
		value: function _removeRecord(recordKey) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._storage.removeItem(recordKey).then(function () {
					self._removeFromIndex(recordKey).then(resolve);
				});
			});
		}
	}, {
		key: '_sort',
		value: function _sort() {
			var self = this;

			return new Promise(function (resolve, reject) {
				if (self._sortField) {
					self._getAll().then(function (array) {
						array.sort(function (a, b) {
							return +(a[self._sortField] > b[self._sortField]);
						});

						var newIndex = array.map(function (x) {
							return self._getRecordKey(x.id);
						});

						self._setIndex(newIndex).then(resolve);
					});
				} else {
					resolve();
				}
			});
		}
	}, {
		key: '_getAll',
		value: function _getAll() {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					async.mapSeries(index || [], function (recordKey, cb) {
						self._getRecord(recordKey).then(function (record) {
							cb(null, record);
						});
					}, function (err, arr) {
						resolve(arr);
					});
				});
			});
		}
	}, {
		key: '_setAll',
		value: function _setAll(array) {
			var clearFirst = arguments[1] === undefined ? false : arguments[1];

			var self = this;

			var workFunc = function workFunc(workerCb) {
				async.eachSeries(array, function (obj, cb) {
					var recordKey = self._getRecordKey(obj.id);

					self._setRecord(recordKey, obj).then(function () {
						self._addToIndex(recordKey).then(function () {
							cb();
						});
					});
				}, function (err) {
					workerCb();
				});
			};

			return new Promise(function (resolve, reject) {
				if (clearFirst) {
					self._clear().then(function () {
						workFunc(resolve);
					});
				} else {
					workFunc(resolve);
				}
			});
		}
	}, {
		key: '_clear',
		value: function _clear() {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					async.eachSeries(index || [], function (recordKey, cb) {
						self._storage.removeItem(recordKey).then(function () {
							cb();
						});
					}, function (err) {
						self._storage.removeItem(self._getIndexKey()).then(function () {
							resolve();
						});
					});
				});
			});
		}
	}, {
		key: 'has',

		// Public
		value: function has(id) {
			return this._hasKey(id);
		}
	}, {
		key: 'get',
		value: function get() {
			var id = arguments[0] === undefined ? null : arguments[0];

			if (id == null) {
				return this._getAll();
			} else {
				return this._getRecord(this._getRecordKey(id));
			}
		}
	}, {
		key: 'first',
		value: function first() {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getAll().then(function (collection) {
					resolve(collection && collection.length > 0 ? collection[0] : null);
				});
			});
		}
	}, {
		key: 'set',
		value: function set(id) {
			var data = arguments[1] === undefined ? false : arguments[1];

			var self = this;

			if (typeof id === 'object') {
				if (Array.isArray(id)) {
					return self._setAll(id, data);
				} else if (id.id !== undefined) {
					return self._setRecord(self._getRecordKey(id.id), id);
				} else {
					return new Promise(function (resolve, reject) {
						async.eachSeries(Object.keys(id), function (key, cb) {
							self._setRecord(self._getRecordKey(key), id[key]).then(function () {
								cb();
							});
						}, function (err) {
							resolve();
						});
					});
				}
			} else {
				return this._setRecord(this._getRecordKey(id), data);
			}
		}
	}, {
		key: 'update',
		value: function update(id, data) {
			var self = this;

			var recordKey = self._getRecordKey(id);

			return new Promise(function (resolve, reject) {
				self._getRecord(recordKey).then(function (record) {
					if (record) {
						Object.assign(record, data);
						self._setRecord(recordKey, record).then(resolve);
					} else {
						resolve();
					}
				});
			});
		}
	}, {
		key: 'remove',
		value: function remove(id) {
			return this._removeRecord(this._getRecordKey(id));
		}
	}, {
		key: 'clear',
		value: function clear() {
			return this._clear();
		}
	}, {
		key: 'count',
		value: function count() {
			var self = this;

			return new Promise(function (resolve, reject) {
				self._getIndex().then(function (index) {
					resolve(index ? index.length : 0);
				});
			});
		}
	}, {
		key: 'sort',
		value: function sort() {
			return this._sort();
		}
	}]);

	return MlInternalStorage;
})();

exports.MlInternalStorage = MlInternalStorage;