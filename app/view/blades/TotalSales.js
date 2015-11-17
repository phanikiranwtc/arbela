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
        allowBlank:false,
        processRawValue: function(rawValue) {
            // console.log('===>>> processRawValue called: ', rawValue.split(','));
            return rawValue.split(',');
        }
    }, {
        xtype: 'expressionfield',
        allowBlank:false,
        fieldLabel: 'Expression',
        name: 'value3'
    },{
        xtype: 'combobox',
        itemId:'dataCombo',
        fieldLabel: 'DataSources',
        name: 'datasources',
        emptyText: 'Select a datasources',
        queryMode: 'local',
        store:'',
        valueField: 'name',
        displayField: 'name',
        triggerAction: 'all',
        listeners: {
            select: 'onComboboxSelect',
            change: 'onComboboxChange'
        }
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
                html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Total Sales</small><span class="bigtext">{value3}</span></div>'
            }
        }]
    },
    setBladeData: function(dataCfg) {
        console.log('=====> SETTING BLADE DATA <====== ', dataCfg);
        this.down('sparklineline').setValues(dataCfg.value1);
        this.getViewModel().setData(dataCfg);
    }
});
