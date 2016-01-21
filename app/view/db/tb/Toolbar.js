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
            icon: 'resources/images/add1.png',
            text: 'Add Card',
            tooltip: 'Add Card',
            ui: 'plain',
            listeners: {
                click: 'onAddCardBtnClick'
            }
        },
        {
            xtype: 'button',
            ui: 'plain',
            text: 'Save',
            icon: 'resources/images/save.png',
            listeners: {
                click: 'onCloneBtnClick'
            }
        },{
            xtype: 'button',
            ui: 'plain',
            text: 'Load',
            icon: 'resources/images/load1.png',
            listeners: {
                click: 'onLoadeBtnClick'
            }
        }/*, '->', {
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