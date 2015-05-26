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

    dataFields: [{
        name: 'amt',
        niceName: 'Amount'
    }],

    //default data
    data: {
        amt: 12345
    },

    // getData: function() {
    //     return this.getData();
    // },

    startRefreshTimer: function() {
        var me = this;
        // task = {
        //     run: function() {
        //         me.setData({
        //             amt: (new Date()).getTime()
        //         })
        //     },
        //     interval: 10000,
        //     scope: me
        // };

        var task = Ext.TaskManager.newTask({
            run: function() {
                me.setData({
                    amt: (new Date()).getTime()
                });
            },
            interval: 10000,
            scope: me
        });

        task.start();
    }
});