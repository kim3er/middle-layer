var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Renderer2 = require('./renderer');

var AsyncRenderer = (function (_Renderer) {
	function AsyncRenderer(env) {
		_classCallCheck(this, AsyncRenderer);

		_get(Object.getPrototypeOf(AsyncRenderer.prototype), 'constructor', this).call(this, env);
		var self = this;

		self.instructions = [];
	}

	_inherits(AsyncRenderer, _Renderer);

	_createClass(AsyncRenderer, [{
		key: 'instruct',
		value: function instruct() {
			var opts = arguments[0] === undefined ? {} : arguments[0];

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
						return self.renderHtml(instruction.template, data);
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

	return AsyncRenderer;
})(_Renderer2.Renderer);

exports.AsyncRenderer = AsyncRenderer;