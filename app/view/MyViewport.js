Ext.define('Arbela.view.MyViewport', {
    extend: 'Ext.container.Viewport',
    alias: 'widget.myviewport',

    requires: [
        'Arbela.view.ws.Workspace',
        'Ext.panel.Panel'
    ],

    layout: 'fit',

    items: [
        {
            xtype: 'wsworkspace'
        }
    ]

});