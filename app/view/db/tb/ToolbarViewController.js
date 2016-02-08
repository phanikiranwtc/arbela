Ext.define('Arbela.view.db.tb.ToolbarViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbtoolbar',
    requires:['Ext.form.field.Base'],

    onAddCardBtnClick: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('addcard', v, button, e, eOpts);
    },

    onCloneBtnClick: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('clonedashboard', v, button, e, eOpts);
    },

    onRemoveDashboardBtnClick: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('removedashboard', v, button, e, eOpts);
    },
    onLoadeBtnClick: function(button, e, eOpts){
        Ext.create('Ext.window.Window', {
            title: 'Please enter saved dashboard name',
            height: 90,
            width: 300,
            modal:true,
            layout: 'fit',
            items: {  // Let's put an empty grid in just to illustrate fit layout
                xtype:'form',
                items:[{
                    width: 298,
                    xtype: 'textfield',
                    allowBlank:false,
                    //hasFocus: true,
                    listeners:{
                        afterrender: function(field) {
                           Ext.defer(function() {
                               field.focus(true, 100);
                           }, 1);
                        }
                    }
                },{
                    xtype:'panel',
                    layout:{
                        type:'hbox',
                        pack:'center'
                    },
                    items:[{
                        dock: 'bottom',
                        xtype:'button',
                        text:'<b>load</b>',
                        ui: 'plain',
                        formBind: true,
                        handler:function(button){
                            var url = window.location.href;  
                            if(url.indexOf("?")!=0){
                                url = url.substring(0,url.indexOf('?')).trim();
                            }
                            var dashboardname = button.up('panel').up('form').down('textfield').getValue();  
                            url += '?dashboard='+dashboardname;
                            window.location.href = url;
                        }
                    },{
                        xtype: 'tbspacer'
                    },{
                        xtype: 'tbspacer'
                    },{
                        dock: 'bottom',
                        xtype:'button',
                        text:'<b>cancel</b>',
                        ui: 'plain',
                        handler:function(button){
                            button.up('panel').up('form').up('window').close();
                        }
                    }]
                }]  
            }
        }).show();
    }
});
