Ext.define('Arbela.view.db.main.DashboardViewModel', {
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