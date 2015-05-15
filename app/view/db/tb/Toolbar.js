Ext.define('Arbela.view.db.tb.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.dbtoolbar',

    requires: [
        'Arbela.view.db.tb.ToolbarViewController',
        'Ext.button.Button'
    ],

    controller: 'dbtoolbar',

    items: [
        {
            xtype: 'button',
            text: 'Add Card',
            listeners: {
                click: 'onAddCardBtnClick'
            }
        },
        {
            xtype: 'button',
            text: 'Clone',
            listeners: {
                click: 'onCloneBtnClick'
            }
        }
    ]

});