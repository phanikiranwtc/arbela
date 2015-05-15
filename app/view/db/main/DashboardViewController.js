Ext.define('Arbela.view.db.main.DashboardViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbdashboard',

    columnIdx: 0,

    onToolbarAddcard: function(tb, btn, e, eOpts, eventOptions) {
        //TODO: move this to a common util as it is used for Datasource as well as Card/Blade
        var classes = Ext.ClassManager.classes;
        var dses = [];

        for (var key in classes) {
            if (classes.hasOwnProperty(key)) {
                if (Ext.String.startsWith(key, 'Arbela.view.blades')) {
                    var arr = key.split('.');
                    dses.push({
                        klass: key, 
                        name: arr[arr.length - 1]
                    });
                }
            }
        }

        console.log('DATA: ', dses);

        var me = this;

        if (this.columnIdx >= this.getView().getMaxColumns()) {
            this.columnIdx = 0;
        }

        Ext.create('Arbela.view.db.card.NewCard', {
            title: 'New Card',
            y: 0,
            typeData: dses,
            // values: data,
            listeners: {
                addcard: function(win, values) {
                    // console.log('View Template:', values.typeObj.getViewTemplate());
                    console.log('Adding to column: ' + me.columnIdx);
                    var height = 0;

                    var blades = values.blades;
                    var l = blades.length;
                    var items = [];

                    for (var i = 0; i < l; i++) {
                        var vt = blades[i].typeObj.getViewTemplate();
                        items.push(vt);
                        height += vt.height;
                    }

                    me.getView().on('add', function(ct, cmp, idx) {
                        console.log('ARGUMENTS: ', arguments);

                        cmp.add(items);
                        
                    }, this, {single: true});

                    me.getView().addView({
                        title: values.name,
                        type: 'card',
                        columnIndex: me.columnIdx,
                        height: height,
                    }, me.columnIdx);

                    me.columnIdx++;
                }
            }
        });
    },

    onToolbarClonedashboard: function(tb, btn, e, eOpts, eventOptions) {
        alert('Clone Dashboard');
    }

});
