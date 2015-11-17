Ext.define('Arbela.view.common.BladePanel', {
	extend: 'Ext.form.Panel',

	xtype: 'bladeform',
	// name: 'bladeform',

	bodyPadding: 10,
	// height: 80,
	cls: 'blade-form',

	config: {
		typeData: []
	},

    bind: {
        typeData: '{typeData}'
    },

	viewModel: {
		stores: {
			types: {
	            fields: ['name', 'niceName', 'klass'],
	            data: []
	        }
		}
	},

    collapsible: true,
    closable: true,
    frame: true,
    title: 'Blade',
    store: null,
    publishes: ['store'],
    reference: 'bladeform',
    items: {
        xtype: 'combobox',
        fieldLabel: 'Type',
        name: 'type',
        allowBlank: false,
        emptyText: 'Select a type',
        queryMode: 'local',
        valueField: 'klass',
        displayField: 'niceName',
        triggerAction: 'all',
        // reference: 'typeCombo',
        bind: {
            store: '{types}'
        },
        listeners: {
            select: 'onComboboxSelect',
            change: 'onComboboxChange'
        }
    },

    setTypeData: function(typeData) {//debugger;
        this.getViewModel().getStore('types').setData(typeData);
    }
});