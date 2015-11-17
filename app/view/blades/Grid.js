Ext.define('Arbela.view.blades.Grid', {
    requires: [

        'Ext.view.View',
        'Ext.XTemplate',
        'Ext.scroll.Scroller',
        'Arbela.view.common.GridToolbar'
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
        columnLines:true,
        columns: []
    },
    config: {
        height: 150,
        width: 300
    },
    settings: [{
        xtype: 'combobox',
        itemId:'dataCombo',
        fieldLabel: 'DataSources',
        name: 'datasources',
        emptyText: 'Select a datasources',
        queryMode: 'local',
        //store:store,
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
        value: 'http://192.168.1.53/arbela-product/resources/data/mtd.json',
        name: 'url'
    },{
        xtype:'commongridtoolbar'
    },{
        xtype: 'gridpanel',
        ui:'gridcss',
        menuDisabled: true,
        store:Ext.create('Ext.data.Store',{
            fields: ['ColumnHeader', 'DataIndex', 'ColumnType','Format'],
        }),
        selModel: 'cellmodel',
        plugins: {
            ptype: 'cellediting',
            clicksToEdit: 2,
            listeners: {
                edit: function( editor, context, eOpts ){
                    ////debugger;
                    context.record.commit();
                }
            }
        },
        columns:[{ 
                text: 'Column Header', dataIndex: 'ColumnHeader', 
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },{ 
                text: 'Data Index', dataIndex: 'DataIndex', 
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                }
            },{ 
                text: 'Column Type', dataIndex: 'ColumnType', 
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                } 
            },{
                text: 'Format', dataIndex: 'Format', 
                editor: {
                    xtype: 'textfield',
                    allowBlank: false
                } 
        }]
    }],
    setBladeData: function(datacfg) {  //debugger;
        var me = this;
        var grid = this.items.items[0];
        if(datacfg.griddata){
            var frstrw = datacfg.griddata.data[0];
            var fields = Ext.Object.getAllKeys(frstrw),
                fieldsLen = fields.length;
            for(var i=0; i<=fieldsLen-1; i++){
                var column = Ext.create('Ext.grid.column.Column', {
                    //xtype: items.ColumnType,
                    text: fields[i],
                    flex: 1,
                    dataIndex: fields[i],
                    menuDisabled: true
                });
                if(i==0){
                    grid.columnManager.headerCt.insert(0, column);
                }else{
                    grid.columnManager.headerCt.insert(i, column);
                }
            }
            me.createGrid(datacfg.griddata, fields);
        }else{
            var settings = datacfg.typeObj.getSettings();
            var flag;
            //var grid = this.items.items[0];
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
                if ( items.ColumnType != 'rownumberer' && items.ColumnType != 'datecolumn' ) {
                    column = Ext.create('Ext.grid.column.Column', {
                        xtype: items.ColumnType,
                        text: items.ColumnHeader,
                        flex: 1,
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
                        renderer: function(v, p, record, rowIndex) {
                            var d = new Date(v);
                            return Ext.Date.format(d, column.Format);
                       }
                    });
                }
                grid.columnManager.headerCt.insert(index++, column);
            }
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
                            message: 'Error: we are not able to load the ulr ',
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
    },
    createGrid: function(responceText, fields) {  //debugger;
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
            data: values
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
