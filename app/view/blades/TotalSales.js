Ext.define('Arbela.view.blades.TotalSales', {
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Total Sales',
        desc: 'Shows month wise sales and the total sales as on today'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Month-wise Sales Data',
        name: 'value1',
        processRawValue: function(rawValue) {
            console.log('===>>> processRawValue called: ', rawValue.split(','));
            return rawValue.split(',');
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Total Sales (in $)',
        name: 'value2'
    }, {
        xtype: 'expressionfield',
        xtype: 'textarea',
        fieldLabel: 'Expression',
        name: 'value3'
    }],

    config: {
        height: 90,
        cls: 'orangebg',
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        items: [{
            xtype: 'sparklineline',
            lineColor: '#FFFFFF',
            lineWidth: 3,
            margin: 20,
            height: 50,
            width: 90,
            name: 'sparkline',
            values: []          //2,4,6,-3,7,10,3,5,9,2,4,6,-3,7,10,3,5,9
        }, {
            xtype: 'component',
            flex: 1,
            bind: {
                html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Total Sales</small><span class="bigtext">{value2}</span></div>'
            }
        }]
    },
    setBladeData: function(dataCfg) {
        this.down('sparklineline').setValues(dataCfg.value1);
    }
});