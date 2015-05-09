import { Progress } from './progress';
import { PubSub } from './pub_sub';
import { Router } from './router';

export class Application {

	// Config

	controllers() {
		return [
		// Declare controllers here
		];
	}


	constructor(onDevice: boolean) {
		let self = this;

		self.onDevice = onDevice;

		self.progress = new Progress();
		self.router = new Router({ app: self, controllers: self.controllers() });
		self.event = new PubSub();

		self.state = {};

		self.ready()
			.then(() => self.afterReady());
	}


	// Overrides

	ready() {
		return new Promise(function(resolve, reject) {
			// On ready code goes here
			resolve();
		});
	}

	afterReady() {
		// Disable splash screen
		if (typeof navigator !== 'undefined' && navigator.splashscreen) {
			navigator.splashscreen.hide();
		}
	}

	switchTemplate(name, data) {

	}


	// Helpers

	static doAppReady() {
		let self = this;

		function appReady(onDevice) {
			return () => { window.app = new self(onDevice); }
		}

		if (typeof cordova !== 'undefined') {
			document.addEventListener('deviceready', appReady(true), false);
		}
		else {
			$(appReady(false));
		}
	}

}
