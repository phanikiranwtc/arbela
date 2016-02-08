Ext.define('Arbela.view.blades.chart.ChartController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.chartcontroller',

    onAddSeriesBtnClick: function(button,type){
        if(button.up().down('fieldset')!=null){
            if(button.up().down('fieldset').down('combobox[hidden=false]').getValue() == 'gauge'){
                Ext.Msg.show({
                    title: 'Selection Failed',
                    message: 'Error: cannot load gauge with other series',
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
                return false;
            }

        }
        
        var chartType = (button.up().up('fieldset').down('combobox').getValue())||button.up('bladeform').charttype;
        fieldSet = button.up('fieldset'),
        l = fieldSet.items.length;
        var cartesianFlag;
        var polarFlag;
        if(chartType == 'Cartesian'){
            cartesianFlag = false;
            polarFlag = true;
        }else if(chartType=='Polar'){
            cartesianFlag = true;
            polarFlag = false;
        }
        var seriesStartIndex = 1;
        if(button.up('dbnewcard') && button.up('dbnewcard').originalContainerRef && !button.up('bladeform').seriesIndex && button.up('bladeform').seriesIndex != 0 ) {
                
                seriesStartIndex = 0;

        }

        button.up('bladeform').seriesIndex = button.up('bladeform').seriesIndex ? button.up('bladeform').seriesIndex+1 : seriesStartIndex ;
        var seriesIndex = button.up('bladeform').presentSeriesIndex ? button.up('bladeform').presentSeriesIndex : button.up('bladeform').seriesIndex;
        button.up('bladeform').presentSeriesIndex = null;
        fieldSet.insert(l-1,{
                xtype: 'seriesset',
                cartesianFlag : cartesianFlag,
                polarFlag : polarFlag,
                seriesIndex : seriesIndex//button.up('bladeform').seriesIndex
                
        });
        var seriesLen = fieldSet.items.length;                 
        for(var i=0; i<=seriesLen-2; i++){      
            var fielsetRef = fieldSet.items.items[i];       
            var delButtonRef = fielsetRef.down('button[text="Delete Series"]');     
            delButtonRef.enable();      
        }
    }
});