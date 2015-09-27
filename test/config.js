import { expect } from 'chai';
import { MlConfig } from '../src/config';

class MockClass extends MlConfig {

	config() {
		return {
			foo: () => 'bar'
		}
	}
}

describe('MlConfig', function() {
	let mockClass = new MockClass();

	it('should contain a method called "foo"', function() {
		expect(mockClass.foo).to.be.a('function');
	});

	describe('foo()', function() {
		it('should return "bar"', function() {
			expect(mockClass.foo()).to.equal('bar');
		});
	});
})
