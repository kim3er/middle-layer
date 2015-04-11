export class Proxy {

	headers() {
		return {
			
		};
	}

	request(endPoint, data = null, opts = {}) {
		opts = Object.assign({
			method: 'GET',
			auth: true,
			dataType: 'json'
		}, opts);

		var ajaxOpts = {
			dataType: opts.dataType,
			url: `${this._host}${endPoint}`,
			data: data,
			method: opts.method
		};

		if (opts.auth) {
			ajaxOpts.headers = this.headers();
		}

		return $.ajax(ajaxOpts);
	}

	jsonFail(resolve) {
		return function(xhr) {
			resolve(xhr.responseJSON || {});
		};
	}

}