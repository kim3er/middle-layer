import { InternalStorage } from './internal_storage';

export class Store {

	constructor(key = 'store') {
		this._storage = new InternalStorage(key);
	}

	clear() {
		return this._storage.clear();
	}

}
