var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Config2 = require('./config');

var Service = (function (_Config) {
	function Service() {
		_classCallCheck(this, Service);

		if (_Config != null) {
			_Config.apply(this, arguments);
		}
	}

	_inherits(Service, _Config);

	_createClass(Service, [{
		key: 'config',
		value: function config() {
			return {
				model: null,
				proxy: null
			};
		}
	}, {
		key: 'convertor',
		value: function convertor(val) {
			return this.model ? new this.model().convert(val) : val;
		}
	}, {
		key: 'convertedPromise',
		value: function convertedPromise(promise) {
			var self = this;

			return promise.then(function (r) {
				return self.convertor(r);
			});
		}
	}, {
		key: 'proxyInstance',
		value: function proxyInstance() {
			var self = this;

			return new Promise(function (resolve) {
				resolve(new self.proxy());
			});
		}
	}, {
		key: 'proxyCall',
		value: function proxyCall(func) {
			var self = this;

			return new Promise(function (resolve, reject) {
				self.proxyInstance().then(function (proxyInstance) {
					resolve(proxyInstance);
				});
			}).then(func).then(function (val) {
				return self.convertor(val);
			});
		}
	}]);

	return Service;
})(_Config2.Config);

exports.Service = Service;