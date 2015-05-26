Ext.define('Arbela.view.db.card.NewCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.dbnewcard',

    requires: [
        'Arbela.view.db.card.NewCardViewModel',
        'Arbela.view.db.card.NewCardViewController',
        'Arbela.view.common.WindowToolbar',
        'Arbela.view.common.BladePanel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    // twoWayBindable: ['datasources'],

    config: {
        typeData: [],
        values: {},
        datasources: null
        // bind: {
        //     datasources: '{datasources}'
        // }
    },

    dirtyMsg: 'There are unsaved changes. Do you want to ignore them and continue?',
    ui: 'blue',

    controller: 'dbnewcard',
    viewModel: {
        type: 'dbnewcard'
    },
    autoShow: true,
    autoHeight: true,
    width: 400,
    bodyPadding: 10,
    layout: 'fit',
    title: 'New Card',

    modal: true,

    items: {
        xtype: 'form',
        items: [{
                xtype: 'checkbox',
                fieldLabel: 'Show Title?',
                name: 'showTitle',
                checked: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Name',
                name: 'name'
            }, {
                xtype: 'bladeform'
            }, {
                xtype: 'button',
                text: 'Add Blade',
                cls: 'add-blade-btn',
                icon: 'https://cdn4.iconfinder.com/data/icons/linecon/512/add-16.png',
                ui: 'plain',
                handler: 'onAddBladeBtnClick'
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

    setTypeData: function(typeData) {
        this.getViewModel().setData({typeData: typeData});
    }

});