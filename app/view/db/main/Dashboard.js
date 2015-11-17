Ext.define('Arbela.view.db.main.Dashboard', {
    extend: 'Ext.dashboard.Dashboard',
    alias: 'widget.dbdashboard',

    requires: [
        'Arbela.view.db.main.DashboardViewModel',
        'Arbela.view.db.main.DashboardViewController',
        'Arbela.view.db.tb.Toolbar'
    ],

    controller: 'dbdashboard',
    viewModel: {
        type: 'dbdashboard'
    },
    config: {
        title:'<span class ="mytitle">My Dashboard</span>',
        scrollable: true,
        maxColumns: 3,
        closable: true,
        parts: {
            'card': 'card'
        },
        datasources: null

    },
    ui: 'navigation',

    applyDatasources: function(dses) {
        console.log('Dashboard: dses=>', dses);
        return dses;
    },

    defaultContent: [],

    tbar: {
        xtype: 'dbtoolbar',
        dock: 'top',
        listeners: {
            addcard: 'onToolbarAddcard',
            clonedashboard: 'onToolbarClonedashboard',
            removedashboard: 'onRemoveDashboard'
        }
    },

    afterRender: function() {
        this.callParent(arguments);
    }

});