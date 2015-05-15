Ext.define('Arbela.view.datasources.Sales', {
    extend: 'Arbela.view.api.DataSource',

    desc: 'This is dummy datasource to demonstrate how a datasource need to be implemented',

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Sales Amount',
        name: 'salesamt'
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