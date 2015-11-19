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
            icon: 'resources/images/add-16.png',
            text: 'Add Card',
            tooltip: 'Add Card',
            ui: 'plain',
            listeners: {
                click: 'onAddCardBtnClick'
            }
        }/*,
        {
            xtype: 'button',
            text: 'Clone',
            listeners: {
                click: 'onCloneBtnClick'
            }
        }, '->'*//*, {
            xtype: 'button',
            icon: 'https://cdn4.iconfinder.com/data/icons/linecon/512/delete-16.png',
            tooltip: 'Remove Dashboard',
            text: 'Delete',
            ui: 'plain',
            listeners: {
                click: 'onRemoveDashboardBtnClick'
            }
        }*/
    ]

});