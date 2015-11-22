import { MlInternalStorage } from './internal_storage';

export class MlStore {

	constructor(key = 'store') {
		this._storage = new MlInternalStorage(key);
	}

	clear() {
		return this._storage.clear();
	}

}
