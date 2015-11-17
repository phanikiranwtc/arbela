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
            defaults:{
                tabConfig: {
                    listeners:{
                        boxready: function(){
                            var editor = new Ext.Editor({
                                updateEl: true,
                                alignment: 'l-l',
                                autoSize: {
                                   width: 'boundEl'
                                },
                                field: {
                                   xtype: 'textfield'
                                },
                                listeners:{  
                                    complete:{
                                        scope:this,
                                        fn:function( me, value, startValue, eOpts){
                                            this.card.up('tabpanel').updateLayout();
                                        }
                                    }
                                }
                            });
                            if(this.el.down('.mytitle')){
                                editor.startEdit(this.el.down('.mytitle').dom);
                                this.el.down('.mytitle').on('dblclick', function(e, t) {
                                    editor.startEdit(t);
                                    editor.field.focus(50, true);
                                });
                            }
                        }
                    }
                }
            },
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