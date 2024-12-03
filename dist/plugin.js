var capacitorGliaSdk = (function (exports, core) {
	'use strict';

	const GliaSdk = core.registerPlugin('GliaSdk', {
	// web: () => import('./web').then((m) => new m.GliaSdkWeb()),
	});

	exports.GliaSdk = GliaSdk;

	return exports;

})({}, capacitorExports);
//# sourceMappingURL=plugin.js.map
