Ext.define('Arbela.view.blades.grid.GridToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.gridtoolbar',

    requires: [
        'Ext.button.Button',
        'Arbela.view.blades.grid.GridController'
    ],
    controller: 'gridcontroller',

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
            bind: {
                disabled: '{!enableDataSource}'
            },
            width: 110,
            listeners:{
                click:'onLoadButtonClick'
            }
        }
    ]

});