Ext.define('Arbela.view.blades.TotalSales', {
    extend: 'Arbela.view.api.Blade',

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Value1',
        name: 'value1'
    }, {
        // xtype: 'calculatedfield',
        xtype: 'textfield',
        fieldLabel: 'Value2',
        name: 'value2'
    }],

    viewTemplate: {
        height: 90,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        bodyCls: 'orangebg',
        items: [{
            xtype: 'sparklineline',
            lineColor: '#FFFFFF',
            lineWidth: 3,
            margin: 20,
            height: 50,
            width: 90,
            values: [2, 4, 6, -3, 7, 10, 3, 5, 9, 2, 4, 6, -3, 7, 10, 3, 5, 9]
        }, {
            xtype: 'component',
            flex: 1,
            //align: 'stretch',
            html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Total Sales</small><span class="bigtext">$458,778</span></div>'
        }]
    }
});