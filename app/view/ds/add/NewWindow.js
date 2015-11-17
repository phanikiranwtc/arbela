Ext.define('Arbela.view.ds.add.NewWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.commonnewwindow',

    requires: [
        'Arbela.view.ds.add.NewWindowViewModel',
        'Arbela.view.ds.add.NewWindowViewController',
        'Arbela.view.common.WindowToolbar',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        typeData: [],
        values: {}
    },
    
    dirtyMsg: 'There are unsaved changes. Do you want to ignore them and continue?',
    ui: 'blue',

    controller: 'commonnewwindow',
    // publishes: [
    //     'typeData'
    // ],
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
                name: 'name',
                allowBlank: false
            }, {
                xtype: 'combobox',
                fieldLabel: 'Type',
                name: 'type',
                emptyText: 'Select a type',
                queryMode: 'local',
                valueField: 'klass',
                displayField: 'niceName',
                triggerAction: 'all',
                bind: {
                    store: '{types}'
                },
                listeners: {
                    select: 'onComboboxSelect',
                    change: 'onComboboxChange'
                },
                allowBlank: false
            }
        ],

        dockedItems: [
            {
                xtype: 'commonwindowtoolbar',
                dock: 'bottom',
                listeners: {
                    click: 'onToolbarBtnClick'
                },
                formBind: true
            }
        ]
    },

    updateValues: function(newValues) {
        console.log('Appying: ', newValues);
        this.down('form').loadRecord(newValues);
    },

    setTypeData: function(typeData) {
        this.getViewModel().getStore('types').setData(typeData);
    }

});
