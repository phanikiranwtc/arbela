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
    removeDbConfirmMsg: 'Are you sure you want to remove this dashboard from the workspace?',

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
            ui: 'navigation',
            activeTab: 1,
            items: [
                {
                    xtype: 'panel',
                    title: 'Add',
                    addTab: true,
                    icon: 'resources/images/add-24.png'
                },
                {
                    xtype: 'dbdashboard',
                    bind: {
                        datasources: {
                            bindTo: '{datasources}',
                            deep: true
                        }
                    },
                    listeners: {
                        removedashboard: 'onRemoveDashboard'
                    }
                }
            ],
            listeners: {
                beforetabchange: function(tabPnl, newCard, oldeCard) {
                    if (newCard.addTab) {
                        var count = tabPnl.items.getCount();
                        var db = Ext.create({
                            xtype: 'dbdashboard',
                            bind: {
                                datasources: {
                                    bindTo: '{datasources}',
                                    deep: true
                                }
                            },
                            listeners: {
                                removedashboard: 'onRemoveDashboard'
                            }
                        });
                        tabPnl.add(db);
                        tabPnl.setActiveItem(db);
                        return false;
                    }
                }
            }
        }
    ]

});