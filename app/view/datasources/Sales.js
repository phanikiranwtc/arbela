Ext.define('Arbela.view.datasources.Sales', {
    extend: 'Arbela.view.api.DataSource',

    statics: {
        niceName: 'Sales Data',
        desc: 'Provide sales data'
    },

    settings: [{
        xtype: 'numberfield',
        fieldLabel: 'Data refresh frequency',
        name: 'refreshfrequency',
        value: 5  //in seconds
    }],

    loadData: function() {
        this.setData({
            amt: (new Date()).getTime()
        });
    }
});