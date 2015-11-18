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
        height: 250,
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
                        this.up('fieldset').up('fieldset').down('grid').columns[l-1].show();
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=groupingsummary]').setDisabled(true);
                    }else{
                        this.up('fieldset').up('fieldset').down('grid').columns[l-1].hide();
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
            name: 'groupingsummary',
            boxLabel: 'Grouping Summary',
            listeners:{
                change:function( check, newValue, oldValue, eOpts ){
                    var  l = this.up('fieldset').up('fieldset').down('grid').columns.length;
                    if(newValue == true){
                        this.up('fieldset').up('fieldset').down('grid').columns[l-1].show();
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].show();
                        this.up('fieldset').down('checkboxfield[name=summary]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=summary]').setDisabled(true);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setValue(false);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setDisabled(true);
                    }else{
                        this.up('fieldset').up('fieldset').down('grid').columns[l-1].hide();
                        this.up('fieldset').up('fieldset').down('grid').columns[l-2].hide();
                        this.up('fieldset').down('checkboxfield[name=summary]').setDisabled(false);
                        this.up('fieldset').down('checkboxfield[name=grouping]').setDisabled(false);
                    }
                }
            }
        }]
    },{
        xtype: 'gridpanel',
        ui:'gridcss',
        store: Ext.create('Ext.data.Store',{
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
       }),
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
        }],
        listeners:{
            celldblclick:function( row, td, cellIndex, record, tr, rowIndex, e, eOpts ){
                switch (record.data.ColumnType) {
                        case "gridcolumn":
                            record.data.ColumnType = 'string';
                            break;
                        case "numbercolumn":
                            record.data.ColumnType = 'number';
                            break;
                        case "rownumberer":
                            //flag = true;
                            record.data.ColumnType = 'rownumber';
                            break;
                        case "datecolumn":
                            record.data.ColumnType = 'date';
                            break;
                }
                var grid = row.grid;
                var window = Ext.create('Arbela.view.common.AddGridColumnWindow',{
                    title:'Edit grid column',
                    autoShow: true,
                    autoHeight: true,
                    width: 400,
                    bodyPadding: 10,
                    layout: 'fit',
                    autoScroll: true,
                    values: grid,
                    rowIndex:rowIndex,
                    items:{

                        xtype:'form',
                        layout: 'vbox',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Column Header',
                            name: 'ColumnHeader',
                            allowBlank: false,
                            value:record.data.ColumnHeader   
                        },{
                            xtype: 'textfield',
                            fieldLabel: 'DataIndex',
                            name: 'DataIndex',
                            allowBlank: false,
                            value:record.data.DataIndex
                            
                        },{
                            xtype: 'combobox',
                            fieldLabel: 'Column Type',
                            name: 'ColumnType',
                            queryMode: 'local',
                            valueField:'type',
                            displayField: 'type',
                            allowBlank: false,
                            value:record.data.ColumnType,
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
                            disabled :true,
                            value:record.data.Format
                        },{
                            xtype:'checkbox',
                            fieldLabel:'Group Field',
                            name:'GroupField',
                            value:record.data.GroupField,
                        },{
                            xtype:'combobox',
                             fieldLabel:'Summary Type',
                            name:'SummaryType',
                            queryMode:'local',
                            displayField:'summarytype',
                            value:record.data.SummaryType,
                            store:Ext.create('Ext.data.Store',{
                                fields:['name','summarytype'],
                                data:[{
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
                                        var gridStore = this.up('window').values.getStore();
                                        var rowIndex = this.up('window').rowIndex;
                                        var newRecord = gridStore.getAt(rowIndex);
                                        var records = {
                                            ColumnHeader:formData.ColumnHeader,
                                            DataIndex:formData.DataIndex,
                                            ColumnType:formData.ColumnType,
                                            Format:formData.Format,
                                            GroupField:formData.GroupField,
                                            SummaryType:formData.SummaryType
                                        }
                                        newRecord.set(records);
                                        newRecord.commit();
                                        //this.up('window').values.reconfigure(gridStore); //It is creating issue.
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

                });
                       
                        var typeArr = [];
                         typeArr.push({
                                'type': 'string'
                            }, {
                                'type': 'number'
                            }, {
                                'type': 'rownumber'
                            },{
                                'type': 'date'
                        });
                        var formateArr = [];
                        formateArr.push({
                                'formate':'M d Y'
                            },{
                                'formate':'Y m d'
                            });
                        var formateStore =Ext.create('Ext.data.Store', {
                            fields: 'formate',
                            data: formateArr
                        });
                        var typeStore = Ext.create('Ext.data.Store', {
                            fields: 'type',
                            data: typeArr
                        });
                    window.down('form').down('combobox[name=ColumnType]').setStore(typeStore);
                    window.show();
            }
        }
    }],
    setBladeData: function(datacfg) {
        var me = this;
        var grid = this.items.items[0];
        /*if(datacfg.griddata){ //this condition not executing presently.....
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
        }else{                //this condition presently working......*/
            var settings = datacfg.typeObj.getSettings();
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

            var storeData = settings[settings.length-1].store.getData();
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
        //}
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
