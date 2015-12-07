Ext.define('Arbela.view.ds.ListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.dslist',

    stores: {
    	datasources: {
    		//autoSync: true,
    		fields: ['name', 'lastUpdated'],
            //data:[{'name':'testing',"lastUpdated":'now'}],
    		proxy: {
    			type: 'memory',
    			url : '/datasources'
    		}
    	}
    }

});