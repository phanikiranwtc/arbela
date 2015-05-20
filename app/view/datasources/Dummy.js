Ext.define('Arbela.view.datasources.Dummy', {
    extend: 'Arbela.view.api.DataSource',

    // statics: {
    //     niceName: 'Dummy',
    //     desc: 'This is dummy datasource to demonstrate how a datasource need to be implemented'
    // },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'Thing Name',
        name: 'thingname'
    }, {
        xtype: 'textfield',
        fieldLabel: 'URL',
        name: 'url'
    }],

    dataFields: [{
        name: 'name',
        niceName: 'Name'
    }],

    getData: function() {
        return {
            name: 'Arbela'
        };
    }
});