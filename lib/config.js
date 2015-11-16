Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MlConfig = (function () {
	_createClass(MlConfig, [{
		key: "config",
		value: function config() {
			return {};
		}
	}]);

	function MlConfig() {
		_classCallCheck(this, MlConfig);

		var config = this.config();
		for (var attr in config) {
			this[attr] = config[attr];
		}
	}

	return MlConfig;
})();

exports.MlConfig = MlConfig;