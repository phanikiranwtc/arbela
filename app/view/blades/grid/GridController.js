Ext.define('Arbela.view.blades.grid.GridController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.gridcontroller',

    onAddColumnButtonClick:function(button){  

        var fieldset = button.up('fieldset');
        var typeArr = [];
             typeArr.push({
                    'type': 'string'
                }, {
                    'type': 'number'
                }, {
                    'type': 'rownumberer'
                },{
                    'type': 'date'
            // },{
            //         'type': 'check'
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
        var win = Ext.create('Arbela.view.blades.grid.GridColumnWindow',{
            values: fieldset
        });
        win.down('form').down('combobox[name=ColumnType]').setStore(typeStore);
        win.show();
    },

     onLoadButtonClick:function(button){  

     	var g = Ext.ComponentQuery.query('dslist')[0];
        var dataSourceitems = g.getStore().getData().items;
        var dataSourcelen=dataSourceitems.length;
        var dataSource={};
        for(var i=0; i<=dataSourcelen-1; i++){
            var obj = dataSourceitems[i].data;
            dataSource[obj.name] = obj;
        }
        var v = this.getView();
        var me = this;
        var value = button.up('gridtoolbar').up('fieldset').down('textfield[name=url]').getValue(),
            dataValue =  button.up('gridtoolbar').up('fieldset').down('combobox[name=datasources]').getValue();
            //v.down('#dataCombo').getValue(), 
        var d = {};
        var blades, values = undefined;
        if(!dataValue){
            if (value) {
                Ext.Ajax.request({
                    url: value,
                    params: {},
                    success: function(response) {
                        var text = response.responseText;
                        me.onLoadDataCombo(text);
                    },
                    failure: function(error) {
                        return Ext.Msg.show({
                            title: 'Request Failed',
                            message: 'Error: we are not able to load the ulr ',
                            buttons: Ext.Msg.OK,
                            icon: Ext.Msg.ERROR
                        });
                    }
                });
            } else {
                return Ext.Msg.show({
                    title: 'Message for you',
                    message: 'Please enter URL',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
            }
        }else{
            var typeObj = Ext.create("Arbela.view.blades.Grid", {});
            window.retVals = Arbela.view.common.ExprParser.parse(values, dataSource,dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(values, dataSource,dataValue); 
                this.setBladeData(d);
            }, typeObj);
             
            //var gridStore = v.down('grid').getStore();
            var colgrid = button.up('gridtoolbar').up('fieldset').down('grid').getStore();
            delete retVals.data[0].id;
            var dataSrc = retVals.data[0];
            var gridFields = Ext.Object.getAllKeys(dataSrc),
            fieldsLen = gridFields.length, gridArr = [];
            for(var i=0; i<fieldsLen; i++){
                var records = {
                    ColumnHeader:gridFields[i],
                    DataIndex:gridFields[i],
                    ColumnType:"gridcolumn",
                    Format: undefined,
                    GroupField:undefined,
                    SummaryType:undefined
                }
                gridArr.push(records);
                //colgrid.loadData(records , false);
            }
            colgrid.loadData(gridArr , false);
        }
    },

      onLoadDataCombo:function(response){ 

        var data = Ext.JSON.decode(response);
        var buckets = data.aggregations.range.buckets;
        var keyArr = [];
            Ext.Object.each(buckets[0], function(key, value, myself) {
                if (Ext.isObject(value)) {
                    var innerkeys = key;
                    Ext.Object.each(value, function(key, value, myself) {
                        keyArr.push(innerkeys + "." + key);
                    });
                } else {
                    keyArr.push(key);
                }
            });
            console.log(keyArr);
       
        var keys = [];
            for (i = 0; i < keyArr.length; i++) {
                keys.push({
                    'name': keyArr[i]
                });
            }
            var fieldsStore = Ext.create('Ext.data.Store', {
                fields: 'name',
                data: keys
            });
            var typeArr = [];
       
        var win = Ext.create('Arbela.view.blades.grid.GridColumnWindow',{
            comboValues:fieldsStore,
            flag:true
        });
        win.hide();
    },

    onRemove: function(grid, rowIdx, colIdx){

        grid.getStore().removeAt(rowIdx);
    },

    onEdit: function(grid, rowIndex, colIndex){
        
        var record = grid.getStore().getAt(rowIndex);
        var window = Ext.create('Arbela.view.blades.grid.GridColumnWindow',{
            title:'Edit grid column',
            rowIndex:rowIndex,
            values: grid

        });
        switch (record.data.ColumnType) {
            case "gridcolumn":
                record.data.ColumnType = 'string';
                break;
            case "numbercolumn":
                record.data.ColumnType = 'number';
                break;
            case "rownumberer":
                record.data.ColumnType = 'rownumberer';
                break;
            case "datecolumn":
                record.data.ColumnType = 'date';
                break;
        }
        var typeArr = [];
         typeArr.push({
                'type': 'string'
            }, {
                'type': 'number'
            }, {
                'type': 'rownumberer'
            },{
                'type': 'date'
        });
        var typeStore = Ext.create('Ext.data.Store', {
            fields: 'type',
            data: typeArr
        });
        window.down('form').down('combobox[name=ColumnType]').setStore(typeStore);
        window.down('form').down('textfield[name=ColumnHeader]').setValue(record.data.ColumnHeader);
        window.down('form').down('combobox[name=ColumnType]').setValue(record.data.ColumnType);
        window.down('form').down('textfield[name=DataIndex]').setValue(record.data.DataIndex);
        window.down('form').down('textfield[name=Format]').setValue(record.data.Format);
        window.down('form').down('checkbox[name=GroupField]').setValue(record.data.GroupField);
        window.down('form').down('combobox[name=SummaryType]').setValue(record.data.SummaryType);
        window.show();
    },

    onSummarySelect: function (comp, record, index) {
        if (comp.getValue() == "" || comp.getValue() == "&nbsp") 
           comp.setValue(null);
    },

    onSaveButtonClick: function(button){
        var formData = button.up('form').getValues();
        var rowIndex = button.up('window').rowIndex;
        var records = {
            ColumnHeader:formData.ColumnHeader,
            DataIndex:formData.DataIndex,
            ColumnType:formData.ColumnType,
            Format:formData.Format,
            GroupField:formData.GroupField,
            SummaryType:formData.SummaryType
        }
        if(rowIndex>=0){
            var gridStore = button.up('window').values.getStore();
            var newRecord = gridStore.getAt(rowIndex);
            newRecord.set(records);
            newRecord.commit();
        }else{
            var gridStore = button.up('window').values.down('grid').getStore();
            gridStore.add(records);
            var newGridRecords =[]
            var settingsFieldGridRecords = button.up('window').values.up('bladeform').newGridRecord;
            if(!settingsFieldGridRecords){
                settingsFieldGridRecords = [];
            }
            settingsFieldGridRecords.push(records);
        }  
        
        button.up('window').hide();
        
    },

    onCloseButtonClick: function(button){ 
        button.up('window').close();
    }
});