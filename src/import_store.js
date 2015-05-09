import { InternalStorage } from './internal_storage';


export class ImportStore extends InternalStorage {

	// Config
	config(key, fileRefs=[]) {
		super.config(key);

		this._fileRefs = fileRefs;
	}

	fileRefs() {
		return this._fileRefs;
	}

	destroy(deletions) {
		var self = this;

		return new Promise(function(resolve, reject) {
			async.eachSeries(deletions,
				function(id, cb) {
					self.remove(id)
						.then(cb);
				},
				function(err) {
					resolve();
				}
			);
		});
	}

	import(data) {
		var self = this;

		var changeFunc = function(changeCb) {
			async.eachSeries(Object.keys(data.changes),
				function(id, cb) {
					self.set(id, data.changes[id])
						.then(cb);
				},
				function(err) {
					changeCb();
				}
			);
		};

		return new Promise(function(resolve, reject) {
			if (data.deletions) {
				self.destroy(data.deletions)
					.then(function() {
						changeFunc(resolve);
					});
			}
			else {
				changeFunc(resolve);
			}
		});
	}

}
