Ext.define('Arbela.view.db.main.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbdashboard',

    columnIdx: 0,
    handleChageSettings:function(panel){
        var me = this;
        var blades= this.getAvailableBlades();
        var newCard = Ext.create('Arbela.view.db.card.NewCard', {
            y: 0,
            editing:true,
            originalContainerRef:panel,
            typeData: blades,
            title:'Edit Card',
            listeners: {
                addcard: me.handleAddCardEvent,
                scope: me
            },
            datasources: this.getViewModel().getData().datasources
        });
        var s = newCard.down('bladeform');
        newCard.down('form').remove(s);
        var itemsLen = panel.items.length;
        var form = newCard.down('form');
        var l = form.items.length;
        var name = [];
        var settings = [];
        for(var i = 0;i<itemsLen;i++){
            var component = panel.items.getAt(i);
            settings.push(component.settings)
            name.push(component.$className);
            form.insert(l, {               
                xtype: 'bladeform'
            });
        }
        var arr =[];
        for(var j = 0;j<=form.items.length-1;j++){
            if(form.items.getAt(j).xtype=='bladeform'){
                    arr.push(form.items.getAt(j));
            }
        }
        for(var k = 0;k<=arr.length-1;k++){
            arr[k].items.getAt(0).setValue(name[k]); 
            if(settings[k].length!=0){
                arr[k].add({
                    xtype: 'fieldset',
                    title: 'Settings',
                    items: settings[k],
                    layout:'anchor',
                    defaults: {anchor: '100%'},
                });
            }
        }
        var bladeForms = form.query('bladeform'); 
        for (var is = 0 ; is < bladeForms.length ; is++){
            var formBladePanels = panel.formvalues.blades[is];
            var seriesIndexblade = formBladePanels.seriesIndex+1;
            for(var xy=0; xy< seriesIndexblade ; xy++){
                bladeForms[is].charttype = formBladePanels.charttype;        
                bladeForms[is].query('button[name=addSeries]')[0].el.dom.click();
            } 
            if(formBladePanels.type=="Arbela.view.blades.Grid"){
                if(formBladePanels.settingsData){
                    var gridStore = bladeForms[is].down('grid').getStore();
                    var set;
                    bladeForms[is].set= formBladePanels.settingsData;
                    for (var i=0;i<=formBladePanels.settingsData.length-1;i++){
                        var record = formBladePanels.settingsData[i];
                        bladeForms[is].down('grid').getStore().add(record);
                    }
                }
                if(formBladePanels.griddata){
                    var gridStore = bladeForms[is].down('grid').getStore();
                    var set;
                    bladeForms[is].set= formBladePanels.griddata;
                    // for (var i=0;i<=formBladePanels.griddata.length-1;i++){
                    //     var record = formBladePanels.griddata[i];
                    //     bladeForms[is].down('grid').getStore().add(record);
                    // }
                }
                if(formBladePanels.dataSourceS){
                    bladeForms[is].down('grid').setStore(formBladePanels.dataSourceS);
                }
                if(formBladePanels.typeObj){
                    if(formBladePanels.typeObj.gridRefData){
                        var gridRefLen = formBladePanels.typeObj.gridRefData.length;
                        var gridRef;
                            bladeForms[is].gridRef =formBladePanels.typeObj.gridRefData;
                        for(var i=0;i<=gridRefLen-1;i++){
                            var record = formBladePanels.typeObj.gridRefData[i];
                            bladeForms[is].down('grid').getStore().add(record);
                        }
                    }
                    if(formBladePanels.typeObj.newGridData){
                        var gridRefLen = formBladePanels.typeObj.newGridData.length;
                        var gridRef;
                            bladeForms[is].gridRef =formBladePanels.typeObj.newGridData;
                        for(var i=0;i<=gridRefLen-1;i++){
                            var record = formBladePanels.typeObj.newGridData[i];
                            bladeForms[is].down('grid').getStore().add(record);
                        }
                    }
                }
                
            }
            
        }
        
    	if(panel.formvalues.titleStyle){
            newCard.down('form').getForm().setValues({
                'name' : panel.formvalues.name,
        	'titleStyle' : panel.formvalues.titleStyle
            });
        }
        if(panel.formvalues.showTitle =='on'){
            newCard.down('form').getForm().setValues({
                'name' : panel.formvalues.name,
                'showTitle':true
            });
        } else {
            newCard.down('form').getForm().setValues({
                'name' : panel.formvalues.name,
                'showTitle':false
            });
        }
    if(panel.formvalues.hideTitleBar =='on'){
            newCard.down('form').getForm().setValues({
                'name' : panel.formvalues.name,
                'hideTitleBar':true
            });
        }else{
            newCard.down('form').getForm().setValues({
                'name' : panel.formvalues.name,
                'hideTitleBar':false
            });
        }
        var newCardFBLen =  newCard.down('form').items.length;
        var pfbl = panel.formvalues.blades.length;
        for(var p = 0; p<=pfbl-1; p++){
            var panelValues = panel.formvalues.blades[p];
            //this.setGridColumnType(newCard);
            arr[p].getForm().setValues(panelValues);
            var setRef = arr[p].down('fieldset'),
            store = Ext.ComponentQuery.query('dslist')[0].getStore(); 
            if(setRef !== null){
                var datasrcCombo = setRef.down('combo[fieldLabel="DataSources"]');
                if(store.getData().length !== 0){
                    if(datasrcCombo.hidden == false){
                        if(panelValues.type !== "Arbela.view.blades.Grid"){
                            arr[p].down('fieldset').down('textfield[fieldLabel="Expression"]').setValue(panelValues.exprVal);
                        }
                        // else{
                        //     /* setting grid store and columns of grid in fieldset settings while editing */
                        //     // if(gridstore){
                        //     //     for(var i=0; i<colGridfields.length; i++){
                        //     //         form.down('grid').getColumns()[i].dataIndex = colGridfields[i];
                        //     //     }
                        //     //     form.down('grid').setStore(gridstore);
                        //     // }
                        // }
                        datasrcCombo.setStore(store);
                        setRef.down('button[text="Load Meta-data"]').enable();
                    }
                }else{
                    
                    if(datasrcCombo !== null){
                        
                        datasrcCombo.hide();
                        datasrcCombo.reset();
                        if(panelValues.type == "Arbela.view.blades.Grid"){
                            var labelRef = newCard.down('bladeform').down('fieldset[title="Settings"]').down('label');
                            if(!labelRef.hidden){
                                labelRef.hide();
                            }
                        }
                    }
                }
            }
        }
        
        newCard.show();
    },

    /**
    ** fetch the avaiable baldes in the application and return them in an array with
    ** object as {klass:'',name:'',niceName:''}
    **/
    getAvailableBlades:function(){
        
    var classes = Ext.ClassManager.classes;
    var blades = [];

    for (var key in classes) {
        if (classes.hasOwnProperty(key)) {
            if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
                var arr = key.split('.');
                blades.push({
                    klass: key, 
                    name: arr[arr.length - 1],
                    niceName: classes[key].niceName
                });
            }
        }
    }

    console.log('DATA: ', blades);
        return blades;
        
    },
    onToolbarAddcard: function(tb, btn, e, eOpts, eventOptions) {
        //TODO: move this to a common util as it is used for Datasource as well as Card/Blade
        var classes = Ext.ClassManager.classes;
        var blades = [];

        for (var key in classes) {
            if (classes.hasOwnProperty(key)) {
                if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
                    var arr = key.split('.');
                    blades.push({
                        klass: key, 
                        name: arr[arr.length - 1],
                        niceName: classes[key].niceName
                    });
                }
            }
        }

        console.log('DATA: ', blades);

        var me = this;

        if (this.columnIdx >= this.getView().getMaxColumns()) {
            this.columnIdx = 0;
        }

        var newCard = Ext.create('Arbela.view.db.card.NewCard', {
            y: 0,
            typeData: blades,
            listeners: {
                addcard: me.handleAddCardEvent,
                scope: me
            },
            datasources: this.getViewModel().getData().datasources
        });
    },

    handleAddCardEvent: function(win, values) { 
         
        var me = this;
        var oldPanel = win.config.originalContainerRef;
        if(oldPanel) {
            oldPanel.formvalues = values;
            var newBladesLen = values.blades.length;
            var newBlade = [];
            var oldBlade = [];
            var newHeight = 0;
            oldPanel.removeAll(true);

            for(var b = 0;b<=newBladesLen-1;b++){
                newBlade.push(values.blades[b].typeObj);
                oldPanel.add(newBlade[b]);
            }
            /*for(var w = 0;w<=oldPanel.items.length-1;w++){
                //newHeight += oldPanel.items.getAt(w).height;
            }*/
            var showTitle = values.showTitle;
            var title;
            if(showTitle){
                title = values.name;
            }
            oldPanel.setTitle(title);
            oldPanel.applyTitleStyles(oldPanel, values);
            oldPanel.expand();
            
        } else {
            var blades = values.blades;
            var l = blades.length;
            var items = [];
            for (var i = 0; i < l; i++) {
                var vt = blades[i].typeObj; 
                items.push(vt);
            }
             
            //var columnIndex = values.colIdx ? values.colIdx : me.columnIdx;
            if(!Ext.isEmpty(values.colIdx)){
               if(me.getView().items.items.length == 0) {
                 
                var card = me.getView().addView({
                    title : values.showTitle ? values.name : '',
                    type: 'card',
                    columnIndex: values.colIdx,
                    //columnWidth:values.columnWidth
                }, values.colIdx);
                   
                card.add(items);
                   //card.up('container').columnWidth = values.columnWidth;
                card.formvalues = values;
            } else {
                me.getView().on('add', function(ct, cmp, idx) {
                    cmp.add(items);
                    cmp.formvalues = values;
                   // cmp.up('container').columnWidth = values.columnWidth;
                    //cmp.up('conatiner').setColumnWidth(values.columnWidth);
                }, this, {single: true});
                var card = me.getView().addView({
                    title : values.showTitle ? values.name : '',
                    type: 'card',
                    columnIndex: values.colIdx,
                    //columnWidth:values.columnWidth
                }, values.colIdx);
                card.formvalues = values;
            }
            card.applyTitleStyles(card, values);
        }else{
            if(me.getView().items.items.length == 0) {
             
            var card = me.getView().addView({
                title : values.showTitle ? values.name : '',
                type: 'card',
                columnIndex: me.columnIdx
            }, 0);
            card.add(items);
            card.formvalues = values;
        } else {
            me.getView().on('add', function(ct, cmp, idx) {
                cmp.add(items);
                cmp.formvalues = values;
            }, this, {single: true});
            var card = me.getView().addView({
                title : values.showTitle ? values.name : '',
                type: 'card',
                columnIndex: me.columnIdx,
            }, 0);
            card.formvalues = values;
        }
        card.applyTitleStyles(card, values);
        me.columnIdx++;
        }

        }
    },
    
    onToolbarClonedashboard: function(tb, btn, e, eOpts, eventOptions) {
         
        //alert('Clone Dashboard');
        var v = this.getView();

        var datasources = v.getDatasources();
        var dataSourceArray = [];
        for( datasourcesItem in datasources ){
            var dataListItem = datasources[datasourcesItem];
            delete dataListItem.typeObj;
            dataSourceArray.push(dataListItem);
        }

        if(v.items.items[0]){
            
            var cardsArray = [], jsonObj = {};
            //var cardsLen = v.items.items[j].items.items.length;
            var cards = v.query('panel[cls=arbelaCard]');
            var cardsLen = cards.length;

                
                
            for(var i=0; i<=cardsLen-1; i++){
                var bladeData = cards[i].formvalues;
                var colIndex = cards[i].columnIndex;
                //var columnWidth = cards[i].up('container').columnWidth;
                var bladesLen = bladeData.blades.length;
                for(var l = 0; l<=bladesLen-1; l++){
                    if(bladeData.blades[l].type == "Arbela.view.blades.Grid"){ 
                        if(bladeData.blades[l].settingsData){
                            var settingsDataLen = bladeData.blades[l].settingsData.length,  itemsArr= [];
                            for(var m = 0;m<= settingsDataLen-1;m++){
                                var itemData = bladeData.blades[l].settingsData[m];
                                itemsArr.push(itemData);
                            }
                            bladeData.blades[l].settingsData= itemsArr;

                        }
                        if(bladeData.blades[l].typeObj){
                            if(bladeData.blades[l].typeObj.gridRefData){
                                var gridRefDataLen = bladeData.blades[l].typeObj.gridRefData.length,  itemsArr= [];
                                for(var m = 0;m<= gridRefDataLen-1;m++){
                                    var itemData = bladeData.blades[l].typeObj.gridRefData[m];
                                    itemsArr.push(itemData);
                                }
                                bladeData.blades[l].settingsData= itemsArr;
                            }
                            if(bladeData.blades[l].typeObj.newGridData){
                                var newGridDataLen = bladeData.blades[l].typeObj.newGridData.length,  itemsArr= [];
                                for(var m = 0;m<= newGridDataLen-1;m++){
                                    var itemData = bladeData.blades[l].typeObj.newGridData[m];
                                    itemsArr.push(itemData);
                                }
                                bladeData.blades[l].settingsData= itemsArr;
                            } 
                        }

                    }
                }
                bladeData.colIdx = colIndex;
               // bladeData.columnWidth = columnWidth;
                cardsArray.push(bladeData);
            }
        
            //cardsArray.push(dataSourceArray);
            jsonObj["data"] = cardsArray;
            var datasource = dataSourceArray;
            jsonObj["datasource"]= datasource;
            console.log(jsonObj);
            var dataLen = jsonObj.data.length;

            for( var j = 0; j<=dataLen-1;j++){
                if(jsonObj.data[j].blades){
                var bladesLen = jsonObj.data[j].blades.length;
                for(var k=0;k<=bladesLen-1;k++){
                    delete jsonObj.data[j].blades[k].typeObj
                }
            }
            }
            var jsonString = JSON.stringify(jsonObj);
            Ext.Msg.alert("INFO",jsonString);
        }else{
            Ext.Msg.alert("INFO",'We could not save your data because you did not provide any cards on dashboard');
        }
    },

    onRemoveDashboard: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('removedashboard', v);
    },

    settingCards: function(){
        // 
        Ext.Ajax.request({
            url: "resources/data/bladesdata.json",
            //params: params,
            success: function(response){
                var me = this,
                    responseData = Ext.decode(response.responseText);
                me.settingCardsData(responseData);
            },
            failure: function(error) {
                            return Ext.Msg.show({
                                title: 'Custom Dashboard',
                                message: 'You did not save dashboard before!',
                                buttons: Ext.Msg.OK,
                                icon: Ext.Msg.ERROR,
                            });
                        },
            scope:this
        },this);
    },
    settingCardsData: function(responseData) {
        var cardsData = responseData.data,
            cardsLen = cardsData.length;
        if(responseData.datasource){
            var datasourceData =  responseData.datasource
            datasourcesLen =  datasourceData.length;
            for(var k =0; k<= datasourcesLen-1;k++){
                var type = datasourceData[k].type;
                responseData.datasource[k].typeObj = Ext.create(type,{ });
                delete responseData.datasource[k].id;
                var grid = Ext.ComponentQuery.query('dslist')[0];
               // var grid = Ext.create('Arbela.view.ds.List',{});
                // grid.getStore().add(datasourceData[k]);
                
                grid.getViewModel().getData().datasources.add(datasourceData[k]);
                //grid.getViewModel().getStore().setData(datasourceData[k]);
                grid.fireEvent('addeddatasource', grid, datasourceData[k]);
            }
                
        }
        for (var i = 0; i <= cardsLen - 1; i++) {
            var cardsValues = cardsData[i],
                x = Ext.create('Arbela.view.db.card.NewCard', {
                    listeners: {
                        addcard: this.handleAddCardEvent,
                        scope: this
                    }
                });
            x.getController().handleSaveBtnClick(cardsValues);

        }
    }

});
