import { expect } from 'chai';
import { MlController, route } from '../src/controller';

class MockController extends MlController {

	@route()
	foo(route) {

	}

}

describe('MlController', function() {
	let controller = new MockController();

	describe('route() descriptor', function() {

		it('should add a route to the controller', function() {
			expect(controller.routes.length).to.equal(1);
		});

		it('should add a route to the controller', function() {
			expect(controller.routes.length).to.equal(1);
		});
	});
});
