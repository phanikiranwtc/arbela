Ext.define('Arbela.view.blades.SupportTickets', {
    requires: [

        'Ext.sparkline.Bar',
        'Ext.Component'
    ],
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Total Support Tickets',
        desc: 'Shows month wise tickets and the total tickets as on today'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Month-wise Tickets Data',
        name: 'value1',
        allowBlank:false,
        processRawValue: function(rawValue) {
            console.log('===>>> processRawValue called: ', rawValue.split(','));
            return rawValue.split(',');
        }
    }, {
        xtype: 'textfield',
        fieldLabel: 'Total tickets',
        name: 'value2',
        allowBlank:false
    }],

    config: {
        height: 90,
        layout: {
            type: 'hbox',
            align: 'stretch'
        },
        cls: 'greenbg',
        items: [{
            xtype: 'sparklineline',
            lineColor: '#FFFFFF',
            lineWidth: 3,
            margin: 20,
            height: 50,
            width: 90,
            values: [] //[2, 4, 6, -3, 7, 10, 3, 5, 9, 2, 4, 6, -3, 7, 10, 3, 5, 9]
        }, {
            xtype: 'component',
            flex: 1,
            bind: {
                html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Support Tickets</small><span class="bigtext">{value2}</span></div>'
            }
        }]
    },
    setBladeData: function(dataCfg) {
        this.down('sparklineline').setValues(dataCfg.value1);
    }
});