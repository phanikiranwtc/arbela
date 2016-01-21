Ext.define('Arbela.view.db.main.Dashboard', {
    extend: 'Ext.dashboard.Dashboard',
    alias: 'widget.dbdashboard',

    requires: [
        'Arbela.view.db.main.DashboardViewModel',
        'Arbela.view.db.main.DashboardViewController',
        'Arbela.view.db.tb.Toolbar',
        'Arbela.overrides.layout.container.Dashboard'
    ],

    controller: 'dbdashboard',
    viewModel: {
        type: 'dbdashboard'
    },
    config: {
        title:'MyDashboard',
        scrollable: true,
        maxColumns: 3,
        closable: true,
        layout: 'dashboard',
        columnWidths: [],
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
    },

    listeners: {
        boxready:function(){
                         
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
                            /**** following code for changing dashboard name with saved name ****/
                            if(this.flag){
                                this.setTitle(value);
                            }else{
                                var str = window.location.href;
                                var db = str.indexOf('=')+1;
                                if(db){
                                    var dashboardName = str.substr(db);
                                     this.setTitle(dashboardName);
                                }else{
                                    this.setTitle(value); //Setting default name.
                                }
                            }
                            
                            /****************ending*******************************/
                        }
                    }
                }
            });
           
                this.tab.el.down('.x-tab-inner').on('dblclick', function(e, t) {
                    editor.startEdit(t);
                    editor.field.focus(50, true);
                });
                editor.startEdit(this.tab.el.down('.x-tab-inner'));
        },

        'beforerender':'settingCards'
    }

});