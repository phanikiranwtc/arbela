Ext.define('Arbela.view.blades.SparklineLine', {
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Sparkline - Line',
        desc: 'Renders values as line sparkline'
    },

    settings: [{
        xtype: 'expressionfield',
        fieldLabel: 'Expression',
        name: 'value1'
    }],

    config: {
        height: 90,
        // cls: 'orangebg',
        // layout: {
        //     type: 'hbox',
        //     align: 'stretch'
        // },
        layout: 'fit',
        items: [{
            xtype: 'sparklineline',
            lineColor: '#000000',
            lineWidth: 1,
            margin: 20,
            height: 50,
            width: 90,
            name: 'sparkline',
            values: []
        }]
    },
    setBladeData: function(dataCfg) {
        console.log('=====> SETTING BLADE DATA <====== ', dataCfg);
        var values = this.down('sparklineline').getValues();
        values.push(dataCfg.value1);
        console.log('BLADE VALUES: ', values);

        this.down('sparklineline').setValues(values);

        // this.down('sparklineline').setValues(dataCfg.value1);
        this.getViewModel().setData(dataCfg);
    }
});