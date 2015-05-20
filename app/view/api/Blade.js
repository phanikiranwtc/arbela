Ext.define('Arbela.view.api.Blade', {
    extend: 'Ext.container.Container',

    statics: {
        niceName: 'Example Blade',
        desc: 'Example description'
    },

    config: {
	    settings: [],
	    viewTemplate: {}
	},

    viewModel: {
        data: {}
    },

    setBladeData: Ext.emptyFn,

    initialise: function(settings, successCallback, errorCallback, afterUpdateCallback) {
        
    },

    updateSettings: function(oldSettings, newSettings) {

    },

    dispose: function() {

    }
});