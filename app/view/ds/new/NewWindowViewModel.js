Ext.define('Arbela.view.ds.new.NewWindowViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.commonnewwindow',

    stores: {
        types: {
            fields: ['name', 'niceName', 'klass'],
            data: []
        }
    }

});