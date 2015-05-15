Ext.define('Arbela.view.common.NewWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.commonnewwindow',

    stores: {
        types: {
            fields: ['name', 'klass'],
            data: []
        }
    }

});