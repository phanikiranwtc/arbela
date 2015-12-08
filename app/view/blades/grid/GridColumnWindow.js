Ext.define('Arbela.view.blades.grid.GridColumnWindow',{
    extend : 'Ext.window.Window',
    alias: 'widget.gridcolumnwindowtoolbar',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Field',
        'Ext.toolbar.Toolbar'
    ],
    controller: 'gridcontroller',
    title: 'Columns Adding Form',
    autoShow: true,
    autoHeight: true,
    modal:true,
    width: 400,
    bodyPadding: 10,
    layout: 'fit',
    autoScroll: true,
    viewModel:{
        data:{
            columntype:''
        },
        formulas:{
            getColumnType:function(get){
                if(get('columntype')=='rownumberer'){
                    return true;
                }
            },
            getEnableFormat: function(get){
                if(get('columntype')=='date'|| !get('columntype') =='rownumberer'){
                    return true;
                }else{
                    return false;
                }
            },
            getValueColumnType: function(get){
                if(get('columntype')=='rownumberer'){
                    return null;
                }
            }
        }
    },
    items:{

        xtype:'form',
        layout: 'vbox',
        items: [{
            xtype: 'textfield',
            fieldLabel: 'Column Header',
            name: 'ColumnHeader',
            allowBlank: false    
        },{
            xtype: 'combobox',
            fieldLabel: 'Column Type',
            name: 'ColumnType',
            queryMode: 'local',
            valueField:'type',
            displayField: 'type',
            allowBlank: false,
            forceSelection :true,
            bind:{
                value:'{columntype}'
            }
        },{
            xtype: 'textfield',
            fieldLabel: 'DataIndex',
            name: 'DataIndex',
            allowBlank: false,
            bind:{
                value:'{getValueColumnType}',
                disabled:'{getColumnType}'
            }
            
        },{
            xtype: 'textfield',
            fieldLabel: 'Format',
            name: 'Format',
            disabled :true,
            bind:{
                value:'{getValueColumnType}',
                disabled:'{!getEnableFormat}'
            }
            
        },{
            xtype:'checkbox',
            fieldLabel:'Group Field',
            name:'GroupField',
            bind:{
                value:'{!getColumnType}',
                disabled:'{getColumnType}'
            }
        },{
            xtype:'combobox',
            fieldLabel:'Summary Type',
            name:'SummaryType',
            queryMode:'local',
            displayField:'name',
            forceSelection :true,
            bind:{
                value:'{!getColumnType}',
                disabled:'{getColumnType}'
            },
            store:Ext.create('Ext.data.Store',{
                fields:['name','summarytype'],
                data:[{
                    name:'&nbsp',summarytype:' '
                },{
                    name:'count',summarytype:'count'
                },{
                    name:'sum',summarytype:'sum'
                },{
                    name:'min',summarytype:'min'
                },{
                    name:'max',summarytype:'max'
                },{
                    name:'average',summarytype:'average'
                }]
            }),
            listeners: {
                select: 'onSummarySelect'
            }
        }],
         dockedItems: [{
            dock: 'bottom',
            layout: {
                type: 'hbox',
                pack: 'end'
            },
            items:[{
                name: 'save',
                xtype: 'button',
                text: 'Save',
                ui: 'primary',
                formBind:true,
                width: 60,
                listeners: {
                    click:'onSaveButtonClick'
                }
            },{ 
                xtype: 'tbspacer',width: 10
            },{
                name: 'cancel',
                text: 'Cancel',
                xtype: 'button',
                width: 60,
                listeners: {
                    click: 'onCloseButtonClick'
                }
            }]
        }]
    }

});
