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
                   // md[i].store.removeAll();
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
        if(btn.url){
            var cardVals = btn;
        }else if(btn.blades){
            var cardVals = btn;
        }
        else {
            var cardVals = form.getValues();
            console.log(cardVals);
        }

    
        values.showTitle = cardVals.showTitle;
        values.hideTitleBar = cardVals.hideTitleBar;
	    values.titleStyle = cardVals.titleStyle;
        values.name = cardVals.name;
        values.colIdx = cardVals.colIdx;
        //values.columnWidth = cardVals.columnWidth;
        //values.settingsData = cardVals.settingsData;
        if(!btn.blades){
            //there could be multiple blades in a card
            blades = Ext.ComponentQuery.query('bladeform', form);
        }else{
            blades = btn.blades;
        }
        var l = blades.length;
        if (l > 0) {
            values.blades = [];
        }
 
        for (var i = 0; i < l; i++) {
            
            if(btn.url){
                var val = cardVals;
            }else if(btn.blades){
                var val = btn.blades[i];
            }
            else {
                var val = blades[i].getValues();
            }

            val.typeObj = Ext.create(val.type, {});
            val.seriesIndex = blades[i].seriesIndex;
            console.log('====> Blade Values: ', val);
            var gridRefData;
            var gridRef;
            var newGridData;
            if(blades[i].gridRef){
                val.typeObj.gridRefData = blades[i].gridRef;
            }
            if(blades[i].set){
               val.typeObj.gridRefData =blades[i].set;
            }
            if(blades[i].newGridRecord){
                val.typeObj.newGridData = blades[i].newGridRecord;
            }
            this.processExpressions(blades[i], val);
            values.blades.push(val);
        }

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
            if(v.down('#dataCombo')){
                var dataValue =  v.down('#dataCombo').getValue(); 
                //if(v.getDatasources()){
                    var gridSource = v.getDatasources();
                //}
            }
            if(bladeVal.griddata){
                var dataValue = bladeVal.datasources;
                var g = Ext.ComponentQuery.query('wsworkspace')[0];
                var gridSource = g.getViewModel().getData().datasources;
                //var gridSource = Arbela.view.ds.add.NewWindowViewController.handleSaveBtnClick(dataValue,gridValues);
            }
            var retVal = Arbela.view.common.ExprParser.parse(value, gridSource,dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(value, gridSource,dataValue); 
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
            for(var i=0; i<fieldsLen; i++){
                var records = {
                    ColumnHeader:gridFields[i],
                    DataIndex:gridFields[i],
                    ColumnType:"gridcolumn",
                    Format: undefined,
                    GroupField:undefined,
                    SummaryType:undefined
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
    },
    onRemove: function(grid, rowIdx, colIdx){
        grid.getStore().removeAt(rowIdx);
    },
    onEdit: function(grid, rowIndex, colIndex){
        
        var record = grid.getStore().getAt(rowIndex);
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

});
