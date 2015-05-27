Ext.define('Arbela.view.ws.WorkspaceViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.workspaceviewcontroller',

	onDatasourceAdded: function(cmp, record) {
		var data = this.getViewModel().getData();
		data.datasources[record.name] = record;

		record.typeObj.setSettings(record);

		//TODO: This might not be the best place to start the data load timer on the datasource.
		//Best place would be when the datasource is first used on a blade
		record.typeObj.startRefreshTimer();

		console.log('Net Datasources: ', data.datasources);
	},

	onRemoveDashboard: function(pnl) {
		var v = this.getView();
		Ext.Msg.confirm('Confirm', 
            v.removeDbConfirmMsg, 
            function(btnId) {
                if (btnId === 'yes') {
                    var tabPnl = v.down('tabpanel');
					tabPnl.remove(pnl);
                }
        });
	}

});