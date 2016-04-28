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
    config: {},
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
        value: Arbela.util.Utility.api.summary,
        name: 'url',
        listeners:{
            change:function( check, newValue, oldValue, eOpts ){
                if(this.up().down('combobox[name=datasources]').getStore().data.items.length != 0){
                    if(this.getValue() == ""){
                        this.up().down('combobox[name=datasources]').setDisabled(false);
                    }else{
                        this.up().down('combobox[name=datasources]').setDisabled(true);
                        this.up().down('label[text=OR]').setHidden(true);
                    }
                }
            }
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
            reference: 'groupingRef',
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
            reference: 'groupingsummaryRef',
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
    
    processingURLRespondedText: function(responseText, grid, fields) {
        
        var formattedData = Arbela.util.Utility.dataformatter(responseText);

        var store = Ext.create('Ext.data.Store',{
            data: formattedData,
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
        this.add(grid);
    }
    
});
