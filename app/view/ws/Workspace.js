Ext.define('Arbela.view.ws.Workspace', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.wsworkspace',

    requires: [
        'Arbela.view.ws.WorkspaceViewController',
        'Arbela.view.ws.WorkspaceViewModel',
        'Arbela.view.ws.Toolbar',
        'Arbela.view.ds.List',
        'Arbela.view.db.main.Dashboard',
        'Ext.toolbar.Toolbar',
        'Ext.tab.Panel',
        'Ext.tab.Tab'
    ],

    layout: 'border',
    header: false,
    title: 'My Panel',

    controller: 'workspaceviewcontroller',
    viewModel: {
        type: 'workspaceviewmodel'
    },

    dockedItems: [{
        xtype: 'wstoolbar',
        dock: 'top'
    }],
    
    items: [
        {
            xtype: 'dslist',
            collapsed: true,
            collapsible: true,
            titleCollapse: true,
            region: 'east',
            split: true,
            listeners: {
                addeddatasource: 'onDatasourceAdded'
            }
        },
        {
            xtype: 'tabpanel',
            region: 'center',
            tabPosition: 'left',
            tabRotation: 0,
            items: [
                {
                    xtype: 'dbdashboard',
                    bind: {
                        datasources: {
                            bindTo: '{datasources}',
                            deep: true
                        }
                    }
                },
                {
                    xtype: 'panel',
                    title: 'Add'
                }
            ]
        }
    ]

});