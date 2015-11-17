Ext.define('Arbela.view.datasources.Dummy', {
    extend: 'Arbela.view.api.DataSource',

    statics: {
        niceName: 'Dummy',
        desc: 'This is dummy datasource to demonstrate how a datasource need to be implemented'
    },

    settings: [],

    getData: function() {
        return {
            name: 'Arbela'
        };
    }
});