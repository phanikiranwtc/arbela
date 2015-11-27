Ext.define('Arbela.view.ds.add.NewWindowViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.commonnewwindow',

    onComboboxSelect: function(combo, record, eOpts) {
        var klass = record.data.klass;
        var md = (Ext.create(klass, {})).getSettings();
        console.log('Meta Data: ', md);

        var win = this.getView();
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
                items: md,
                listeners: {
                    afterrender: {
                        fn: function(cmp) {
                            var values = this.getView().getValues();
                            console.log('FieldSet afterrender: ', values);
                            if (values) {
                                cmp.up('form').loadRecord(values);
                            }
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

        // this.onComboboxSelect(combo, record);
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

        var values = form.getValues();
        values.updatedOn = Ext.Date.format(new Date(), 'h:i:s A');
        values.typeObj = Ext.create(values.type, {});

        console.log('VALUES: ', values);

        v.fireEvent('adddatasource', v, values, e, eOpts);
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
    }

});
