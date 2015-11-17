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

    config: {
        typeData: [],
        values: {},
        datasources: null
    },

    dirtyMsg: 'There are unsaved changes. Do you want to ignore them and continue?',
    addSeries : 0,
    ui: 'blue',

    controller: 'dbnewcard',
    viewModel: {
        type: 'dbnewcard'
    },
    autoShow: true,
    scrollable: true,
    autoHeight: true,
    height: 400,
    width: 400,
    bodyPadding: 10,
    layout: 'fit',
    title: 'New Card',

    modal: true,

    items: {
        xtype: 'form',
        scrollable: 'vertical',
        items: [{
                xtype: 'checkbox',
                fieldLabel: 'Show Title?',
                name: 'showTitle',
		        reference: 'isTitleShow',
                checked: true
            },{
                xtype: 'textfield',
                fieldLabel: 'Title Style',
                name: 'titleStyle',
                bind:{
                    hidden : '{!isTitleShow.checked}'
                }
            },{
                xtype: 'checkbox',
                fieldLabel: 'Auto Hide?',
                name: 'hideTitleBar',
                checked: false
            }, {
                xtype: 'textfield',
                fieldLabel: 'Title',
                name: 'name'
            }, {
                xtype: 'bladeform',
                allowBlank: false
            }
        ],
        dockedItems: [
            {
                xtype: 'commonwindowtoolbar',
                dock: 'bottom',
                listeners: {
                    click: 'onToolbarBtnClick'
                }
            }
        ]
    },
    setTypeData: function(typeData) {
        this.getViewModel().setData({typeData: typeData});
    }

});
