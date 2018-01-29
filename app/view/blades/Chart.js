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
        'Ext.chart.series.Scatter',
        'Arbela.view.blades.chart.SeriesSet',
        'Arbela.view.blades.chart.SettingsChart'
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
        value:Arbela.util.Utility.api.inventoryData
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
            change :'onChartTypeComboChange'
        }
    },{
        xtype: 'settingschart'
    }],
    config: {
        layout:'fit'
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
                    var formattedData = Arbela.util.Utility.dataformatter(responseData);
                    me.processingCustomChart(dataCfg,formattedData);
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
    processingCustomChart: function(dataCfg,responseData){
        
        if(dataCfg.charttype == 'Cartesian'){
            var chartSeries = 'cartesian';
            this.add({
                xtype: chartSeries,
                height: 350,
                innerPadding: '0 10 0 10'//,
                //theme : dataCfg.theme
            });
        }else if(dataCfg.charttype == 'Polar'){
            var chartSeries = 'polar';
            this.add({
                xtype: chartSeries,
                height: 400,
                width: 400,
                padding: 20,
                //theme:dataCfg.theme,
                store: "", 
                series: ""
            });
        }

        var fieldArray = [];
        var a = responseData;//responseData.data[0];
        var yAxisFields = dataCfg.yaxisfield;
        var yAxisFieldsArr = yAxisFields.split(",");
        fieldArray = Ext.Object.getAllKeys(a);
        var chartStore = Ext.create('Ext.data.Store', {
            fields:fieldArray
        });
        chartStore.setData(responseData);//(responseData.data);
        var seriesCount = dataCfg.seriesIndex;
        var chartSeriesArr=[];

         /************************** Cartesian Chart feature *************************************/

        if(chartSeries == "cartesian"){
            var cart = this.down('cartesian');
            cart.setStore(chartStore);
            if(dataCfg.showinteractions == "on"){
                if(dataCfg.cartesianinteractions == 'panzoom'){
                    cart.setInteractions({
                        type:dataCfg.cartesianinteractions,
                        zoomOnPanGesture:true
                    });
                }else{
                    cart.setInteractions(dataCfg.cartesianinteractions);
                }
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
            /************************* Implementing delete series feature ********************************/

            var loopseriesIndexValue = 0;
            for(var i=0; i<=seriesCount; i++){
                while(!dataCfg.hasOwnProperty('xfield'+loopseriesIndexValue)){
                    if(loopseriesIndexValue>100){
                    }
                   loopseriesIndexValue++;
                }
                
                var cartesiantype = 'cartesiantype'+loopseriesIndexValue;
                var xfield = 'xfield'+loopseriesIndexValue;
                var yfield = 'yfield'+loopseriesIndexValue;
                var legendtitle = 'legendtitle'+loopseriesIndexValue;
                var marker = 'marker'+loopseriesIndexValue;
                var style = 'style'+loopseriesIndexValue;
                loopseriesIndexValue++;

            /************************** Done delete series feature *************************************/

                if(dataCfg[cartesiantype]){
                    chartSeriesArr.push({
                        type: dataCfg[cartesiantype],
                        stacked : false,
                        xField: dataCfg[xfield],
                        yField: dataCfg[yfield],
                        title : dataCfg.showlegend ? dataCfg[yfield]:null,
                        showInLegend : dataCfg.showlegend ? true : false,
                        showMarkers : dataCfg[marker] == "on" ? true : false,
                        marker : dataCfg[marker] == "on" ? true : false,
                       style : Ext.Element.parseStyles(dataCfg[style])
                    });
                }
            }
            cart.setSeries(chartSeriesArr);
            
        } 

         /************************** Polar Chart feature *************************************/

        else if(chartSeries == "polar"){
            var cart = this.down('polar');
            cart.setStore(chartStore);
            if(dataCfg.showinteractions == "on"){
                cart.setInteractions(dataCfg.polarinteractions);
            }
            if(dataCfg.showlegend == "on"){
                cart.setLegend({
                    docked:dataCfg.chartLegend
                });
            }

            /************************* Implementing delete series feature ********************************/
            var loopseriesIndexValue = 0;
            for(var i=0; i<=seriesCount; i++){
                while(!dataCfg.hasOwnProperty('xfield'+loopseriesIndexValue)){
                    if(loopseriesIndexValue>100){
                    }
                   loopseriesIndexValue++;
                }
                
                var polartype = 'polartype'+loopseriesIndexValue;
                var xfield = 'xfield'+loopseriesIndexValue;
                var yfield = 'yfield'+loopseriesIndexValue;
                var legendtitle = 'legendtitle'+loopseriesIndexValue;
                var marker = 'marker'+loopseriesIndexValue;
                var fieldlabel = 'fieldlabel'+loopseriesIndexValue;
                var style = 'style'+loopseriesIndexValue;
                var needlecolor = 'needlecolor'+loopseriesIndexValue;
                var sectorscolor = 'sectorscolor'+loopseriesIndexValue;
                loopseriesIndexValue++;
            /************************** Done delete series feature *************************************/

             /************************** Gauge series feature *************************************/
                if(dataCfg[polartype] == 'gauge'){
                    chartSeriesArr.push({
                    type: 'gauge',
                    colors: [dataCfg[needlecolor],dataCfg[sectorscolor]],//['#1F6D91', '#90BCC9'],
                    field: dataCfg[xfield],
                    needle: true,
                    donut: 30
                    });
                    cart.setAxes({
                        title: {
                            text: dataCfg.xaxistitle,
                            fontSize: 15
                        },
                        type: dataCfg.xaxistype,
                        position: 'gauge'
                    });

                } 

                /************************** Radar series feature *************************************/

                else if(dataCfg[polartype] == 'radar'){

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
                    showMarkers : dataCfg[marker] == "on" ? true : false,
                    marker : dataCfg[marker] == "on" ? true : false,
                    style : Ext.dom.Element.parseStyles(dataCfg[style]),
                    label: {
                        display: 'rotate',
                        calloutLine: {
                            length: 30,
                            width: 3
                            // specifying 'color' is also possible here
                        },
                        renderer:function(text){
                           return Ext.String.ellipsis(text,20) 
                        }
                    }
                });
                
            } 

             /************************** Pie & Pie3D series feature *************************************/

            else {
                chartSeriesArr.push({
                    donut: 30,
                    type: dataCfg[polartype],
                    xField: dataCfg[xfield],
                    showInLegend : dataCfg.showlegend && dataCfg[polartype] == 'pie'? true : false,
                    showMarkers : dataCfg[marker] == "on" ? true : false,
                    marker : dataCfg[marker] == "on" ? true : false,
                    subStyle : Ext.Element.parseStyles(dataCfg[style]),
                    label: {
                        field: dataCfg[fieldlabel],
                        display: 'rotate',
                        calloutLine: {
                            length: 30,
                            width: 3
                            // specifying 'color' is also possible here
                        },
                        renderer:function(text){
                           return Ext.String.ellipsis(text,20) 
                        }
                    }
                });
                //cart.innerPadding =20;
             }
             cart.innerPadding =20;
        }
            cart.setSeries(chartSeriesArr);
            cart.body.dom.style.marginTop ="15px";
            cart.body.dom.style.marginBottom = "15px";
        }
    }
});
