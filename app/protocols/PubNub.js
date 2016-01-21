Ext.define('Arbela.protocols.PubNub', {
	extend: 'Ext.Base',

	mixins: ['Ext.mixin.Mashup'],

	requiredScripts: [
		'./lib/pubnub-dev.js'
		//'https://cdn.pubnub.com/pubnub-dev.js'
	],

	singleton: true,

	init: function(pubKey, subKey) {
		if (!this.pubNub) {
			console.log('initializing PubNub.....');
			this.pubNub = PUBNUB.init({
				publish_key: pubKey,
				subscribe_key: subKey
			});
		}
	},

	subscribe: function(channel, onMessageArrived) {
		this.pubNub.subscribe({
			channel: channel,
			message: onMessageArrived
		});
	},

	publish: function(channel, jsonPaylod, onMessageArrived) {
		this.pubNub.publish({
			channel: channel,
			message: jsonPaylod
		});
	}
});