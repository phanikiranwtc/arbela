Ext.define('Arbela.view.ds.ListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dslist',

    stores: {
    	datasources: {
    		autoSync: true,
    		fields: ['name', 'lastUpdated'],
    		proxy: {
    			type: 'rest',
    			url : '/datasources'
    		}
    	}
    }

});