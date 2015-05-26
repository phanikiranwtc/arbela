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
        title: 'My Dashboard',
        scrollable: true,
        maxColumns: 3,
        // columnWidths: [0.25, 0.25, 0.25],
        parts: {
            'card': 'card'
        },
        datasources: null

    },

    applyDatasources: function(dses) {
        console.log('Dashboard: dses=>', dses);
        return dses;
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
    ],

    afterRender: function() {
        this.callParent(arguments);

        var editor = new Ext.Editor({
            updateEl: true,
            alignment: 'l-l',
            autoSize: {
                width: 'boundEl'
            },
            field: {
                xtype: 'textfield'
            }
        });

    }

});