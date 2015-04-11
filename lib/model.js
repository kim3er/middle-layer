var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _Config2 = require('./config');

var Model = (function (_Config) {
	function Model() {
		_classCallCheck(this, Model);

		if (_Config != null) {
			_Config.apply(this, arguments);
		}
	}

	_inherits(Model, _Config);

	_createClass(Model, [{
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
							var m = '' + fieldType + 'Moment';

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

	return Model;
})(_Config2.Config);

exports.Model = Model;