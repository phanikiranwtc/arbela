Ext.define('Arbela.view.db.main.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbdashboard',

    columnIdx: 0,
    handleChageSettings:function(panel){// 
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
                    items: settings[k]
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

    // setGridColumnType: function(newCard){
    //    // 
    //     var gridStore = newCard.down('form').down('fieldset').down('grid').getStore();
    //     var storeData = gridStore.getData();
    //     var gridItems = storeData.items;
    //     var fields = [];
    //     for (var j = 0; j < gridItems.length; j++) {
    //         var items = gridItems[j].data;
    //         switch (items.ColumnType) {
    //             case "gridcolumn":
    //                 items.ColumnType = 'string';
    //                 break;
    //             case "numbercolumn":
    //                 items.ColumnType = 'number';
    //                 break;
    //             case "rownumberer":
    //                 flag = true;
    //                 items.ColumnType = 'rownumber';
    //                 break;
    //             case "datecolumn":
    //                 items.ColumnType = 'date';
    //                 break;
    //         }
    //         gridStore.commitChanges();
    //     }
    //     newCard.down('form').down('fieldset').down('grid').getView().refresh();
    // },
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
            }
            card.applyTitleStyles(card, values);
            me.columnIdx++;
        }
    },
    
    onToolbarClonedashboard: function(tb, btn, e, eOpts, eventOptions) {
        alert('Clone Dashboard');
    },

    onRemoveDashboard: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('removedashboard', v);
    }

});
