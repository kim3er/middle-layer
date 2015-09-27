require('babel/register')({
	blacklist: [ 'useStrict' ],
	optional: [ 'es7.decorators', 'es7.asyncFunctions' ]
});
require('./gulprunner');
