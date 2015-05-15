Ext.define('Arbela.view.db.card.NewCardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbnewcard',

    onComboboxSelect: function(combo, record, eOpts) {
        var klass = record.data.klass;
        var md = (Ext.create(klass, {})).getSettings();
        console.log('Meta Data: ', md);

        var win = this.getView();
        var fs = win.down('fieldset');
        var form = combo.up('bladeform');

        if (fs) {
            console.log('Reducing window dimension!');
            win.setHeight(win.getHeight() - 32*(fs.items.length));
            form.remove(fs);
            fs = null;            
        }

        if (win.getAutoGrow()) {
            console.log('Changing window dimension!');
            win.setHeight(win.getHeight() + 32*md.length + 10);
        } else {
            win.setScrollable(true);
        }

        if (md.length > 0) {
            form.add({
                xtype: 'fieldset',
                title: 'Settings',
                items: md,
                listeners: {
                    afterrender: {
                        fn: function(cmp) {
                            // var values = this.getView().getValues();
                            // console.log('FieldSet afterrender: ', values);
                            // if (values) {
                            //     cmp.up('form').loadRecord(values);
                            // }
                        },
                        single: true
                    },
                    scope: this
                }
            });
        }

    },

    onComboboxChange: function(combo, newVal, oldVal, eOpts) {
        var record = combo.getStore().findRecord('klass', newVal);
        
        this.onComboboxSelect(combo, record);
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
            values.blades.push(val);
        }

        values.updatedOn = Ext.Date.format(new Date(), 'h:i:s A');

        // console.log('VALUES: ', values);

        v.fireEvent('addcard', v, values, e, eOpts);
        v.close();
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

        form.insert(l - 1, {xtype: 'bladeform'});

        var win = this.getView();

        if (win.getAutoGrow()) {
            console.log('Changing window dimension!');
            win.setHeight(win.getHeight() + 80 + 10 + 10 + 24);
        } else {
            win.setScrollable(true);
        }
    }

});
