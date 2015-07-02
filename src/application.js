import { MlConfig } from './config';
import { MlProgress } from './progress';
import { MlPubSub } from './pub_sub';

export class MlApplication extends MlConfig {

	// Config

	config() {
		return {
			controllers: [],
			classes: {
				router: null,
				renderer: null
			}
		};
	}


	constructor(onDevice: boolean) {
		super();

		let self = this;

		self.onDevice = onDevice;

		self.progress = new MlProgress();
		self.renderer = new self.classes.renderer();
		self.router = new self.classes.router({ app: self, controllers: self.controllers });
		self.event = new MlPubSub();

		self.state = {};
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


	// Helpers

	static doAppReady() {
		let self = this;

		function appReady(onDevice) {
			return function() {
				window.app = new self(onDevice);
				app.ready()
					.then(() => app.afterReady());
			}
		}

		if (typeof cordova !== 'undefined') {
			document.addEventListener('deviceready', appReady(true), false);
		}
		else {
			$(appReady(false));
		}
	}

}
