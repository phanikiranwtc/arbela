Ext.define('Arbela.view.blades.grid.SettingsGrid',{
  extend:'Ext.grid.Panel',
  xtype: 'settingsgrid',
  ui:'gridcss',
  itemId: 'columnGrid',
  columns:[{ 
    text: 'Column Header', 
    dataIndex: 'ColumnHeader',
    menuDisabled: true, 
  },{ 
    text: 'Data Index', 
    dataIndex: 'DataIndex',
    menuDisabled: true, 
  },{ 
    text: 'Column Type', 
    menuDisabled: true, 
    dataIndex: 'ColumnType',
    renderer:function(value){
      switch (value) {
        case "gridcolumn":
            return 'string';
            break;
        case "numbercolumn":
            return 'number';
            break;
        case "rownumberer":
            return 'rownumberer';
            break;
        case "datecolumn":
            return 'date';
            break;
        }
      return value;
    }
  },{
    text: 'Format', 
    dataIndex: 'Format',
    menuDisabled: true, 
  },{
    xtype: 'widgetcolumn',
    widget: {
      xtype: 'checkbox',
      value:'GroupField',
      listeners:{
        change:function(th,newValue,oldValue){
           if( th.getWidgetRecord() && ( newValue  !== th.getWidgetRecord().get('GroupField')) ){
              th.getWidgetRecord().set('GroupField',newValue);
              th.getWidgetRecord().commit();
           }
        }
      }
    },
    text:'Group Field',
    dataIndex:'GroupField',
    menuDisabled: true, 
    bind:{
      hidden:'{enableGroupColumns}'
    }
  },{
      text:'Summary Type',
      dataIndex:'SummaryType',
      menuDisabled: true,
      bind:{
        hidden:'{enableSummeryColumns}'
      }
  },{
      xtype: 'actioncolumn',
      //width: 0,
      menuDisabled: true,
      sortable: false,
      resizable: false,
      text: "Action",
      items: [{
          icon: 'resources/images/edit.png',
          tooltip: 'Edit',
          handler: 'onEdit'
      },{
          xtype:'tbspacer'
      },{
          icon: 'resources/images/delete.png',
          tooltip: 'Remove',
          handler: 'onRemove'
      }]
  }],
  listeners:{
    beforerender: function(grid){
      var count = 0;
      count ++;
      var store = Ext.create('Ext.data.Store',{
        storeId: 'settingGridStore'+count,
        fields: [
        'ColumnHeader', 
        'DataIndex','ColumnType',
        'Format',
        {
           name : 'GroupField',
           defaultValue: false,
           type:'boolean'
        },
        'SummaryType'
        ],
        listeners:{
          add:function(th,records){
             if(records && records.length > 0 ){
                 if( records[0].get('GroupField') ){
                     this.removeOtherGroupFields(records[0]);
                 }

             }
                 
          },
          update:function(th,record,type){
             if(!this.instoreProcess && type != 'edit'){
                 if( record.get('GroupField') ){
                     this.removeOtherGroupFields(record);

                 }

             }

          }
        },
        removeOtherGroupFields:function(presentRecord){
           if(presentRecord){
               this.instoreProcess = true;
               var querygroupFields = this.query('GroupField',true);
               for(var i=0;i<querygroupFields.getCount();i++){
                   if( querygroupFields.getAt(i) != presentRecord ){
                           querygroupFields.getAt(i).set('GroupField',false);
                           querygroupFields.getAt(i).commit();
                   }

               }  
               this.instoreProcess = false; 
           }
        }
      });
      grid.setStore(store);
    }
  }
});