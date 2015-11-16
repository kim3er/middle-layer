Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _renderer = require('./renderer');

var MlAsyncRenderer = (function (_MlRenderer) {
	_inherits(MlAsyncRenderer, _MlRenderer);

	function MlAsyncRenderer(env) {
		_classCallCheck(this, MlAsyncRenderer);

		_get(Object.getPrototypeOf(MlAsyncRenderer.prototype), 'constructor', this).call(this, env);
		var self = this;

		self.instructions = [];
	}

	_createClass(MlAsyncRenderer, [{
		key: 'instruct',
		value: function instruct() {
			var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

			var self = this;

			opts = Object.assign({
				template: null,
				selector: null,
				promise: null
			}, opts);

			self.instructions.push(opts);

			return self;
		}
	}, {
		key: 'renderInstructions',
		value: function renderInstructions($target) {
			var self = this;

			return new Promise(function (resolve, reject) {
				if (!self.instructions.length) {
					resolve();
					return false;
				}

				async.each(self.instructions, function (instruction, callback) {
					instruction.promise.then(function (data) {
						return self.render(instruction.template, data);
					}).then(function (html) {
						$target.find(instruction.selector).replaceWith(html);

						callback();
					});
				}, function (err) {
					resolve();
				});
			});
		}
	}]);

	return MlAsyncRenderer;
})(_renderer.MlRenderer);

exports.MlAsyncRenderer = MlAsyncRenderer;