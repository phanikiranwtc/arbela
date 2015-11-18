Ext.define('Arbela.view.db.card.NewCardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbnewcard',

    onComboboxSelect: function(combo, record, eOpts) { 
        var klass = record.data.klass;
        if(klass !== undefined){
            var md = (Ext.create(klass, {})).getSettings();
        }
        if(combo.fieldLabel == "DataSources"){
            combo.up().down('button[name="loaddata"]').enable();
        }
        console.log('Meta Data: ', md);

        var win = this.getView();
        var form = combo.up('bladeform');
        var fs = form.down('fieldset');

        if (fs) {
            if(md !== undefined){
                form.remove(fs);
                fs = null;
            }            
        }

        if(md !== undefined){
            if (md.length > 0) {
                form.add({
                    xtype: 'fieldset',
                    title: 'Settings',
                    items: md,
                    listeners: {
                        afterrender: {
                            fn: function(cmp) {
                            },
                            single: true
                        },
                        scope: this
                    }
                });
            }
        }
	    var combo1; 
        if(md !== undefined){
            for(i=0;i<md.length;i++){ 
                var store = Ext.ComponentQuery.query('dslist')[0].getStore(); 
                var combo = Ext.ComponentQuery.query('#dataCombo')[0];
                if(md[i].xtype == "expressionfield"){
                    var formItems = this.getView().down('form').items,
                        formItemsLen = formItems.length;
                    if(combo.getStore().data.items.length == 0){ 
                        (store.data.items.length) ? combo.setStore(store) : combo.hide(); 
                    }else{
                        
                        for(var i=0; i<= formItemsLen-1; i++){
                            if(formItems.getAt(i).xtype == "bladeform"){
                                var editBlade = formItems.getAt(i),
                                    empDataSrc = editBlade.down('fieldset').down('combo[fieldLabel="DataSources"]');
                                if(empDataSrc.getStore().getData().length == 0){
                                    empDataSrc.setStore(store);
                                }
                            }
                        }
                    }
                    break; 
                }
                if(md[i].xtype == "gridpanel"){
                    md[i].store.removeAll();
                    combo.setStore(store);
                } 
            }
        }

    },

    onComboboxChange: function(combo, newVal, oldVal, eOpts) {
        var record = combo.getStore().findRecord('klass', newVal);
    },

    onToolbarBtnClick: function(btn, e, eOpts) {
        console.log('BUTTON: ', btn.getInitialConfig());
        var btnName = btn.getInitialConfig().name;
        if (btnName === 'save') {
            this.handleSaveBtnClick(arguments);
        }

        if (btnName === 'cancel') {
            this.handleCancelBtnClick(arguments);
        }

    },

    handleSaveBtnClick: function(btn, e, eOpts) {
         

        var v = this.getView();
        var form = v.down('form');
        var blades;

        var values = {};

        var cardVals = form.getValues();

    
        values.showTitle = cardVals.showTitle;
        values.hideTitleBar = cardVals.hideTitleBar;
	    values.titleStyle = cardVals.titleStyle;
        values.name = cardVals.name;

        //there could be multiple blades in a card
        blades = Ext.ComponentQuery.query('bladeform', form);
        var l = blades.length;
        if (l > 0) {
            values.blades = [];
        }

        for (var i = 0; i < l; i++) {
            
            var val = blades[i].getValues();
            val.typeObj = Ext.create(val.type, {});
            val.seriesIndex = blades[i].seriesIndex;
            console.log('====> Blade Values: ', val);
            this.processExpressions(blades[i], val);
            values.blades.push(val);
        }
        
        // var gridRef = this.getView().down('bladeform').down('grid');
        // if(gridRef.getStore().data.length == 0){
        //     var dataSrc = val.griddata.data[0];
        //     var gridFields = Ext.Object.getAllKeys(dataSrc),
        //         fieldsLen = gridFields.length, gridArr = [];
        //     window.colGridfields = ["header", "dataIndex", "type"],
        //         window.gridColmns = gridRef.getColumns();
        //     for(var i=0; i<colGridfields.length; i++){
        //         gridColmns[i].dataIndex = colGridfields[i];
        //     }
        //     for(var i=0; i<fieldsLen-1; i++){
        //         var gridObj = {};
        //         gridObj["header"] = gridFields[i];
        //         gridObj["dataIndex"] = gridFields[i];
        //         gridObj["type"] = "gridcolumn"
        //         gridArr.push(gridObj);
        //     }
        //     console.log(gridArr);
        //     var store = Ext.create('Ext.data.Store', {
        //         fields:gridFields,
        //         data: gridArr
        //     });
        //     gridRef.setStore(store);
        //     window.gridstore = gridRef.getStore(); // store for grid
        // }
        values.updatedOn = Ext.Date.format(new Date(), 'h:i:s A');

        v.fireEvent('addcard', v, values, e, eOpts);
        v.close();
    },

    processExpressions: function(blade, bladeVal) {
        var v = this.getView();
        var me = this;
         
        //check if we have expressions, if so, prepare them for evaluation
        var exprFields = Ext.ComponentQuery.query('expressionfield', blade);
        for (var j = 0; j < exprFields.length; j++) {
            var name = exprFields[j].getName();
            var value = exprFields[j].getValue();

            console.log('Processing expression field: ' + name + ' with value: ' + value);

            var d = {};

            console.log('=====> Datasources: ', v.getDatasources());
             
             var dataValue =  v.down('#dataCombo').getValue();
             var retVal = Arbela.view.common.ExprParser.parse(value, v.getDatasources(),dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(value, v.getDatasources(),dataValue); 
                this.setBladeData(d);

            }, bladeVal.typeObj);

            console.log('retVal: ', retVal);
            bladeVal['exprVal'] = value;
    	    if(retVal !== undefined){
                bladeVal[name] = retVal;
            }
        }

        if(bladeVal.type == "Arbela.view.blades.Grid"){
            var dataValue =  v.down('#dataCombo').getValue();
            var retVal = Arbela.view.common.ExprParser.parse(value, v.getDatasources(),dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(value, v.getDatasources(),dataValue); 
                this.setBladeData(d);

            }, bladeVal.typeObj);
            bladeVal["griddata"] = retVal;
        }

        //set the data on the viewModel so that the bindings are evaluated properly
        bladeVal.typeObj.getViewModel().setData(bladeVal);

        //set the data on the view for any custom data handling specific to the blade
        bladeVal.typeObj.setBladeData(bladeVal);

    },

    handleDataUpdate: function(o, data) {
        console.log('======> DATA UPDATED <======= ', data);


    },

    handleCancelBtnClick: function(btn, e, eOpts) {
        var v = this.getView();
        var form = v.down('form');

        if (form.isDirty()) {
            Ext.Msg.confirm('Confirm', 
                v.dirtyMsg, 
                function(btnId) {
                    if (btnId === 'yes') {
                        v.close();
                    }

            });
        } else {
            v.close();
        }
    },

    onAddBladeBtnClick: function(btn) {
        var form = btn.up('form');
        var l = form.items.length;

        form.insert(l, {xtype: 'bladeform'});
    },

    onGridColumnChange:function(field, newValue, oldValue, eOpts){ 
        var store = field.up('#customGrid').getStore();
        var count = store.getCount();
        var value = field.dataIndex;
        store.getAt(count - 1).data[value] = newValue;
        var formatGrid;
        var formatGridCombo;
        var gridRow = field.el.up('.x-grid-cell');
        var gridCell= Ext.get(gridRow.up().dom.childNodes[2]);
        var gridCombo = Ext.get(gridCell.down('.x-field')).component
        var columnType = gridCombo.getValue();
        if (columnType == "date") {
            formatGrid = Ext.get(gridRow.up().dom.childNodes[3]);
            formatGridCombo = Ext.get(formatGrid.down('.x-field')).component;
            formatGridCombo.setDisabled(false);
        }else{ 
            formatGrid = Ext.get(gridRow.up().dom.childNodes[3]);
            formatGridCombo = Ext.get(formatGrid.down('.x-field')).component;
            formatGridCombo.setDisabled(true);
        }
    },
    onAddColumnButtonClick:function(button){ 
        var fieldset = button.up('fieldset');
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
        var win = Ext.create('Arbela.view.common.AddGridColumnWindow',{
            values: fieldset
        });
        win.down('form').down('combobox[name=ColumnType]').setStore(typeStore);
        win.show();
    },
    onLoadButtonClick:function(button){ 
        var v = this.getView();
        var me = this;
         var value = button.up().up().down('textfield[name=url]').value,
            dataValue =  v.down('#dataCombo').getValue(), d = {};
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
                            icon: Ext.Msg.ERROR,
                        });
                    }
                });
            } else {
                return Ext.Msg.show({
                    title: 'Message for you',
                    message: 'Please enter URL',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                });
            }
        }else{
            var typeObj = Ext.create("Arbela.view.blades.Grid", {});
            window.retVals = Arbela.view.common.ExprParser.parse(values, v.getDatasources(),dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(values, v.getDatasources(),dataValue); 
                this.setBladeData(d);
            }, typeObj);
            var colgrid = v.down('grid').getStore();
            var dataSrc = retVals.data[0];
            var gridFields = Ext.Object.getAllKeys(dataSrc),
                fieldsLen = gridFields.length, gridArr = [];
            //window.colGridfields = ["header", "dataIndex", "type"],
                //window.gridColmns = gridRef.getColumns();
            for(var i=0; i<fieldsLen; i++){
                var records = {
                    ColumnHeader:gridFields[i],
                    DataIndex:gridFields[i],
                    ColumnType:"gridcolumn",
                    Format: undefined
                }
                colgrid.add(records);
            }
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
       
        var win = Ext.create('Arbela.view.common.AddGridColumnWindow',{
            comboValues:fieldsStore,
            flag:true
        });
        win.hide();
    }

});
