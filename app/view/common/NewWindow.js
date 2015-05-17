Ext.define('Arbela.view.common.NewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.commonnewwindow',

    requires: [
        'Arbela.view.common.NewWindowViewModel',
        'Arbela.view.common.NewWindowViewController',
        'Arbela.view.common.WindowToolbar',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        typeData: [],
        values: {}
    },
    
    dirtyMsg: 'There are unsaved changes. Do you want to ignore them and continue?',

    controller: 'commonnewwindow',
    publishes: [
        'typeData'
    ],
    reference: 'newwindow',

    viewModel: {
        type: 'commonnewwindow'
    },
    autoShow: true,
    autoHeight: true,
    width: 400,
    bodyPadding: 10,
    layout: 'fit',
    title: 'New',

    modal: true,

    items: {
        xtype: 'form',
        items: [{
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name'
            }, {
                xtype: 'combobox',
                fieldLabel: 'Type',
                name: 'type',
                emptyText: 'Select a type',
                queryMode: 'local',
                valueField: 'klass',
                displayField: 'name',
                triggerAction: 'all',
                bind: {
                    store: '{types}'
                },
                listeners: {
                    select: 'onComboboxSelect',
                    change: 'onComboboxChange'
                }
            }
        ]
    },

    dockedItems: [
        {
            xtype: 'commonwindowtoolbar',
            dock: 'bottom',
            listeners: {
                click: 'onToolbarBtnClick'
            }
        }
    ],

    updateValues: function(newValues) {
        console.log('Appying: ', newValues);
        this.down('form').loadRecord(newValues);
    },

    setTypeData: function(typeData) {
        this.getViewModel().getStore('types').setData(typeData);
    }

});