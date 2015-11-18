Ext.define('Arbela.view.blades.SparklineLine', {
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Sparkline - Line',
        desc: 'Renders values as line sparkline'
    },

    settings: [{
        xtype: 'expressionfield',
        fieldLabel: 'Expression',
        name: 'value1',
        allowBlank:false
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
            lineColor: '#ffffff',
            
            lineWidth: 1,
            margin: 20,
            height: 50,
            width: 90,
            name: 'sparkline',
            values: [],
            //tipTpl : new Ext.XTemplate('Testing')
        }, {
            xtype: 'component',
            flex: 1,
            bind: {
                html: '<div style="padding-left: 10px;padding-top: 20px;"><small>Current Value</small><span class="bigtext">{value1}</span></div>'
            }
        }]
    },
    setBladeData: function(dataCfg) {  
        console.log('=====> SETTING BLADE DATA <====== ', dataCfg);
        var values = this.down('sparklineline').getValues();
        if(dataCfg.value1.length){
            var valueLength = dataCfg.value1.length;

            for(var i=0;i<=valueLength-1;i++){
                values.push(dataCfg.value1[i]);
            }

            dataCfg.value1 = dataCfg.value1[valueLength-1];

        }else {
            values.push(dataCfg.value1);
             
        }
        
        console.log('BLADE VALUES: ', values);

        this.down('sparklineline').setValues(values);

        //dataCfg.value1 = dataCfg.value1[valueLength-1];
        // this.down('sparklineline').setValues(dataCfg.value1);
        this.getViewModel().setData(dataCfg);
    }
});
