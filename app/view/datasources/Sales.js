Ext.define('Arbela.view.datasources.Sales', {
    extend: 'Arbela.view.api.DataSource',

    // statics: {
    //     niceName: 'Sales Data',
    //     desc: 'Provide sales data'
    // },

    settings: [{
        xtype: 'numberfield',
        fieldLabel: 'Data refresh frequency',
        name: 'refreshfrequency',
        value: 5  //in seconds
    }],

    dataFields: [{
        name: 'amt',
        niceName: 'Amount'
    }],

    getData: function() {
        return {
            amt: '$43149.50'
        };
    }
});