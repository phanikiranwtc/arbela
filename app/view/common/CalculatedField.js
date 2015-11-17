Ext.define('Arbela.view.common.CalculatedField', {
	extend: 'Ext.form.field.ComboBox',

	xtype: 'calculatedfield',

	publishes: ['valueData'],

	reference: 'calculatedfield',

	viewModel: {
		stores: {
			dsfields: {
				fields: ['name', 'niceName'],
				bind: {
					data: '{calculatedfield.valueData}'
				}
			}
		}
	},

	config: {
		valueData: [],

		bind: {
			store: '{dsfields}' 
		},
		queryMode: 'local',
		valueField: 'name',
	    displayField: 'niceName',
	    triggerAction: 'all'
	},

	initComponent: function() {
		// this.hideTrigger = true;

		this.callParent(arguments);
	}
});