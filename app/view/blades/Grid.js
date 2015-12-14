Ext.define('Arbela.view.blades.Grid', {
    requires: [
        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller',
        'Arbela.view.blades.grid.GridToolbar',
        'Arbela.view.blades.grid.SettingsGrid',
        'Ext.grid.feature.Summary',
        'Ext.grid.feature.Grouping',
        'Ext.grid.feature.GroupingSummary'
    ],
    extend: 'Arbela.view.api.Blade',
    xtype: 'dynamicgrid',
    statics: {
        niceName: 'Grid',
        desc: 'Shows the list to create a dynamic grid'
    },
    config: {
        //width: 300
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
        forceSelection :true,
        bind: {
            value: '{datasources}'
        },
        listeners: {
            select: 'onComboboxSelect',
            change: 'onComboboxChange'
        }
    },{
        xtype: 'label',
        forId: 'myFieldId',
        text: 'OR',
        cls:'orlabel',
        bind : {
             hidden : '{enableDataSource}'
        }
    },{
        xtype: 'textfield',
        fieldLabel: 'URL',
        value: Arbela.util.Utility.api.summary, //'http://192.168.1.54/steven/arbela-product/resources/data/summary.json',
        name: 'url',
        bind : {
             disabled: '{enableDataSource}',
             value:'{enableTextFieldValue}'
        }
    },{
        xtype:'gridtoolbar'
    },{
        xtype:'fieldset',
        title:'Features',
        
        items:[{
            xtype: 'checkboxfield',
            name: 'summary',
            boxLabel: 'Summary',
            reference: 'summaryRef',
            bind : {
                value:'{summary}',
                disabled : '{groupingsummary}'
            }
        },{
            xtype: 'checkboxfield',
            name: 'grouping',
            boxLabel: 'Grouping',
            reference: 'groupingRef',
            bind : {
                value:'{grouping}',
                disabled : '{groupingsummary}'
            }
        },{
            xtype: 'checkboxfield',
            name: 'groupingsummary',
            boxLabel: 'Grouping Summary',
            reference: 'groupingsummaryRef',
            bind: {
                value:'{groupingsummary}',
                disabled: '{!enablegroupingsummary}'
            }
        }]
    },{
        xtype: 'settingsgrid'
    }],
    setBladeData: function(datacfg) {
        var me = this;
        if(datacfg.typeObj){ 
            if(datacfg.settingsData){ 
                var dataLen = datacfg.settingsData.length;
                var  arr=[];
                for(var d=0;d<=dataLen-1;d++){
                    var data={};
                    data['data'] = datacfg.settingsData[d];
                    arr.push(data);
                } 
                var settingsGridStoreData={"items":arr},
                    settingsGridStoreLength = settingsGridStoreData.items.length;
            }else{
                var settingsGridStoreData= datacfg.typeObj.settingsGridStore.data,
                    settingsGridStoreLength = settingsGridStoreData.length;
            } 
            
            var fields = [],
                flag,
                presentGroupField,
                featuresArray=[];

            if(datacfg.summary){

                var features ={};
                features['ftype']='summary',
                featuresArray.push(features);
            }
            if( datacfg.grouping ){

                var features ={};
                features['ftype']='grouping',
                featuresArray.push(features);
            }
            if(datacfg.groupingsummary){

                var features ={};
                features['ftype']='groupingsummary',
                featuresArray.push(features);
            }
                
            /*
             *  Creating Dynamic grid and providing features depending on User requirement
             *
             */
            var grid = Ext.create('Ext.grid.Panel',{
                ui:'gridcss',
                itemId: 'outputGrid',
                maxHeight:300,
                features:featuresArray
            });

            for (var j = 0; j <= settingsGridStoreLength-1; j++) {

                var items = settingsGridStoreData.items[j].data;
                switch (items.ColumnType) {
                    case "string":
                        items.ColumnType = 'gridcolumn';
                        break;
                    case "number":
                        items.ColumnType = 'numbercolumn';
                        break;
                    case "rownumberer":
                        flag = true;
                        items.ColumnType = 'rownumberer';
                        break;
                    case "date":
                        items.ColumnType = 'datecolumn';
                        break;
                }
                if(items.DataIndex){

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

                    grid.columnManager.headerCt.insert(0, column);

                }else{
                    var formate;
                    if(items.Format){
                        formate = 'date('+'"'+items.Format+'"'+')';
                    }
                    var column = Ext.create('Ext.grid.column.Column', {
                        xtype: items.ColumnType,
                        dataIndex: items.DataIndex,
                        text: items.ColumnHeader,
                        flex: 1,
                        menuDisabled: true,
                        summaryType:items.SummaryType,
                        formatter:formate 
                    });

                    grid.columnManager.headerCt.insert(j, column);
                }                
                
                if(items.GroupField){

                   grid.presentGroupField = items.DataIndex;

                }
            }
       
            if(!datacfg.datasources){

                if (datacfg.url) {

                    var url = datacfg.url;
                    me.processingURLRequest(url, grid, fields);

                } else {
                    return Ext.Msg.show({
                        title: 'Message for you',
                        message: 'Please enter URL for Sales By Year data Visual',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                }

            }else{

                var gridDataLen = datacfg.griddata.data.length;
                var dataSourceData = [];
                for( var d = 0; d<=gridDataLen-1; d++){

                    var data = datacfg.griddata.data[d];
                    dataSourceData.push(data);
                }
                me.processingDynamicGrid(dataSourceData, grid, fields)
            }
        }
    },

    processingURLRequest:function(url, grid, fields){
        var me = this;
        Ext.Ajax.request({
            url: url,
            params: {},
            success: function(response) {
                var text = response.responseText;
                var data = Ext.JSON.decode(text);
                me.processingURLRespondedText(data, grid,fields);
            },
            failure: function(error) {
                return Ext.Msg.show({
                    title: 'Request Failed',
                    message: 'Error: we are not able to load the URL ',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        },scope=this);
    },
    
    processingURLRespondedText: function(responceText, grid, fields) {
        var me = this;
        me.processingfindindBuckets(responceText, grid, fields);
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
        me.processingDynamicGrid(values,grid,fields);
    },
    processingfindindBuckets:function(data, grid, fields) {
        var me = this;
        Ext.Object.each(data, function(key, value, myself) {
            if (key == 'buckets') {
                me.value = value; // stop the iteration
            } else {
                me.processingURLRespondedText(value, grid, fields);
            }
        });
    },
    processingDynamicGrid:function(data, grid, fields){
        var me = this;
        var store = Ext.create('Ext.data.Store',{
            //pageSize:10,
            data: data,
            fields: fields,
            groupField:grid.presentGroupField,
            proxy:{
              type:"memory",
              enablePaging : true,
              reader: {
                  type: 'json',
                  rootProperty: 'data',
                  totalProperty: 'totalCount',
                  successProperty: 'success'
              }
            }
        });
        grid.reconfigure(store);
        //grid.setStore(store);
        me.add(grid);
    }
    
});
