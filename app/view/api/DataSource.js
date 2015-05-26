Ext.define('Arbela.view.api.DataSource', {
    extend: 'Ext.Base',

    mixins: ['Ext.mixin.Observable'],

    statics: {
        niceName: 'Base Datasource',
        desc: 'Base datasource'
    },

    config: {
	    settings: null,
	    dataFields: null,
        data: null,
	},

    events: ['dataupdated'],

	constructor: function(config) {
		// this.initConfig(config);
		// this.callParent(arguments);

        //mixin constructor does the initConfig, so we don't have to do it
        this.mixins.observable.constructor.call(this, config);
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

    updateData: function(oldData, newData) {
        if (newData) {
            console.log('Firing........dataupdated.....with: ', this, newData);
            this.fireEvent('dataupdated', this, newData);
        }
    },

    dispose: Ext.emptyFn,

    startRefreshTimer: Ext.emptyFn,

    refresh: function() {
    	console.log('Datasource: refresh');
    	this.getData();
    }
});