Ext.define('Arbela.view.db.tb.ToolbarViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.dbtoolbar',

    onAddCardBtnClick: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('addcard', v, button, e, eOpts);
    },

    onCloneBtnClick: function(button, e, eOpts) {
        var v = this.getView();
        v.fireEvent('clonedashboard', v, button, e, eOpts);
    }

});
