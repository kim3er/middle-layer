export class MlInternalStorage {

	// Config
	config(key) {
		this._key = key || 'store';

		this._storage = localforage;
	}

	setSortField(field) {
		this._sortField = field;
	}

	// Contstructor
	constructor(key) {
		this.config(key);

		this._sortField = null;
	}

	// Private
	_serialize(data) {
		return data;
	}

	_deserialize(value) {
		return value;
	}

	_getRecordKey(id) {
		return this._key + '-' + id;
	}

	_getIndexKey() {
		return this._key + '_index';
	}

	_getIndex() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._storage.getItem(self._getIndexKey())
				.then((value) => { resolve(self._deserialize(value)); });
		});
	}

	_setIndex(array=[]) {
		var obj = this._serialize(array);
		return this._storage.setItem(this._getIndexKey(), obj);
	}

	_addToIndex(recordKey) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					index = index || [];
					if (!index.includes(recordKey)) {
						index.push(recordKey);

						self._setIndex(index)
							.then(function() {
								resolve();
							});
					}
					else {
						resolve();
					}
				});
		});
	}

	_removeFromIndex(recordKey) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					var idx = index ? index.indexOf(recordKey) : -1;

					if (idx !== -1) {
						index.splice(idx, 1);
					}

					self._setIndex(index)
						.then(function() {
							resolve();
						});
				});
		});
	}

	_hasKey(id) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					resolve(index.includes(self._getRecordKey(id)));
				});
		});
	}

	_getRecord(recordKey) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._storage.getItem(recordKey)
				.then(function(record) {
					resolve(self._deserialize(record));
				});
		});
	}

	_setRecord(recordKey, data) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._storage.setItem(recordKey, self._serialize(data))
				.then(function() {
					self._addToIndex(recordKey)
						.then(resolve);
				});
		});
	}

	_removeRecord(recordKey) {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._storage.removeItem(recordKey)
				.then(function() {
					self._removeFromIndex(recordKey)
						.then(resolve);
				});
		});
	}

	_sort() {
		var self = this;

		return new Promise(function(resolve, reject) {
			if (self._sortField) {
				self._getAll()
					.then(function(array) {
						array.sort((a, b) => { return +(a[self._sortField] > b[self._sortField]) });

						let newIndex = array.map((x) => { return self._getRecordKey(x.id) });

						self._setIndex(newIndex)
							.then(resolve);
					});
			}
			else {
				resolve();
			}
		});
	}

	_getAll() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					async.mapSeries(index || [],
						function(recordKey, cb) {
							self._getRecord(recordKey)
								.then((record) => { cb(null, record) });
						},
						function(err, arr) {
							resolve(arr);
						}
					);
				});
		});
	}

	_setAll(array, clearFirst=false) {
		var self = this;

		var workFunc = function(workerCb) {
			async.eachSeries(array,
				function(obj, cb) {
					let recordKey = self._getRecordKey(obj.id);

					self._setRecord(recordKey, obj)
						.then(function() {
							self._addToIndex(recordKey)
								.then(() => { cb() });
						});
				},
				function(err) {
					workerCb();
				}
			);
		};

		return new Promise(function(resolve, reject) {
			if (clearFirst) {
				self._clear()
					.then(() => { workFunc(resolve) });
			}
			else {
				workFunc(resolve);
			}
		});
	}

	_clear() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					async.eachSeries(index || [],
						function(recordKey, cb) {
							self._storage.removeItem(recordKey)
								.then(() => { cb(); });
						},
						function(err) {
							self._storage.removeItem(self._getIndexKey())
								.then(() => { resolve(); });
						}
					);
				});
		});
	}

	// Public
	has(id) {
		return this._hasKey(id);
	}

	get(id=null) {
		if (id == null) {
			return this._getAll();
		}
		else {
			return this._getRecord(this._getRecordKey(id));
		}
	}

	first() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getAll()
				.then(function(collection) {
					resolve(collection && collection.length > 0 ? collection[0] : null);
				});
		});
	}

	set(id, data=false) {
		var self = this;

		if (typeof id === 'object') {
			if (Array.isArray(id)) {
				return self._setAll(id, data);
			}
			else if (id.id !== undefined) {
				return self._setRecord(self._getRecordKey(id.id), id);
			}
			else {
				return new Promise(function(resolve, reject) {
					async.eachSeries(Object.keys(id),
						function(key, cb) {
							self._setRecord(self._getRecordKey(key), id[key])
								.then(() => { cb(); });
						},
						function(err) {
							resolve();
						}
					);
				});
			}
		}
		else {
			return this._setRecord(this._getRecordKey(id), data);
		}
	}

	update(id, data) {
		var self = this;

		var recordKey = self._getRecordKey(id);

		return new Promise(function(resolve, reject) {
			self._getRecord(recordKey)
				.then(function(record) {
					if (record) {
						Object.assign(record, data);
						self._setRecord(recordKey, record)
							.then(resolve);
					}
					else {
						resolve();
					}
				});
		});
	}

	remove(id) {
		return this._removeRecord(this._getRecordKey(id));
	}

	clear() {
		return this._clear();
	}

	count() {
		var self = this;

		return new Promise(function(resolve, reject) {
			self._getIndex()
				.then(function(index) {
					resolve(index ? index.length : 0);
				});
		});
	}

	sort() {
		return this._sort();
	}

}
