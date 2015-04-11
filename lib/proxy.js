var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, '__esModule', {
	value: true
});

var Proxy = (function () {
	function Proxy() {
		_classCallCheck(this, Proxy);
	}

	_createClass(Proxy, [{
		key: 'headers',
		value: function headers() {
			return {};
		}
	}, {
		key: 'request',
		value: function request(endPoint) {
			var data = arguments[1] === undefined ? null : arguments[1];
			var opts = arguments[2] === undefined ? {} : arguments[2];

			opts = Object.assign({
				method: 'GET',
				auth: true,
				dataType: 'json'
			}, opts);

			var ajaxOpts = {
				dataType: opts.dataType,
				url: '' + this._host + '' + endPoint,
				data: data,
				method: opts.method
			};

			if (opts.auth) {
				ajaxOpts.headers = this.headers();
			}

			return $.ajax(ajaxOpts);
		}
	}, {
		key: 'jsonFail',
		value: function jsonFail(resolve) {
			return function (xhr) {
				resolve(xhr.responseJSON || {});
			};
		}
	}]);

	return Proxy;
})();

exports.Proxy = Proxy;