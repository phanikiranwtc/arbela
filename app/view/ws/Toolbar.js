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
    cls: 'branding-header',
    items: [
        {
            xtype: 'image',
            src: 'resources/images/arbela_basic_blue.png',
            width: 48,
            height: 48
        },
        {
            xtype: 'label',
            text: 'arbela',
            cls: 'product-name'
        },
        {
            xtype: 'label',
            flex: 1
        }/*,
        {
            xtype: 'button',
            text: 'Notifications'
        },
        {
            xtype: 'button',
            text: 'Data Sources'
        }*/
    ]

});