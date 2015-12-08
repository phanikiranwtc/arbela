Ext.define('Arbela.view.db.card.NewCardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbnewcard',

    onComboboxSelect: function(combo, record, eOpts) {    
        var klass = record.data.klass;
        if(klass !== undefined){
            var md = (Ext.create(klass, {})).getSettings();
        }
        if(combo.fieldLabel == "DataSources"){
            var loadDataRef = combo.up().down('button[name="loaddata"]');
            if(loadDataRef){
                combo.up().down('button[name="loaddata"]').enable();
            }
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
                    layout:'anchor',
                    defaults: {anchor: '100%'},
                    viewModel:{
                        data: {
                            summary: false,
                            grouping:false,
                            groupingsummary:false,
                            summaryType:true,
                            groupField:true,
                            datasources:null
                        },

                        formulas: {
                            enablegroupingsummary: function (get) {

                                return !(get('summary') || get('grouping'));
                            },
                            enableSummeryColumns: function(get){
                                if(get('summary') || get('groupingsummary')){
                                    return false;
                                }else{
                                    return true;
                                }
                            },
                            enableGroupColumns: function(get){
                                if(get('groupingsummary') || get('grouping')){
                                    return false;
                                }else{
                                    return true;
                                }
                            },
                            enableDataSource: function(get){
                                if(get('datasources') !== null){
                                    return true;
                                }else{
                                    return false;
                                }
                            },
                            enableTextFieldValue: function(get){
                                if(get('datasources') == null){
                                    return Arbela.util.Utility.api.summary;
                                }else{
                                    return null;
                                }
                            }

                        }
                    } ,
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
                var combo = form.down('fieldset').down('combobox[name=datasources]');
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
                if(md[i].xtype == "settingsgrid"){
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
        //var actualGridData = Ext.ComponentQuery.query('#columnGrid')[0];

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
            if(val.type == 'Arbela.view.blades.Grid'){
                if(blades[i].title){
                    var actualGridData = blades[i].down('fieldset').down('grid');
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
                 
                if(actualGridData){
                    if(actualGridData.getStore().getData().length == 0){
                        Ext.Msg.alert("INFO","Empty grid cannot be saved!!");
                    }else{
                        var dataSourceStore = blades[i].down('fieldset').down('grid').getStore();
                        val.typeObj.settingsGridStore = dataSourceStore;
                        this.processExpressions(blades[i], val);
                    }
                }else{
                    this.processExpressions(blades[i], val);
                }
            }else{

                this.processExpressions(blades[i], val);
        }
         values.blades.push(val);
        }
         
        values.updatedOn = Ext.Date.format(new Date(), 'h:i:s A');
         
        if(actualGridData){
            if(actualGridData.getStore().getData().length !== 0){
                v.fireEvent('addcard', v, values, e, eOpts);
                v.close();
            }
        }else{
            v.fireEvent('addcard', v, values, e, eOpts);
            v.close();
        }
    },


    processExpressions: function(blade, bladeVal) {   
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

        //check if we have expressions, if so, prepare them for evaluation
        var exprFields = Ext.ComponentQuery.query('expressionfield', blade);
        for (var j = 0; j < exprFields.length; j++) {
            var name = exprFields[j].getName();
            var value = exprFields[j].getValue();

            console.log('Processing expression field: ' + name + ' with value: ' + value);

            var d = {};

            console.log('=====> Datasources: ', dataSource);
             
             var dataValue =  v.down('#dataCombo').getValue();

             var retVal = Arbela.view.common.ExprParser.parse(value, dataSource,dataValue, function(cmp, data) { 
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(value, dataSource,dataValue); //gridRefData
                this.setBladeData(d);

            }, bladeVal.typeObj);

            console.log('retVal: ', retVal);
            bladeVal['exprVal'] = value;
            if(retVal !== undefined){
                bladeVal[name] = retVal;
            }

        }
         
        if(bladeVal.type == "Arbela.view.blades.Grid"){  
            if(bladeVal.datasources){
                if(v.down('#dataCombo')){
                    var dataValue =  v.down('#dataCombo').getValue(); 
                }
                if(bladeVal.datasources){
                    var dataValue = bladeVal.datasources;
                }
                 
                var gridsoourceKeys = Object.keys(dataSource),
                    keysLen = gridsoourceKeys.length;
                for(var i=0; i<= keysLen-1; i++){
                    if(dataSource[gridsoourceKeys[i]].type == 'Arbela.view.datasources.GridData'){
                         
                        var d = {};
                        var retVal = Arbela.view.common.ExprParser.parse(value, dataSource ,dataValue, function(cmp, data) {
                    
                            //re-evaluate the expression and set the value on the blade
                            d['value1'] = Arbela.view.common.ExprParser.parse(value, dataSource ,dataValue); 
                            this.setBladeData(d);
                             
                        }, bladeVal.typeObj);
                        bladeVal["griddata"] = retVal;
                    }
                }
            }
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
    }
   
});
