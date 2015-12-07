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
        modal:true,
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
                xtype: 'combobox',
                fieldLabel: 'Column Type',
                name: 'ColumnType',
                queryMode: 'local',
                valueField:'type',
                displayField: 'type',
                allowBlank: false,
                forceSelection :true,
                listeners:{
                    change:function (combo, newValue, oldValue, eOpts ){ 
                       this.up().down('textfield[name=DataIndex]').setDisabled(false);
                       this.up().down('textfield[name=Format]').setDisabled(true);             
                       if(newValue == 'date'){
                           this.up().down('textfield[name=Format]').setDisabled(false);
                           this.up().down('combobox[name=SummaryType]').setDisabled(false);
                           this.up().down('checkbox[name=GroupField]').setDisabled(false);
                       }else if(newValue == 'rownumberer' ){
                           this.up().down('textfield[name=DataIndex]').setDisabled(true);
                           this.up().down('combobox[name=SummaryType]').setDisabled(true);
                           this.up().down('checkbox[name=GroupField]').setDisabled(true);
                           this.up().down('textfield[name=DataIndex]').reset();
                           this.up().down('textfield[name=Format]').reset();
                           this.up().down('combobox[name=SummaryType]').reset();
                           this.up().down('checkbox[name=GroupField]').reset();

                       }else{
                           this.up().down('textfield[name=Format]').reset();
                           this.up().down('checkbox[name=GroupField]').setDisabled(false);
                           this.up().down('combobox[name=SummaryType]').setDisabled(false);
                       }
                    }
                }
               
            },{
                xtype: 'textfield',
                fieldLabel: 'DataIndex',
                name: 'DataIndex',
                allowBlank: false
                
            },{
                xtype: 'textfield',
                fieldLabel: 'Format',
                name: 'Format',
                disabled :true
                
            },{
                xtype:'checkbox',
                fieldLabel:'Group Field',
                name:'GroupField'
            },{
                xtype:'combobox',
                fieldLabel:'Summary Type',
                name:'SummaryType',
                queryMode:'local',
                displayField:'name',
                forceSelection :true,
                store:Ext.create('Ext.data.Store',{
                    fields:['name','summarytype'],
                    data:[{
                        name:'none',summarytype:''
                    },{
                        name:'count',summarytype:'count'
                    },{
                        name:'sum',summarytype:'sum'
                    },{
                        name:'min',summarytype:'min'
                    },{
                        name:'max',summarytype:'max'
                    },{
                        name:'average',summarytype:'average',
                    }]
                })
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
                            var gridStore = this.up('window').values.down('grid').getStore();
                            var records = {
                                ColumnHeader:formData.ColumnHeader,
                                DataIndex:formData.DataIndex,
                                ColumnType:formData.ColumnType,
                                Format:formData.Format,
                                GroupField:formData.GroupField,
                                SummaryType:formData.SummaryType
                            }
                            gridStore.add(records);
                            this.up('window').hide();
                            this.up('window').values.down('grid')
                            var newGridRecords =[]
                            if(!this.up('window').values.up().newGridRecord){
                                this.up('window').values.up().newGridRecord = [];
                            }
                            this.up('window').values.up().newGridRecord.push(records);
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

});
