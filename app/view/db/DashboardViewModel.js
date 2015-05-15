Ext.define('Arbela.view.db.DashboardViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dbdashboard',

    stores: {
    	cards: {
    		autoSync: true,
    		fields: ['name', 'lastUpdated'],
    		proxy: {
    			type: 'rest',
    			url : '/cards'
    		}
    	}
    }

});