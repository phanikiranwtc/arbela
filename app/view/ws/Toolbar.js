Ext.define('Arbela.view.ws.Toolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.wstoolbar',

    requires: [
        'Ext.form.Label',
        'Ext.button.Button'
    ],

    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'label',
            text: 'ARBELA'
        },
        {
            xtype: 'label',
            flex: 1
        },
        {
            xtype: 'button',
            text: 'Notifications'
        },
        {
            xtype: 'button',
            text: 'Data Sources'
        }
    ]

});