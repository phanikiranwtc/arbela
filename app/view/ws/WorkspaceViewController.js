Ext.define('Arbela.view.ws.WorkspaceViewController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.workspaceviewcontroller',

	onDatasourceAdded: function(cmp, record) {
		var data = this.getViewModel().getData();
		data.datasources[record.name] = record;

		record.typeObj.startRefreshTimer();

		console.log('Net Datasources: ', data.datasources);
	}

});