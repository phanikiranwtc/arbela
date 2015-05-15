Ext.define('Arbela.view.api.DataSource', {
    extend: 'Ext.Base',

    config: {
    	desc: 'Base datasource',
	    settings: null,
	    dataFields: null
	},

	constructor: function(config) {
		this.initConfig(config);
		this.callParent(arguments);
	},
    
    initialise: function(settings, successCallback, errorCallback, dataUpdateCallback) {

    	this.callbacks = {
    		success: successCallback,
    		error: errorCallback,
    		update: dataUpdateCallback
    	};

    	// this.setSettings(settings);
        
    },

    //@private
    //newSettings is just a name value pair. We need to update the actual settings object, which is a 
    //different structure
    applySettings: function(newSettings) {

    	var me = this;
    	var settings = me.config.settings;

    	if (!Ext.isEmpty(newSettings)) {
    		var l = settings.length;

    		for (var i = 0; i < l; i++) {
    			var item = settings[i];
    			var key = item.name;
    			var val = newSettings[key];

    			if (val) {
    				if (item.xtype === 'calculatedfield') {
    					item.valueData = val;	
    				} else {
						item.value = val;
					}
    			}
    		}

    		return settings;
    	}

    },

    updateSettings: function(oldSettings, newSettings) {

    	console.log('SETTINGS: ', newSettings);

    },

    dispose: Ext.emptyFn,

    getData: Ext.emptyFn,

    startRefreshTimer: Ext.emptyFn,

    refresh: function() {
    	console.log('Datasource: refresh');
    	this.getData();
    }
});