Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _config = require('./config');

var _progress = require('./progress');

var _pub_sub = require('./pub_sub');

var MlApplication = (function (_MlConfig) {
	_inherits(MlApplication, _MlConfig);

	_createClass(MlApplication, [{
		key: 'config',

		// Config

		value: function config() {
			return {
				controllers: [],
				classes: {
					router: null,
					renderer: null
				}
			};
		}
	}]);

	function MlApplication(onDevice) {
		_classCallCheck(this, MlApplication);

		_get(Object.getPrototypeOf(MlApplication.prototype), 'constructor', this).call(this);

		var self = this;

		self.onDevice = onDevice;

		self.progress = new _progress.MlProgress();
		self.renderer = new self.classes.renderer();
		self.router = new self.classes.router({ app: self, controllers: self.controllers });
		self.event = new _pub_sub.MlPubSub();

		self.state = {};
	}

	// Overrides

	_createClass(MlApplication, [{
		key: 'ready',
		value: function ready() {
			return new Promise(function (resolve, reject) {
				// On ready code goes here
				resolve();
			});
		}
	}, {
		key: 'afterReady',
		value: function afterReady() {
			// Disable splash screen
			if (typeof navigator !== 'undefined' && navigator.splashscreen) {
				navigator.splashscreen.hide();
			}
		}

		// Helpers

	}], [{
		key: 'doAppReady',
		value: function doAppReady() {
			var self = this;

			function appReady(onDevice) {
				return function () {
					window.app = new self(onDevice);
					app.ready().then(function () {
						return app.afterReady();
					});
				};
			}

			if (typeof cordova !== 'undefined') {
				document.addEventListener('deviceready', appReady(true), false);
			} else {
				$(appReady(false));
			}
		}
	}]);

	return MlApplication;
})(_config.MlConfig);

exports.MlApplication = MlApplication;