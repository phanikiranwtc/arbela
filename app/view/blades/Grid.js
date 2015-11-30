Ext.define('Arbela.view.blades.Grid', {
    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller',
        'Arbela.view.common.GridToolbar',
    ],
    extend: 'Arbela.view.api.Blade',
    xtype: 'dynamicgrid',
    statics: {
        niceName: 'Grid',
        desc: 'Shows the list to create a dynamic grid'
    },
    items: {
        xtype: 'grid',
        ui:'gridcss',
        itemId: 'outputGrid',
        //columnLines:true,
        maxHeight:300,
        columns: [],
        features:[{
            ftype:'grouping',id:'groupingField'
        },{
            ftype:'groupingsummary',id:'groupingsummaryField'
        },{
            ftype:'summary',id:'summaryId'
        }]
    },
    config: {
       // height: 250,
        width: 300
    },
    settings: [{
        xtype: 'combobox',
        itemId:'dataCombo',
        fieldLabel: 'DataSources',
        name: 'datasources',
        emptyText: 'Select a datasources',
        queryMode: 'local',
        valueField: 'name',
        displayField: 'name',
        triggerAction: 'all',
        listeners: {
            select: 'onComboboxSelect',
            change: 'onComboboxChange'
        }
    },{
        xtype: 'label',
        forId: 'myFieldId',
        text: 'OR',
        cls:'orlabel'
    },{
        xtype: 'textfield',
        fieldLabel: 'URL',
        value: Arbela.util.Utility.api.summary,//'http://192.168.1.54/steven/arbela-product/resources/data/summary.json',
        name: 'url'
    },{
        xtype:'commongridtoolbar'
    },{
        xtype:'fieldset',
        title:'Features',
        items:[{
            xtype: 'checkboxfield',
            name: 'summary',
            boxLabel: 'Summary',
            listeners:{
                change:function( check, newValue, oldValue, eOpts ){
                    var  l = this.up('fieldset').up('fieldset').down('grid').columns.length;
                    if(newValue == true){
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].show();
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setDisabled(true);
                    }else{
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].hide();
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setDisabled(false);
                    }
                }
            }
        },{
            xtype: 'checkboxfield',
            name: 'grouping',
            boxLabel: 'Grouping',
            listeners:{
                change:function( check, newValue, oldValue, eOpts ){
                    var  l = this.up('fieldset').up('fieldset').down('grid').columns.length;
                    if(newValue == true){
                        this.up('fieldset').up('fieldset').down('grid').columns[l-3].show();
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setDisabled(true);
                    }else{
                        this.up('fieldset').up('fieldset').down('grid').columns[l-3].hide();
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setDisabled(false);
                    }
                }
            }
        },{
            xtype: 'checkboxfield',
            name: 'groupingsummary',
            boxLabel: 'Grouping Summary',
            listeners:{
                change:function( check, newValue, oldValue, eOpts ){
                    var  l = this.up('fieldset').up('fieldset').down('grid').columns.length;
                    if(newValue == true){
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].show();
                        this.up('fieldset').up('fieldset').down('grid').columns[l-3].show();
                        this.up('fieldset').down('checkboxfield[name=summary]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=summary]').setDisabled(true);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setDisabled(true);
                    }else{
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].hide();
                        this.up('fieldset').up('fieldset').down('grid').columns[l-3].hide();
                        this.up('fieldset').down('checkboxfield[name=summary]').setDisabled(false);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setDisabled(false);
                    }
                }
            }
        }]
    },{
        xtype: 'gridpanel',
        ui:'gridcss',
        selModel: 'rowmodel', //this is default model . If it is not working need to change css styles ...
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
                            //flag = true;
                            return 'rownumber';
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
               hidden:true
           },{
                text:'Summary Type',
                dataIndex:'SummaryType',
                menuDisabled: true, 
                hidden:true
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
                var gridStore = grid.getStore();
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
    }],
    setBladeData: function(datacfg) {  
        var me = this;
        var grid = this.items.items[0];
        if(datacfg.griddata){ //this condition for rendering grid with data sources data
            var frstrw = datacfg.griddata.data[0];
            var fields = Ext.Object.getAllKeys(frstrw),
                fieldsLen = fields.length;
            for(var i=0; i<=fieldsLen-1; i++){
                var column = Ext.create('Ext.grid.column.Column', {
                    text: fields[i],
                    flex: 1,
                    dataIndex: fields[i],
                    menuDisabled: true,
                });
                if(i==0){
                    grid.columnManager.headerCt.insert(0, column);
                }else{
                    grid.columnManager.headerCt.insert(i, column);
                }
            }
            me.createGrid(datacfg.griddata, fields);
        }else{                //This is for rendering grid with custom columns
            if(datacfg.settingsData){ 
                var dataLen = datacfg.settingsData.length;
                var  arr=[];
                for(var d=0;d<=dataLen-1;d++){
                    var data={};
                    data['data'] = datacfg.settingsData[d];
                    arr.push(data);
                } 
                var storeData={"items":arr};
            } 
            if(datacfg.typeObj){        //checking this condition becoz of "Error while running task"
                var gridRefData = datacfg.typeObj.gridRefData;
                if(gridRefData){
                    var gridRefDataLen = gridRefData.length;
                    var  arr=[];
                    for(var d=0;d<=gridRefDataLen-1;d++){
                        var data={};
                        data['data'] = gridRefData[d];
                        arr.push(data);
                    } 
                    var storeData={"items":arr};
                }else if(datacfg.typeObj.newGridData){
                    var  arr=[];
                    var newGridDataLen = datacfg.typeObj.newGridData.length;
                    for(var d=0;d<=newGridDataLen-1;d++){
                        var data={};
                        data['data'] = datacfg.typeObj.newGridData[d];
                        arr.push(data);
                    } 
                    var storeData={"items":arr};
                }
            

                var flag;
                grid.getView().getFeature('groupingsummaryField').disable();
                grid.getView().getFeature('groupingField').disable();
                grid.getView().getFeature('summaryId').disable();

                if( datacfg.grouping ){
                    grid.getView().getFeature('groupingField').enable();
                }
                if(datacfg.summary){
                    grid.getView().getFeature('summaryId').enable();
                }
                if(datacfg.groupingsummary){
                    grid.getView().getFeature('groupingsummaryField').enable();
                }

                
                var gridItems = storeData.items;
                var fields = [];
                for (var j = 0; j < gridItems.length; j++) {
                    var items = gridItems[j].data;
                    switch (items.ColumnType) {
                        case "string":
                            items.ColumnType = 'gridcolumn';
                            break;
                        case "number":
                            items.ColumnType = 'numbercolumn';
                            break;
                        case "rownumber":
                            flag = true;
                            items.ColumnType = 'rownumberer';
                            break;
                        case "date":
                            items.ColumnType = 'datecolumn';
                            break;
                    }
                    fields.push(items.DataIndex);
                }
                if (flag) {
                    flag = false;
                    column = Ext.create('Ext.grid.column.Column', {
                        xtype: items.ColumnType,
                        text: items.ColumnHeader,
                        flex: 1,
                        menuDisabled: true, 
                        renderer: function(v, p, record, rowIndex) {
                            return ++rowIndex;
                        }
                    });
                }
                grid.columnManager.headerCt.insert(0, column);
                var index = grid.getColumns().length;
                for (var i = 0; i < gridItems.length; i++) {
                    var items = gridItems[i].data;
                    var column;
                    if(items.GroupField){
                       grid.getStore().setGroupField( items.DataIndex);
                       grid.presentGroupField = items.DataIndex;
                    }
                    
                    if ( items.ColumnType != 'rownumberer' && items.ColumnType != 'datecolumn' ) {
                        column = Ext.create('Ext.grid.column.Column', {
                            xtype: items.ColumnType,
                            text: items.ColumnHeader,
                            flex: 1,
                            summaryType:items.SummaryType,
                            dataIndex: items.DataIndex,
                            menuDisabled: true
                        });
                    }else if(items.ColumnType == 'datecolumn'){
                        column = Ext.create('Ext.grid.column.Column', {
                            xtype: items.ColumnType,
                            text: items.ColumnHeader,
                            flex: 1,
                            Format: items.Format,
                            dataIndex: items.DataIndex,
                            menuDisabled: true,
                            summaryType:items.SummaryType,
                            renderer: function(v, p, record, rowIndex) {
                                var d = new Date(v);
                                return Ext.Date.format(d, column.Format);
                           }
                        });
                    }
                    grid.columnManager.headerCt.insert(index++, column);
                }
                if(!datacfg.datasources){
                    if (datacfg.url) {
                        Ext.Ajax.request({
                            url: datacfg.url,
                            params: {},
                            success: function(response) {
                                var text = response.responseText;
                                me.createGrid(text, fields);
                            },
                            failure: function(error) {
                                return Ext.Msg.show({
                                    title: 'Request Failed',
                                    message: 'Error: we are not able to load the URL ',
                                    buttons: Ext.Msg.OK,
                                    icon: Ext.Msg.ERROR,
                                });
                            }
                        });
                    } else {
                        return Ext.Msg.show({
                            title: 'Message for you',
                            message: 'Please enter URL for Sales By Year data Visual',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.INFO,
                        });
                    }
                }
                 else{
                    var frstrw = datacfg.griddata.data[0];
                    var fields = Ext.Object.getAllKeys(frstrw);
                    me.createGrid(datacfg.griddata, fields);
                }
            }
        }
    },
    createGrid: function(responceText, fields) { 
        if(responceText.data){
            var values = responceText.data;

        }else{
            var data = Ext.JSON.decode(responceText);
            this.getGridData(data);
            var buckets = this.value;
            var values = [];
            var val;
            for (i = 0; i < buckets.length; i++) {
                var objectData = buckets[i];
                Ext.Object.each(objectData, function(key, value, myself) {
                    if (Ext.isObject(value)) {
                        var keys = key;
                        Ext.Object.each(value, function(key, value, myself) {
                            var inKey = keys + "." + key;
                            objectData[inKey] = value;
                        });
                    }
                });
                values.push(objectData);
            }
        }
        var stores = Ext.create('Ext.data.Store', {
            fields: fields,
            data: values,
            groupField:this.items.items[0].presentGroupField
        });
        this.items.items[0].setStore(stores);
    },
    getGridData:function(data) {
        var me = this;
        Ext.Object.each(data, function(key, value, myself) {
            if (key == 'buckets') {
                me.value = value; // stop the iteration
            } else {
                me.getGridData(value);
            }
        });
    }
});
