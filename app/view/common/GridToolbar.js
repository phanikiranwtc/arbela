Ext.define('Arbela.view.common.GridToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.commongridtoolbar',

    requires: [
        'Ext.button.Button'
    ],

    layout: {
        type: 'hbox',
        pack: 'center'
    },
    items: [
        {
            xtype: 'button',
            name: 'addcolumn',
            text: 'Add Column',
            width: 110,
            listeners :{
                click:'onAddColumnButtonClick'
            }
        },
        {
            xtype: 'button',
            name: 'loaddata',
            text: 'Load Meta-data',
            disabled: true,
            width: 110,
            listeners:{
                click:'onLoadButtonClick'
            }
        }
    ],

    // afterRender: function() {
    //     console.log('onAfterRender');
    //     var items = this.items.items;
    //     var l = items.length;

    //     for (var i = 0; i < l; i++) {
    //         this.relayEvents(items[i], ['click']);    
    //     }

    //     this.callParent(arguments);
        
    // }

});