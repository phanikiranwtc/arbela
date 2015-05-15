Ext.define('Arbela.view.db.Dashboard', {
    extend: 'Ext.dashboard.Dashboard',
    alias: 'widget.dbdashboard',

    requires: [
        'Arbela.view.db.DashboardViewModel',
        'Arbela.view.db.DashboardViewController',
        'Arbela.view.db.Toolbar',
        'Ext.toolbar.Toolbar'
    ],

    controller: 'dbdashboard',
    viewModel: {
        type: 'dbdashboard'
    },
    config: {
        title: 'My Dashboard',
        scrollable: true,
        maxColumns: 3,
        // columnWidths: [0.25, 0.25, 0.25],
        parts: {
            'card': 'card'
        }
    },

    defaultContent: [{
        type: 'card',
        columnIndex: 0,
        height: 80
    }, {
        type: 'card',
        columnIndex: 1,
        height: 80
    }, {
        type: 'card',
        columnIndex: 2,
        height: 80
    }],

    dockedItems: [
        {
            xtype: 'dbtoolbar',
            dock: 'top',
            listeners: {
                addcard: 'onToolbarAddcard',
                clonedashboard: 'onToolbarClonedashboard'
            }
        }
    ]

});