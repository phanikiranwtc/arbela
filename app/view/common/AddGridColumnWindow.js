Ext.define('Arbela.view.common.AddGridColumnWindow',{
    extend : 'Ext.window.Window',
    alias: 'widget.commoncolumnwindowtoolbar',
    requires: [
        'Ext.button.Button',
        'Ext.form.field.Field',
        'Ext.toolbar.Toolbar'
    ],
        title: 'Columns Adding Form',
        autoShow: true,
        autoHeight: true,
        width: 400,
        bodyPadding: 10,
        reference :'AddGridColumnWindow',
        referenceHolder :true,
        layout: 'fit',
        itemId: 'AddGridColumnWindow',
        autoScroll: true,
        items:{

            xtype:'form',
            layout: 'vbox',
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Column Header',
                name: 'ColumnHeader',
                allowBlank: false    
            },{
                xtype: 'textfield',
                fieldLabel: 'DataIndex',
                name: 'DataIndex',
                allowBlank: false
                
            },{
                xtype: 'combobox',
                fieldLabel: 'Column Type',
                name: 'ColumnType',
                queryMode: 'local',
                valueField:'type',
                displayField: 'type',
                allowBlank: false,
                listeners:{
                    change:function (combo, newValue, oldValue, eOpts ){ 
                        if(newValue == 'date'){
                            this.up().down('textfield[name=Format]').setDisabled(false);
                        }else{
                            this.up().down('textfield[name=Format]').setDisabled(true);
                        }
                    }
                }
               
            },{
                xtype: 'textfield',
                fieldLabel: 'Format',
                name: 'Format',
                disabled :true
                
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
                        click:function(button){ 
                            var formData = this.up('form').getValues();
                            var gridStore = this.up('window').values.getStore();
                            //var count = gridStore.getCount();
                            //var record = gridStore.getAt(count - 1);
                            var records = {
                                ColumnHeader:formData.ColumnHeader,
                                DataIndex:formData.DataIndex,
                                ColumnType:formData.ColumnType,
                                Format:formData.Format
                            }
                            gridStore.add(records);
                            this.up('window').hide();
                        }
                    }
                },{ 
                    xtype: 'tbspacer',width: 10
                },{
                    name: 'cancel',
                    text: 'Cancel',
                    xtype: 'button',
                    width: 60,
                    listeners: {
                        click: function(button){ 
                            this.up('window').close();
                        }
                    },
                }]
            }]
        }

       // }    
});
