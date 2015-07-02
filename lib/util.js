Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MlUtil = (function () {
	function MlUtil() {
		_classCallCheck(this, MlUtil);
	}

	_createClass(MlUtil, null, [{
		key: "emptyPromise",
		value: function emptyPromise(val) {
			return new Promise(function (resolve) {
				resolve(val);
			});
		}
	}]);

	return MlUtil;
})();

exports.MlUtil = MlUtil;