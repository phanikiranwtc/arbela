Ext.define('Arbela.view.ds.ListViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dslist',

    onAddBtnClick: function(button, e, eOpts) {
        this.showWindow();
    },

    showWindow: function(data) {
        var v = this.getView();

        //TODO: move this to a common util as it is used for Datasource as well as Card/Blade
        var classes = Ext.ClassManager.classes;
        var dses = [];

        for (var key in classes) {
            if (classes.hasOwnProperty(key)) {
                if (Ext.String.startsWith(key, 'Arbela.view.datasources')) {
                    var arr = key.split('.');
                    // dses.push([key, arr[arr.length - 1]]);
                    dses.push({
                        klass: key, 
                        name: arr[arr.length - 1],
                        niceName: classes[key].niceName
                    });
                }
            }
        }

        console.log('DATA: ', dses);

        var win = Ext.create('Arbela.view.ds.add.NewWindow', {
            title: 'New Datasource',
            y: 0,
            typeData: dses,
            values: data,
            listeners: {
                adddatasource: function(win, values) { 
                    var selectedRec = v.getStore().findRecord('isSelected',true);
                    if(selectedRec){
                        v.getStore().setAutoSync(true);
                        values.oldName = selectedRec.data.name; //saving the oldrecord name as "oldName" for its use in WorkspaceViewController
                        values.oldType = selectedRec.data.type;
                        selectedRec.set('name',values.name);
                        selectedRec.set('type',values.type);
                        selectedRec.set('typeObj',values.typeObj);
                        selectedRec.set('updatedOn',values.updatedOn);
                        selectedRec.data.isSelected = false;
                        v.getView().refresh();
                        v.fireEvent('addeddatasource', v, values);
                    }else{
                        v.getStore().add(values);
                        v.fireEvent('addeddatasource', v, values);
                    }
                },
                single: true
            }
        });

        return win;
    },

    onRemoveDatasource: function(grid, rowIdx, colIdx) {
        grid.getStore().removeAt(rowIdx);
    },

    onRefreshDatasource: function(grid, rowIdx, colIdx) {

        var rec = grid.getStore().getAt(rowIdx);
        var updatedOn = Ext.Date.format(new Date(), 'h:i:s A');
        if( rec ){
            rec.set('updatedOn',updatedOn);
            rec.commit();
            if(rec.data && rec.data.typeObj && rec.data.typeObj.refresh){
                rec.data.typeObj.refresh();
            }
            
        }
        
    },

    onEdtiableCellClick: function(grid, td, cellIndex, record, tr, rowIndex, e, eOpts) {
       

        if (e.target.className == "editable-link") {

            e.preventDefault();
            var win = this.showWindow();
            win.setTitle('Edit Datasource');
            record.data.isSelected = true;
            win.setValues(record); 
            var md = record.data.typeObj.getSettings();
            var fs = win.down('fieldset');
            var form = win.down('form');

            if (fs) {
                form.remove(fs);
                fs = null;            
            }

            if (md && md.length > 0) {

                form.add({
                    xtype: 'fieldset',
                    title: 'Settings',
                    layout:'anchor',
                    defaults: {anchor: '100%'},
                    items: md
                    // listeners: {
                    //     afterrender: {
                    //         fn: function(cmp) {
                    //             var values = this.getView().getValues();
                    //             console.log('FieldSet afterrender: ', values);
                    //             if (values) {
                    //                 cmp.up('form').loadRecord(values);
                    //             }
                    //         },
                    //         single: true
                    //     },
                    //     scope: this
                    // }
                });
            }           
        }

    }

});
