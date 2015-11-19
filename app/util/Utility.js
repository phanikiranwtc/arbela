Ext.define('Arbela.util.Utility', {
    singleton: true,
    mainHost: "http://arbela.walkingtree.in/",
    dataLocation :"resources/data/",
    completeLocation : '',
    api: {},
    constructor: function() {
        this.completeLocation = this.mainHost+this.dataLocation;
         this.api.summary = this.completeLocation+'summary.json';
         this.api.inventoryData = this.completeLocation+'inventorydata.json';
         this.api.booksList = this.completeLocation+'senchabooks.json';



    }

});
