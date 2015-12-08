Ext.define('Arbela.view.blades.Chart', {
    requires: [
        'Ext.chart.CartesianChart',
        'Ext.chart.series.Pie',
        'Ext.chart.theme.Base',
        'Ext.chart.PolarChart',
        'Ext.chart.series.sprite.PieSlice',
        'Ext.chart.interactions.*',
        'Ext.chart.axis.Numeric3D',
        'Ext.chart.axis.sprite.Axis3D',
        'Ext.chart.axis.Category3D',
        'Ext.chart.axis.Category',
        'Ext.chart.axis.Numeric',
        'Ext.chart.grid.HorizontalGrid3D',
        'Ext.chart.series.Bar3D',
        'Ext.chart.series.Area',
        'Ext.chart.series.Polar',
        'Ext.chart.series.Pie',
        'Ext.chart.series.Radar',
        'Ext.chart.series.Gauge',
        'Ext.chart.series.Line',
        'Ext.chart.series.Pie3D',
        'Arbela.view.common.SeriesSet'
    ],
    extend: 'Arbela.view.api.Blade',

    statics: {
        niceName: 'Chart',
        desc: 'chart showing user-wise inventory'
    },

    settings: [{
        xtype: 'textfield',
        fieldLabel: 'URL',
        name: 'url',
        allowBlank:false,
        value:Arbela.util.Utility.api.inventoryData//'resources/data/inventorydata.json'
    },{
        xtype: 'combobox',
        fieldLabel: 'Select Chart Type',
        name: 'charttype',
        allowBlank:false,
        store: Ext.create('Ext.data.Store',{
            fields:['name'],
            data:[{
                name:'Cartesian'
            },{
                name:'Polar'
            }]
        }),
        queryMode: 'local',
        displayField: 'name',
        valueField: 'name',
        forceSelection :true,
        listeners: {
            change: function(combo, newValue, oldValue, eOpts){ 
                fieldSet = this.up('fieldset').down('fieldset[name = chartSeries]');
                l = fieldSet.items.length;
                var cartesianFlag;
                var polarFlag;
                if(newValue == 'Cartesian'){
                    cartesianFlag = false;
                    polarFlag = true;
                }else if(newValue =='Polar'){
                    cartesianFlag = true;
                    polarFlag = false;
                }
                if(l==1){
                    
                    this.up('bladeform').seriesIndex = 0;
                    fieldSet.insert(l-1,{
                            xtype: 'seriesset',
                            cartesianFlag : cartesianFlag,
                            polarFlag : polarFlag,
                            seriesIndex : 0

                            
                    });
                }

            if(newValue == 'Cartesian'){
                   var CartesianLen = fieldSet.items.length;
                   var items = fieldSet.items.items;
                   fieldSet.setHidden(false);
                   for(var i = 0;i<=CartesianLen-1;i++){
                       if(items[i].xtype == 'seriesset'){
                           var count = i;
                           var yfield = 'yfield'+count;
                           var cartesiantype = 'cartesiantype'+count;
                           var polartype = 'polartype'+count;
                           var fieldlabel = 'fieldlabel'+count;
                           items[i].down('textfield[name='+yfield+']').setHidden(false);
                           items[i].down('combo[name='+cartesiantype+']').setHidden(false);
                           items[i].down('combo[name='+polartype+']').setHidden(true);
                           items[i].down('textfield[name='+fieldlabel+']').setHidden(true);
                       }
                   }
                   this.up('fieldset').down('fieldset[title=X-Axis]').setHidden(false);
                   this.up('fieldset').down('fieldset[title=Y-Axis]').setHidden(false);
                   this.up('fieldset').down('fieldset[title=Interactions]').setHidden(false);
                   this.up('fieldset').down('fieldset[title=Legend]').setHidden(false);
                   var interactionCheck = this.up('fieldset').down('checkbox[name=showinteractions]');
                   if(interactionCheck && interactionCheck.checked) {
                        interactionCheck.up('fieldset[title=Interactions]').down('combobox[name=cartesianinteractions]').setHidden(false);
                        interactionCheck.up('fieldset[title=Interactions]').down('combobox[name=polarinteractions]').setHidden(true);
                   }
               }else if(newValue == 'Polar'){
                   var items = fieldSet.items.items;
                   var polarLen = items.length;
                   fieldSet.setHidden(false);
                   for(var i = 0;i<=polarLen-1;i++){
                       if(items[i].xtype == 'seriesset'){
                           var count = i;
                           var yfield = 'yfield'+count;
                           var cartesiantype = 'cartesiantype'+count;
                           var polartype = 'polartype'+count;
                           var fieldlabel = 'fieldlabel'+count;
                           items[i].down('textfield[name='+yfield+']').setHidden(true);
                           items[i].down('combo[name='+cartesiantype+']').setHidden(true);
                           items[i].down('combo[name='+polartype+']').setHidden(false);
                           items[i].down('textfield[name='+fieldlabel+']').setHidden(false);
                       }
                   }
                   this.up('fieldset').down('fieldset[title=X-Axis]').setHidden(true);
                   this.up('fieldset').down('fieldset[title=Y-Axis]').setHidden(true);
                   this.up('fieldset').down('fieldset[title=Interactions]').setHidden(false);
                   this.up('fieldset').down('fieldset[title=Legend]').setHidden(false);
                   var interactionCheck = this.up('fieldset').down('checkbox[name=showinteractions]');
                   if(interactionCheck && interactionCheck.checked) {
                        interactionCheck.up('fieldset[title=Interactions]').down('combobox[name=cartesianinteractions]').setHidden(true);
                        interactionCheck.up('fieldset[title=Interactions]').down('combobox[name=polarinteractions]').setHidden(false);
                   }
               }
            }
        }
    },{
        xtype:'fieldset',
        title: 'Chart Series',
        name : 'chartSeries',
        hidden :true,
        items: [{
            xtype: 'button',
            text: 'Add Series',
            cls: 'add-blade-btn',
            icon: 'resources/images/add-16.png',
            charttype : '',
            ui: 'plain',
            name : 'addSeries',
            margin: '0 0 5 0',
            handler: function(button,type){
                var chartType = (this.up().up('fieldset').down('combobox').getValue())||this.up('bladeform').charttype;
                fieldSet = this.up('fieldset'),
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
                if(this.up('dbnewcard') && this.up('dbnewcard').originalContainerRef && !this.up('bladeform').seriesIndex && this.up('bladeform').seriesIndex != 0 ) {
                        
                        seriesStartIndex = 0;

                }

                this.up('bladeform').seriesIndex = this.up('bladeform').seriesIndex ? this.up('bladeform').seriesIndex+1 : seriesStartIndex ;
                
                fieldSet.insert(l-1,{
                        xtype: 'seriesset',
                        cartesianFlag : cartesianFlag,
                        polarFlag : polarFlag,
                        seriesIndex : this.up('bladeform').seriesIndex
                        
                });
                var seriesLen = fieldSet.items.length;                 
                for(var i=0; i<=seriesLen-2; i++){      
                    var fielsetRef = fieldSet.items.items[i];       
                    var delButtonRef = fielsetRef.down('button[text="Delete Series"]');     
                    delButtonRef.enable();      
                }
            }
        }]
    },{
        xtype:'fieldset',
        title: 'X-Axis',
        hidden :true,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Type',
            forceSelection :true,
            store: Ext.create('Ext.data.Store', {
                fields: ['name','type'],
                data : [
                    {name:"Category",type:"category"},
                    {name:"Category3d",type:"category3d"},
                    {name:"Numeric",type:"numeric"},
                    {name:"Numeric3d",type:"numeric3d"},
                    {name:"Time",type:"time"},
                    {name:"Time3d",type:"time3d"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name:'xaxistype'
        },{
            xtype:"textfield",
            fieldLabel: "Title",
            name:'xaxistitle',
            emptyText: "Enter the title for X-Axis"
        },{
            xtype: 'textfield',
            fieldLabel: 'Field',
            name:'xaxisfield'
        },{
            xtype: 'checkbox',
            fieldLabel: 'Show Grid',
            name:'xaxisgrid'
        }]
    },{
        xtype:'fieldset',
        title: 'Y-Axis',
        hidden :true,
        items: [{
            xtype: 'combobox',
            fieldLabel: 'Type',
            forceSelection :true,
            store: Ext.create('Ext.data.Store', {
                fields: ['name','type'],
                data : [
                    {name:"Category",type:"category"},
                    {name:"Category3d",type:"category3d"},
                    {name:"Numeric",type:"numeric"},
                    {name:"Numeric3d",type:"numeric3d"},
                    {name:"Time",type:"time"},
                    {name:"Time3d",type:"time3d"}
                ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name:'yaxisType'
        },{
            xtype:"textfield",
            fieldLabel: "Title",
            name:'yaxistitle',
            emptyText: "Enter the title for Y-Axis"
        },{
            xtype: 'textfield',
            fieldLabel: 'Field',
            name:'yaxisfield'
        },{
            xtype: 'checkbox',
            fieldLabel: 'Show Grid',
            name:'yaxisgrid'
        }]
    },{
        xtype:'fieldset',
        title: 'Interactions',
        hidden :true,
        items: [{
            xtype: 'checkbox',
            fieldLabel: 'show Interactions',
            name : 'showinteractions',
            forceSelection :true,
            listeners : {
                change : function( field, newValue, oldValue, eOpts ) {
                    var fieldset = field.up('fieldset[title=Interactions]');
                    var settings = fieldset.up('fieldset[title=Settings]');
                    var value = settings.down('combobox[name=charttype]').value;
                    if(field.checked){
                        if(value == "Cartesian") {
                            fieldset.down('combobox[name=cartesianinteractions]').setHidden(false);
                        } else {
                            fieldset.down('combobox[name=polarinteractions]').setHidden(false);
                        }
                    } else {
                        fieldset.down('combobox[name=cartesianinteractions]').setHidden(true);
                        fieldset.down('combobox[name=polarinteractions]').setHidden(true);
                    }
                }
            }
        },{
            xtype: 'combobox',
            fieldLabel: 'Type',
            hidden : true,
            store: Ext.create('Ext.data.Store', {
            fields: ['name','type'],
            data : [
                {name:"Crosshair",type:"crosshair"},
                {name:"Crosszoom",type:"crosszoom"},
                {name:"Panzoom",type:"panzoom"}
            ]
            }),
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            forceSelection :true,
            name : 'cartesianinteractions'
        },{
            xtype: 'combobox',
            fieldLabel: 'Type',
            hidden : true,
            store: Ext.create('Ext.data.Store', {
            fields: ['name','type'],
            data : [
                {name:"Rotate",type:"rotate"},
                {name:"RotatePie3d",type:"rotatePie3d"}
            ]
            }),
            forceSelection :true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name : 'polarinteractions'
        }]
    },{
        xtype:'fieldset',
        title: 'Legend',
        hidden :true,
        items : [{
            xtype: 'checkbox',
            fieldLabel: 'show Legend',
            reference : 'legendcheck',
            name : 'showlegend'
        },{
            xtype: 'combobox',
            fieldLabel: 'Legend Position',
            bind : {
                hidden : '{!legendcheck.checked}'
            },
            store: Ext.create('Ext.data.Store', {
            fields: ['name','type'],
            data : [
                {name:"Bottom",type:"bottom"},
                {name:"Top",type:"top"},
                {name:"Right",type:"right"},
                {name:"Left",type:"left"}
            ]
            }),
            forceSelection :true,
            queryMode: 'local',
            displayField: 'name',
            valueField: 'type',
            name : 'chartLegend'
        }]
    }],
    config: {
       // height: 400
    },
    setBladeData: function(dataCfg) {
        var url = dataCfg.url;
        if(url){
            Ext.Ajax.request({
                url: url,
                method: 'POST',
                success: function(response){
                    var me = this,
                        responseData = Ext.decode(response.responseText);
                    me.settingBarData(dataCfg,responseData);
                },
                failure: function(error) {
                    return Ext.Msg.show({
                        title: 'Request Failed',
                        message: 'Error: cannot load the specified URL',
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                },
                scope:this
            },this);
        }else{
            return Ext.Msg.show({
                title: 'Warning',
                message: 'Please enter the Valid URL',
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.WARNING
            });
        }
    },
    settingBarData: function(dataCfg,responseData){
        
        if(dataCfg.charttype == 'Cartesian'){
            var chartSeries = 'cartesian';
            this.add({
                xtype: chartSeries,
                height: 350,
                innerPadding: '0 10 0 10'
            });
        }else if(dataCfg.charttype == 'Polar'){
            var chartSeries = 'polar';
            this.add({
                xtype: chartSeries,
                height: 350,
                width: 350,
                padding: 5,
                store: "", 
                series: "", 
                interactions: 'rotate'
            });
        }
        var fieldArray = [];
        var a = responseData.data[0];
        var yAxisFields = dataCfg.yaxisfield;
        var yAxisFieldsArr = yAxisFields.split(",");
        fieldArray = Ext.Object.getAllKeys(a);
        var chartStore = Ext.create('Ext.data.Store', {
            fields:fieldArray
        });
        chartStore.setData(responseData.data);
        var seriesCount = dataCfg.seriesIndex;
        var chartSeriesArr=[];
        if(chartSeries == "cartesian"){
            var cart = this.down('cartesian');
            cart.setStore(chartStore);
            if(dataCfg.showinteractions == "on"){
                cart.setInteractions(dataCfg.cartesianinteractions);
            }
            if(dataCfg.showlegend == "on"){
                cart.setLegend({docked:dataCfg.chartLegend});
            }
            cart.setAxes([
                {
                    type:dataCfg.xaxistype,
                    position: 'bottom',
                    title: {
                        text: dataCfg.xaxistitle,
                        fontSize: 15
                    },
                    gutter : 1,
                    fields:dataCfg.xaxisfield,
                    grid : dataCfg.xaxisgrid=="on" ? true :false
                },{
                    type:dataCfg.yaxisType,
                    position: 'left',
                    adjustByMajorUnit: true,
                    title: {
                        text: dataCfg.yaxistitle,
                        fontSize: 15
                    },
                    fields:yAxisFieldsArr,
                    grid : dataCfg.yaxisgrid=="on" ? true :false
                }
            ]);
            for(var i=0; i<=seriesCount; i++){
                var cartesiantype = 'cartesiantype'+i;
                var xfield = 'xfield'+i;
                var yfield = 'yfield'+i;
                var legendtitle = 'legendtitle'+i;
                var marker = 'marker'+i;
                var style = 'style'+i;
                if(dataCfg[cartesiantype]){
                    chartSeriesArr.push({
                        type: dataCfg[cartesiantype],
                        stacked : false,
                        xField: dataCfg[xfield],
                        yField: dataCfg[yfield],
                        title : dataCfg.showlegend ? dataCfg[legendtitle]:null,
                        showInLegend : dataCfg[legendtitle] && dataCfg.showlegend ? true : false,
                        showMarkers : dataCfg[marker] == "on" ? true : false,
                        marker : dataCfg[marker] == "on" ? true : false,
                        //style : eval('({' + dataCfg[style] + '})')
                        style : Ext.dom.Element.parseStyles(dataCfg[style])
                    });
                }
            }
            cart.setSeries(chartSeriesArr);
            
        }else if(chartSeries == "polar"){
            var cart = this.down('polar');
            cart.setStore(chartStore);
            if(dataCfg.showinteractions == "on"){
                cart.setInteractions(dataCfg.polarinteractions);
            }
            if(dataCfg.showlegend == "on"){
                cart.setLegend({docked:dataCfg.chartLegend});
            }
            for(var i=0; i<=seriesCount; i++){
                var polartype = 'polartype'+i;
                var xfield = 'xfield'+i;
                var yfield = 'yfield'+i;
                var legendtitle = 'legendtitle'+i;
                var marker = 'marker'+i;
                var fieldlabel = 'fieldlabel'+i;
                var style = 'style'+i;
                if(dataCfg[polartype] == 'gauge'){
                    chartSeriesArr.push({
                    type: 'gauge',
                    colors: ['#1F6D91', '#90BCC9'],
                    field: dataCfg[xfield],
                    title : dataCfg.showlegend ? dataCfg[legendtitle]:null,
                    showInLegend : dataCfg[legendtitle] && dataCfg.showlegend ? true : false,
                    showMarkers : dataCfg[marker] == "on" ? true : false,
                    marker : dataCfg[marker] == "on" ? true : false,
                    style : Ext.dom.Element.parseStyles(dataCfg[style]),
                    needle: true,
                    donut: 30
                    });
                } else if(dataCfg[polartype] == 'radar'){
                    cart.setAxes([
                    {
                        type:dataCfg.xaxistype,
                        position: 'radial',
                        grid: dataCfg.xaxisgrid=="on" ? true :false,
                        title: {
                            text: dataCfg.xaxistitle,
                            fontSize: 15
                        },
                        fields:dataCfg.xaxisfield
                    },{
                        type: dataCfg.yaxisType,
                        position: 'angular',
                        grid: dataCfg.yaxisgrid=="on" ? true :false,
                        title: {
                            text: dataCfg.yaxistitle,
                            fontSize: 15
                        },
                        fields: dataCfg.yaxisfield
                    }
                ]);
                chartSeriesArr.push({
                    type: dataCfg[polartype],
                    xField: dataCfg[xfield],
                    yField: dataCfg[yfield],
                    title : dataCfg.showlegend ? dataCfg[legendtitle]:null,
                    showInLegend : dataCfg[legendtitle] && dataCfg.showlegend ? true : false,
                    showMarkers : dataCfg[marker] == "on" ? true : false,
                    marker : dataCfg[marker] == "on" ? true : false,
                    style : Ext.dom.Element.parseStyles(dataCfg[style]),
                    style: {
                       fill: '#388FAD',
                       fillOpacity: .1,
                       stroke: '#388FAD',
                       strokeOpacity: .8,
                       lineWidth: 1
                   }
                });
            } else {
                chartSeriesArr.push({
                    type: dataCfg[polartype],
                    xField: dataCfg[xfield],
                    title : dataCfg.showlegend ? dataCfg[legendtitle]:null,
                    showInLegend : dataCfg[legendtitle] && dataCfg.showlegend ? true : false,
                    showMarkers : dataCfg[marker] == "on" ? true : false,
                    marker : dataCfg[marker] == "on" ? true : false,
                    style : Ext.dom.Element.parseStyles(dataCfg[style]),
                    label: {
                        field: dataCfg[fieldlabel],
                        display: 'rotate'
                    }
                });
             }
        }
            cart.setSeries(chartSeriesArr);
        }
    }
});
