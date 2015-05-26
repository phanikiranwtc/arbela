Ext.define('Arbela.view.db.card.NewCardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbnewcard',

    onComboboxSelect: function(combo, record, eOpts) {
        var klass = record.data.klass;
        var md = (Ext.create(klass, {})).getSettings();
        console.log('Meta Data: ', md);

        var win = this.getView();
        var form = combo.up('bladeform');
        var fs = form.down('fieldset');

        if (fs) {
            form.remove(fs);
            fs = null;            
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

            console.log('====> Blade Values: ', val);

            // console.log('=====> Datasources: ', v.getDatasources());

            //check if we have expressions, if so, prepare them for evaluation
            // var exprFields = Ext.ComponentQuery.query('expressionfield', blades[i]);
            // for (var j = 0; j < exprFields.length; j++) {
            //     var name = exprFields[j].getName();
            //     var value = exprFields[j].getValue();

            //     console.log('Processing expression field: ' + name + ' with value: ' + value);

            //     var d = {};
            //     // d[name] = 0;

            //     var retVal = Arbela.view.common.ExprParser.parse(value, v.getDatasources(), function(data) {
            //         d[name] = data.amt;
            //         this.setBladeData(d);
            //     }, val.typeObj);

            //     console.log('retVal: ', retVal);
            //     val[name] = retVal;

            // }

            this.processExpressions(blades[i], val);

            //set the data on the viewModel so that the bindings are evaluated properly
            // val.typeObj.getViewModel().setData(val);

            //set the data on the view for any custom data handling specific to the blade
            // val.typeObj.setBladeData(val);

            values.blades.push(val);
        }

        values.updatedOn = Ext.Date.format(new Date(), 'h:i:s A');

        // console.log('VALUES: ', values);

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
            // d[name] = 0;

            console.log('=====> Datasources: ', v.getDatasources());

            var retVal = Arbela.view.common.ExprParser.parse(value, v.getDatasources(), function(cmp, data) {
                
                //re-evaluate the expression and set the value on the blade
                d[name] = Arbela.view.common.ExprParser.parse(value, v.getDatasources());
                this.setBladeData(d);

            }, bladeVal.typeObj);

            console.log('retVal: ', retVal);
            bladeVal[name] = retVal;

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

        form.insert(l - 1, {xtype: 'bladeform'});
    }

});
