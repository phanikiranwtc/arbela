Ext.define('Arbela.view.common.WindowToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.commonwindowtoolbar',

    requires: [
        'Ext.button.Button'
    ],

    layout: {
        type: 'hbox',
        pack: 'end'
    },
    items: [
        {
            xtype: 'button',
            name: 'save',
            text: 'Save',
            ui: 'primary',
            width: 60
        },
        {
            xtype: 'button',
            name: 'cancel',
            text: 'Cancel',
            width: 60
        }
    ],

    afterRender: function() {
        console.log('onAfterRender');
        var items = this.items.items;
        var l = items.length;

        for (var i = 0; i < l; i++) {
            this.relayEvents(items[i], ['click']);    
        }

        this.callParent(arguments);
        
    }

});