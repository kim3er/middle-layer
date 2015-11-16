Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var _config = require('./config');

var MlModel = (function (_MlConfig) {
	_inherits(MlModel, _MlConfig);

	function MlModel() {
		_classCallCheck(this, MlModel);

		_get(Object.getPrototypeOf(MlModel.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(MlModel, [{
		key: 'convertResource',
		value: function convertResource(obj) {
			var self = this;

			var resource = Object.assign({}, obj);

			for (var fieldType in self.fieldTypes) {
				if (!resource[fieldType]) {
					continue;
				}

				var convertor = self.fieldTypes[fieldType];

				if (typeof convertor === 'string') {
					switch (convertor) {
						case 'date':
							var m = fieldType + 'Moment';

							resource[m] = moment(resource[fieldType]);
							resource[fieldType] = resource[m].format('lll');

							break;
					}
				} else {
					resource[fieldType] = convertor(resource[fieldType]);
				}
			}

			return resource;
		}
	}, {
		key: 'convertCollection',
		value: function convertCollection(arr) {
			var self = this;

			var collection = [];

			arr.forEach(function (obj) {
				collection.push(self.convertResource(obj));
			});

			return collection;
		}
	}, {
		key: 'convert',
		value: function convert(val) {
			if (Array.isArray(val)) {
				return this.convertCollection(val);
			} else {
				return this.convertResource(val);
			}
		}
	}]);

	return MlModel;
})(_config.MlConfig);

exports.MlModel = MlModel;