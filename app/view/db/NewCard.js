Ext.define('Arbela.view.db.NewCard', {
    extend: 'Ext.window.Window',
    alias: 'widget.dbnewcard',

    requires: [
        'Arbela.view.common.NewWindowViewModel1',
        'Arbela.view.common.NewWindowViewController1',
        'Arbela.view.common.WindowToolbar',
        'Arbela.view.common.BladePanel',
        'Ext.form.field.ComboBox',
        'Ext.toolbar.Toolbar'
    ],

    config: {
        autoGrow: true,
        typeData: [],
        values: {}
    },

    controller: 'dbnewcard',
    viewModel: {
        type: 'dbnewcard'
    },
    autoShow: true,
    height: 280,
    width: 400,
    bodyPadding: 10,
    layout: 'fit',
    title: 'New',

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