Ext.define('Arbela.util.Utility', {
    singleton: true,
    mainHost: "http://arbela.walkingtree.in/",
    dataLocation :"resources/data/",
    completeLocation : '',
    api: {},
    constructor: function() {
        var appinstance = window.location.href;
        var appparam = appinstance.substr(appinstance.indexOf('?'));
        if(Ext.isDefined(appparam)){
            this.completeLocation = appinstance.replace(appparam, '');
        }else{
            this.completeLocation = window.location.href;
        }
        //this.completeLocation = this.mainHost+this.dataLocation;
        this.api.summary = this.completeLocation+'summary.json';
        this.api.inventoryData = this.completeLocation+'inventorydata.json';
        this.api.booksList = this.completeLocation+'senchabooks.json';
    }

});
