Ext.define('Arbela.util.Utility', {
    singleton: true,
    mainHost: "http://arbela.walkingtree.in/",
    dataLocation :"resources/data/",
    resourcesData :"./resources/data/",
    completeLocation : '',
    api: {},
    arr:[],
    constructor: function() {
        var appinstance = window.location.href;
        var appparam = appinstance.substr(appinstance.indexOf('?'));
        if(Ext.isDefined(appparam)){
            this.completeLocation = appinstance.replace(appparam, '');
        }else{
            this.completeLocation = window.location.href;
        }
        //this.completeLocation = this.mainHost+this.dataLocation;
        this.api.summary = this.completeLocation+this.dataLocation+'summary.json';
        this.api.inventoryData = this.resourcesData+'inventorydata.json';
        this.api.booksList = this.completeLocation+this.dataLocation+'senchabooks.json';
    },
    dataformatter:function(data){//constructor with responsive text parameter
        
        var result = null;
        if(typeof(data)=='object'){
            var obj = {};
            for(var key in data ){
                if(typeof(data[key])=='object'){
                    result = this.dataformatter(data[key]);//recursive calling
                }else if(key !== "__proto__") {// this condition is working fine.
                    obj[key]=data[key];
                    //console.log(obj);
                }
            }
            var count = 0; 
            for(var k in obj) {
                count++
            }//console.log(count);
            if(count == 0){
                //console.log('this is proto object')
            }else{
                this.arr.push(obj);
            }
        }
        return this.arr;
    }

});
