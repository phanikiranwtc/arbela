Ext.define('Arbela.view.blades.Dummy', {
    extend: 'Arbela.view.api.Blade',

    settings: [{
        xtype: 'expressionfield',
        fieldLabel: 'Expression',
        name: 'value1',
        allowBlank:false
    },{
        xtype: 'combobox',
        itemId:'dataCombo',
        fieldLabel: 'DataSources',
        name: 'datasources',
        emptyText: 'Select a datasources',
        queryMode: 'local',
        store:'',
        valueField: 'name',
        displayField: 'name',
        triggerAction: 'all',
        listeners: {
            select: 'onComboboxSelect',
            change: 'onComboboxChange'
        }
}],

    statics: {
	    niceName: 'Dummy',
	    desc: 'This is a dummy blade'
	},

    config: {
        height: 80,
        xtype: 'component',
        bind: {
            html: 'Hello {value1}!'
        }
    }
});
